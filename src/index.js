import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { getFirestore, createFirestoreInstance } from 'redux-firestore';
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebaseConfig from './config/firebaseConfig';
import AuthIsLoaded from './Components/Auth/AuthIsLoaded';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({
        getFirebase,
        getFirestore,
      })
    )
  )
);

const rfConfig = {
  // userProfile: 'users',
  // useFirestoreForProfile: true,
};

console.log(firebaseConfig);

const rrfProps = {
  firebase: firebaseConfig,
  config: rfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}></ReactReduxFirebaseProvider>
    <AuthIsLoaded>
      <App />
    </AuthIsLoaded>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
