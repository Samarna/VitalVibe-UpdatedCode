import firebase from 'firebase';

require('@firebase/firestore');
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBtimfe-lZEdhf0wA-0GUEZ2j-gdgdX-fQ",
    authDomain: "vital-vibe.firebaseapp.com",
    projectId: "vital-vibe",
    storageBucket: "vital-vibe.appspot.com",
    messagingSenderId: "885003637826",
    appId: "1:885003637826:web:218a2b3f64c2870aa9c9db"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase.firestore();