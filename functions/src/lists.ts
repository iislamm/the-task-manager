import { EventContext } from 'firebase-functions';

export const onListCreated = async (snap: FirebaseFirestore.DocumentSnapshot, context: EventContext) => {
  try {
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