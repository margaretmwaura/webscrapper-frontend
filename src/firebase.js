// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyDuhWB0ABISfMu2Dw2lPxKj6qqO1y9D2qc',
  authDomain: 'web-scrapper-364504.firebaseapp.com',
  databaseURL: 'https://web-scrapper-364504-default-rtdb.firebaseio.com',
  projectId: 'web-scrapper-364504',
  storageBucket: 'web-scrapper-364504.appspot.com',
  messagingSenderId: '228769038479',
  appId: '1:228769038479:web:b88e1f62da537c173830fa',
  measurementId: 'G-PE6BHYH0MC',
};

// Initialize Firebase
const admin = firebase.initializeApp(firebaseConfig);

export const firebaseAdmin = admin;
