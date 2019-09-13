import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebaseConfig from './config/firebaseConfig';

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({
        getFirebase,
        getFirestore
      })),
      reactReduxFirebase(firebaseConfig, {
        userProfile: 'users',
        useFirestoreForProfile: true,
        attachAuthIsReady: true
      }),
      reduxFirestore(firebaseConfig)
  ));
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
  serviceWorker.unregister();
});