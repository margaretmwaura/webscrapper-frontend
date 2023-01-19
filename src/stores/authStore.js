import { defineStore } from 'pinia';
import { ref } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useLocalStorage } from '@vueuse/core';

export const authStore = defineStore({
  id: 'auth_store',
  state: () => ({
    token: useLocalStorage('token', ''),
    authStatus: useLocalStorage('authStatus', ''),
  }),
  getters: {},
  actions: {
    async signin() {
      await firebase
        .auth()
        .signInWithEmailAndPassword('mwauramargaret1@gmail.com', 'Aswift07')
        .then(async () => {
          await this.getAuthToken();
        })
        .catch(err => {
          this.authStatus = err;
        });
    },
    async registerUser() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword('gladysnjeri@gmail.com', 'password')
        .then(userCredential => {
          const user = userCredential;
          console.log(user);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
    async getAuthToken() {
      await firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          this.authStatus = 'Authorized';
          this.token = idToken;
          localStorage.setItem('authtoken', idToken);
        })
        .catch(error => {
          this.authStatus = err;
        });
    },
  },
});
