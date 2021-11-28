import firebase from "firebase/compat/app"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyBvKJntOjUGr21Tmxp-G0Ey1w1DwEB5Wfs",
  authDomain: "vaccinehaven.firebaseapp.com",
  projectId: "vaccinehaven",
  storageBucket: "vaccinehaven.appspot.com",
  messagingSenderId: "703633343525",
  appId: "1:703633343525:web:8168f9572b4972af682bcc",
  measurementId: "G-RFLKJEENW9",
});

export const db = firebase.firestore();

export default firebase;
