import * as admin from 'firebase-admin';
import { EventContext } from 'firebase-functions';

export const onUserCreated = async (snap:FirebaseFirestore.DocumentSnapshot, context: EventContext) => {
    await admin.firestore().collection('users').doc(snap.id).set({
      modLists: [],
      assignedTasks: [],
    }, { merge: true });
    console.log("done");
  };