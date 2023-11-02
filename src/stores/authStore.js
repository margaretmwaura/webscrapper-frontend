//www.apollographql.com/docs/react/data/error-handling/#:~:text=If%20the%20response%20includes%20GraphQL,is%20the%20default%20error%20policy.
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseAdmin } from './../firebase';
import { provideApolloClient } from '@vue/apollo-composable';
import { useMutation } from '@vue/apollo-composable';
import { apolloClient } from './../apolloClient';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import CryptoJS from 'crypto-js';

provideApolloClient(apolloClient);

const auth = getAuth(firebaseAdmin);

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

console.log(ENCRYPTION_KEY);

const registerMutation = gql`
  mutation RegisterUser($input: RegisterUser!) {
    registerUser(input: $input) {
      ... on CreateError {
        message
      }
      ... on RegisterSuccessful {
        user {
          id
          first_name
          email
        }
      }
    }
  }
`;
const getUser = gql`
  query ($email: String!) {
    getUser(email: $email) {
      id
      first_name
      email
    }
  }
`;
// TODO: Check on how to properly reset store values
export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    token: useLocalStorage('token', ''),
    authStatus: useLocalStorage('authStatus', ''),
    // FIXME: This will have to be fixed to be an array , this is to allow for saving of all the errors
    error: useLocalStorage('error', ''),
    user: useLocalStorage('user', {}),
  }),
  getters: {},
  actions: {
    async registerUser(data) {
      this.resetStoreValues();
      const {
        mutate: register,
        onError,
        onDone,
      } = useMutation(registerMutation, () => {
        return {
          variables: {
            input: {
              first_name: CryptoJS.AES.encrypt(
                data.name,
                ENCRYPTION_KEY
              ).toString(),
              last_name: CryptoJS.AES.encrypt(
                data.name,
                ENCRYPTION_KEY
              ).toString(),
              email: CryptoJS.AES.encrypt(
                data.email,
                ENCRYPTION_KEY
              ).toString(),
              password: CryptoJS.AES.encrypt(
                data.password,
                ENCRYPTION_KEY
              ).toString(),
            },
          },
        };
      });
      onError(error => {
        if (error) {
          this.error = error.networkError
            ? error.networkError.result.errors[0].message
            : error.graphQLErrors[0].message;
        } else {
          this.error = 'Signup was not successful! Please try again later';
        }
      });
      onDone(result => {
        if (result.data.registerUser.__typename == 'CreateError') {
          this.error = result.data.registerUser.message;
        } else {
          console.log('The user in signup');
          this.user = result.data.registerUser.user;
          console.log(this.user);
        }
      });

      await register();

      if (!this.error) {
        return await this.registerUserInFirebase(data);
      }
    },
    async registerUserInFirebase(args) {
      await createUserWithEmailAndPassword(auth, args.email, args.password)
        .then(userCredential => {
          this.token = userCredential.user.accessToken;
          this.authStatus = 'Authorized';
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    async signin(data) {
      this.resetStoreValues();
      return signInWithEmailAndPassword(auth, data.email, data.password)
        .then(async userCredential => {
          this.token = userCredential.user.accessToken;
          this.authStatus = 'Authorized';
          await this.getUserFromDB(data.email);
        })
        .catch(error => {
          this.authStatus = 'UnAuthorized';
          this.error = error.message;
        });
    },
    async resetStoreValues() {
      this.authStatus = 'UnAuthorized';
      this.token = '';
      this.error = '';
      this.user = '';
    },
    async getUserFromDB(email) {
      console.log('We are getting from DB');
      const { onResult } = useQuery(
        getUser,
        {
          email: email,
        },
        () => ({
          fetchPolicy: 'no-cache',
        })
      );
      return onResult(({ data }) => {
        console.log(data);
        this.user = data.getUser;
        console.log(this.user);
      });
    },
  },
});
