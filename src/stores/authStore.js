import { defineStore } from 'pinia';
// import { ref } from 'vue';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import { useLocalStorage } from '@vueuse/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseAdmin } from './../firebase';
import { provideApolloClient } from '@vue/apollo-composable';

provideApolloClient(apolloClient);

const auth = getAuth(firebaseAdmin);

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    token: useLocalStorage('token', ''),
    authStatus: useLocalStorage('authStatus', ''),
  }),
  getters: {},
  actions: {
    async signin() {
      return signInWithEmailAndPassword(
        auth,
        'mwauramargaret1@gmail.com',
        'Aswift07'
      )
        .then(async userCredential => {
          console.log(userCredential.user);
          console.log('Login' + userCredential.user.accessToken);
          this.token = userCredential.user.accessToken;
          this.authStatus = 'Authorized';
        })
        .catch(err => {
          console.log(err);
        });
    },
    async registerUser(args) {
      console.log(args);
      await createUserWithEmailAndPassword(auth, args.email, args.password)
        .then(userCredential => {
          // TODO:
          // call the mutation to create user on db
          const user = userCredential;
          console.log(user);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },

    // TODO: This will have to go
  },
});
