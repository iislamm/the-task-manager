import firebase from 'firebase/app';
import 'firebase/firestore';

export const getList = async listID => {
  const listSnapshot = await firebase.firestore().doc(`lists/${listID}`).get();
  if (listSnapshot.exists) {
    const listData = {
      ...listSnapshot.data(),
      id: listSnapshot.id,
    };
    return listData;
  }
  return null;
};

export const getUserListsIds = async uid => {
  let lists = [];
  try {
    const listsSnapshot = await firebase
      .firestore()
      .collection('lists')
      .where('moderatorsIds', 'array-contains', uid)
      .get();
    listsSnapshot.docs.forEach(doc => {
      const listData = {
        ...doc.data(),
        id: doc.id,
      };
      lists.push(listData);
    });
  } catch (error) {
    console.error(error);
  }
  return lists;
};

export const validateList = async listId => {
  if (listId) {
    const docSnapshot = await firebase.firestore().doc(`lists/${listId}`).get();
    if (docSnapshot.exists) {
      return true;
    }
  }
  return false;
};
