import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCiY17KCoZtggSI5pLSifovFViNEF2rmww",
    authDomain: "todo-yoduh.firebaseapp.com",
    databaseURL: "https://todo-yoduh.firebaseio.com",
    projectId: "todo-yoduh",
    storageBucket: "todo-yoduh.appspot.com",
    messagingSenderId: "140896658665",
    appId: "1:140896658665:web:c8b1dd51104ff51cc5fc78",
    measurementId: "G-4P6H8TV9W6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export default db;