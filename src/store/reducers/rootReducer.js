import authReducer from './authReducer';
import listsReducer from './listsReducer';
import tasksReducer from './tasksReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  lists: listsReducer,
  tasks: tasksReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
