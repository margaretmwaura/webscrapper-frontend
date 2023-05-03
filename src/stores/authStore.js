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

provideApolloClient(apolloClient);

const auth = getAuth(firebaseAdmin);

const registerMutation = gql`
  mutation RegisterUser($input: RegisterUser!) {
    registerUser(input: $input) {
      ... on CreateError {
        message
      }
      ... on RegisterSuccessful {
        user {
          firstName
          email
        }
      }
    }
  }
`;
const getUser = gql`
  query {
    getUser {
      firstname
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
    error: useLocalStorage('error', ''),
    user: useLocalStorage('user', ''),
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
              firstName: data.name,
              lastName: data.name,
              email: data.email,
              password: data.password,
            },
          },
        };
      });
      onError(error => {
        this.error = result.data.registerUser.message;
      });
      onDone(result => {
        if (result.data.registerUser.__typename == 'CreateError') {
          this.error = result.data.registerUser.message;
        } else {
          this.user = result.data.registerUser.user;
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
          await this.getUserFromDB('mwauramargaret1@gmail.com');
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

    // FIXME: This should use the query defined above
    async getUserFromDB(email) {
      const { result } = useQuery(
        gql`
          query ($email: String!) {
            getUser(email: $email) {
              firstName
              email
            }
          }
        `,
        {
          email: email,
        }
      );
      this.user = computed(() =>
        result.value?.getUser ? result.value?.getUser : null
      );
    },
  },
});
