//www.apollographql.com/docs/react/data/error-handling/#:~:text=If%20the%20response%20includes%20GraphQL,is%20the%20default%20error%20policy.
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

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
  getters: {
    getUser: state => state.user,
    getToken: state => state.token,
    getError: state => state.error,
    getAuthStatus: state => state.authStatus,
  },
  actions: {
    resetStoreValues() {
      this.$reset();
    },
    setUser(value) {
      this.user = value;
      console.log(this.user);
    },
    setError(value) {
      this.error = value;
    },
    setToken(value) {
      this.token = value;
    },
    setAuthStatus(value) {
      this.authStatus = value;
    },
  },
});
