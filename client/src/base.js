import firebase from "firebase";
  // Firebase CDN configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCUsIhF3NgUbs5z4wCcEgKUOVf4J8sRUJY",
    authDomain: "ethresources-1ed10.firebaseapp.com",
    projectId: "ethresources-1ed10",
    storageBucket: "ethresources-1ed10.appspot.com",
    messagingSenderId: "441122483393",
    appId: "1:441122483393:web:302655d589f24939903840"
  };
  // Initialize Firebase
  export const app = firebase.initializeApp(firebaseConfig);