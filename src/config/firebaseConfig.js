import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA8XEKg-Qvi4GV4iDCphHEq-nUQA0AhwAw",
  authDomain: "the-task-manager.firebaseapp.com",
  databaseURL: "https://the-task-manager.firebaseio.com",
  projectId: "the-task-manager",
  storageBucket: "",
  messagingSenderId: "162839230574",
  appId: "1:162839230574:web:61bd7fe7d6326a17"
};

firebase.initializeApp(firebaseConfig);

export default firebase;