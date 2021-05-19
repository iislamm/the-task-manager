import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA8XEKg-Qvi4GV4iDCphHEq-nUQA0AhwAw',
  authDomain: 'the-task-manager.firebaseapp.com',
  databaseURL: 'https://the-task-manager.firebaseio.com',
  projectId: 'the-task-manager',
  storageBucket: 'the-task-manager.appspot.com',
  messagingSenderId: '162839230574',
  appId: '1:162839230574:web:61bd7fe7d6326a17',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  firebase.firestore().useEmulator('localhost', 8080);
  firebase.auth().useEmulator('http://localhost:9099/');
}

export default firebase;
