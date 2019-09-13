import * as admin from 'firebase-admin';
import { EventContext } from 'firebase-functions';

export const onListCreated = async (snap:FirebaseFirestore.DocumentSnapshot, context:EventContext) => {
    const listData = (snap.data() as any);
    const moderators = listData.moderatorsIds;
    try {

      //add the list to the moderators' docs
      for (let i in moderators) {
        const moderatorId: any = moderators[i];
        const moderatorDocSnapshot = await admin.firestore().collection('users').doc(moderatorId).get();
        const moderatorData: any = moderatorDocSnapshot.data();
        await admin.firestore().collection('users').doc(moderatorId).set({
          modLists: [...moderatorData.modLists, snap.id]
        }, { merge: true });
      }

      //set the tasks number to 0
      await snap.ref.set({
        tasksCount: 0,
        checkedTasks: 0,
        lastVisit: new Date()
      }, { merge: true });
      console.log("done");
    } catch (error) {
      console.error(error);
    }
  };


export const onListDeleted = async (snap: FirebaseFirestore.DocumentSnapshot, context:EventContext) => {
  const listData: any = snap.data();
  const moderators = listData.moderatorsIds;
  
  try {
    //remove from the moderators
    for (let i in moderators) {
      const moderatorId = moderators[i];
       const moderatorDocSnapshot = await admin.firestore().collection('users').doc(moderatorId).get();
       const moderatorData: any = moderatorDocSnapshot.data();
       await admin.firestore().collection('users').doc(moderatorId).set({
         modLists: [
           ...moderatorData.modLists.filter((l: string) => l != snap.id)
         ]
       }, { merge: true });

       const tasksSnapshot = await admin.firestore().collection('tasks').where('list', '==', snap.id).get();
       tasksSnapshot.docs.forEach(async doc => {
         console.log('deleted');
         await doc.ref.delete();
       });
    }
  } catch (error) {
    console.error(error);
  }

};