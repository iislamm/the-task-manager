export const createList = listData => {
  return (dispatch, getState, { getFirestore }) => {
    const user = getState().firebase.auth;
    const firestore = getFirestore();

    firestore
      .collection('lists')
      .add({
        ...listData,
        owner: user.uid,
        ownerEmail: user.email,
      })
      .then(docSnapshot => {
        dispatch({ type: 'LIST_CREATE_SUCCESS' });
      });
  };
};

export const openListCreateDialog = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'OPEN_LIST_CREATE_DIALOG' });
  };
};

export const closeListCreateDialog = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'CLOSE_LIST_CREATE_DIALOG' });
  };
};
export const updateLastVisit = listId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    if (listId) {
      firestore
        .doc(`lists/${listId}`)
        .set(
          {
            lastVisit: new Date(),
          },
          { merge: true }
        )
        .then(s => {
          return dispatch({ type: 'UPDATE_LIST_SUCCESS' });
        })
        .catch(error => console.error(error));
    }
  };
};

export const updateCurrentList = list => {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_CURRENT_LIST', value: list });
  };
};
