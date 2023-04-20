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
      this.authStatus = 'UnAuthorized';
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
    async signin() {
      return signInWithEmailAndPassword(
        auth,
        'mwauramargaret1@gmail.com',
        'Aswift07'
      )
        .then(async userCredential => {
          this.token = userCredential.user.accessToken;
          this.authStatus = 'Authorized';
        })
        .catch(err => {
          this.authStatus = 'UnAuthorized';
        });
    },

    async unSetError() {
      this.error = '';
    },
  },
});
