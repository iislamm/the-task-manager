// import firebase from 'firebase'
import React from 'react';
import { Redirect } from 'react-router-dom';
export const singIn = credentials => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(userSnapshot => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch(error => dispatch({ type: 'LOGIN_FAILED', error }));
  }
      
}

export const signUp = credentials => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then(userSnapshot => {
        const { user } = userSnapshot;
        user.updateProfile({displayName: credentials.name}).then(() => {
          firestore.doc(`users/${user.uid}`).set({
            displayName: credentials.name,
            email: credentials.email,
          }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
          }).catch(error => console.error(error));
        }).catch(error => console.error(error));
      }).catch(error => dispatch({ type: 'SIGNUP_FAILED', error }) )
      
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
      dispatch({ type: "SIGNOUT_SUCCESS" });
    }).catch(error => console.error(error));
  }
}

export const redirectUnAuthorized = auth => !auth.uid ? <Redirect to="/signin" /> : null;

export const redirectAuthorized = auth => auth.uid ? <Redirect to="/" /> : null;
