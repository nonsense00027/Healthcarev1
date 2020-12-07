import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjBa86-Y5opooDOjvJ-KY7Z0t5PKfhNpU",
  authDomain: "healthcare-a559a.firebaseapp.com",
  databaseURL: "https://healthcare-a559a.firebaseio.com",
  projectId: "healthcare-a559a",
  storageBucket: "healthcare-a559a.appspot.com",
  messagingSenderId: "1036632046644",
  appId: "1:1036632046644:web:777e5541631df1f8641e61",
  measurementId: "G-Q7GTSEEZ5T",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const auth2 = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, auth2, storage, provider };
