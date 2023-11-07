// useUserManagement.js

import { ref } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { REGISTER_USER_MUTATION } from './../graphql/mutations'; // Assuming you have imported the queries
import { GET_USER } from '../graphql/queries';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseAdmin } from './../firebase';
import CryptoJS from 'crypto-js';
import { useAuthStore } from '../stores/authStore';

export function useUserManagement() {
  const { mutate: registerUserMutation } = useMutation(REGISTER_USER_MUTATION);

  const store = useAuthStore();
  const auth = getAuth(firebaseAdmin);
  const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

  const registerUser = async input => {
    // TODO: Call an action in the store
    // this.resetStoreValues();
    let input_data = {
      first_name: CryptoJS.AES.encrypt(input.name, ENCRYPTION_KEY).toString(),
      last_name: CryptoJS.AES.encrypt(input.name, ENCRYPTION_KEY).toString(),
      email: CryptoJS.AES.encrypt(input.email, ENCRYPTION_KEY).toString(),
      password: CryptoJS.AES.encrypt(input.password, ENCRYPTION_KEY).toString(),
    };
    try {
      const { data } = await registerUserMutation({
        input: input_data,
      });
      if (data.registerUser.__typename == 'CreateError') {
        error = resultData.registerUser.message;
      } else {
        let user = data.registerUser.user;
        store.setUser(user);
        return await registerUserInFirebase(input);
      }
    } catch (error) {
      let err = '';
      if (err) {
        err = error.networkError
          ? error.networkError.result.errors[0].message
          : error.graphQLErrors[0].message;
      } else {
        err = 'Signup was not successful! Please try again later';
      }
      store.setError(err);
    }
  };

  const getUserFromDB = async email => {
    // When the query is globally defined it is being called every time we load the composable
    const { onResult: onGetUserResult } = useQuery(GET_USER, { email });

    let user = '';
    try {
      const { data } = onGetUserResult();
      if (data) {
        user = data.getUser;
      }
      store.setUser(user);
    } catch (error) {
      let err = '';
      if (err) {
        err = error.networkError
          ? error.networkError.result.errors[0].message
          : error.graphQLErrors[0].message;
      } else {
        err = 'Signup was not successful! Please try again later';
      }
      store.setError(err);
    }
  };

  const registerUserInFirebase = async args => {
    await createUserWithEmailAndPassword(auth, args.email, args.password)
      .then(userCredential => {
        let token = userCredential.user.accessToken;
        let authStatus = 'Authorized';
        store.setToken(token);
        store.setAuthStatus(authStatus);
      })
      .catch(error => {
        let err = error.message;
        store.setError(err);
      });
  };
  const signin = async data => {
    // this.resetStoreValues();
    let token = '';
    let authStatus = '';
    let error = '';
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async userCredential => {
        token = userCredential.user.accessToken;
        authStatus = 'Authorized';
        await getUserFromDB(data.email);
      })
      .catch(err => {
        authStatus = 'UnAuthorized';
        error = err.message;
      });
    store.setError(error);
    store.setAuthStatus(authStatus);
    store.setToken(token);
  };

  return {
    registerUser,
    signin,
  };
}
