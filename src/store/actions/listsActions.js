import { getUserIds } from "../../helpers/userHelpers";

// import {firestore} from 'firebase'
export const createList = listData => {
  return (dispatch, getState, { getFirestore }) => {
    const user = getState().firebase.auth;
    const firestore = getFirestore();

    getUserIds(firestore, listData.moderatorsEmails, user.uid).then(moderatorsIds => {
      const moderatorsEmails = new Set([...listData.moderatorsEmails, user.email]);
      firestore.collection('lists').add({
        ...listData,
        moderatorsEmails: [...moderatorsEmails],
        moderatorsIds,
        owner: user.uid,
        ownerEmail: user.email
      }).then(docSnapshot => {
        console.log(docSnapshot);
        dispatch({ type: 'LIST_CREATE_SUCCESS' });
      })
    }).catch(error => dispatch(error));

  }
}

export const openListCreateDialog = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'OPEN_LIST_CREATE_DIALOG' });
  }
}

export const closeListCreateDialog = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'CLOSE_LIST_CREATE_DIALOG' });
  }
}
export const updateLastVisit = listId => {
  console.log("updating");
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    if (listId) {
      firestore.doc(`lists/${listId}`).set({
        lastVisit: new Date(),
      }, { merge: true }).then(s => {
        console.log('updated', s);
        return dispatch({ type: 'UPDATE_LIST_SUCCESS' });
      }).catch(error => console.error(error));
    }
  }
}