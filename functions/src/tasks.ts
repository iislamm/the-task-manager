import * as admin from 'firebase-admin';
import { EventContext } from 'firebase-functions';

export const onTaskCreated = async (snap:FirebaseFirestore.DocumentSnapshot, context:EventContext) => {
    const taskData = snap.data();
    if (taskData) {
      const list = taskData.list;
      const listRef = admin.firestore().doc(`lists/${list}`);

      //set the time of the list creation
      await snap.ref.set({
        timeCreated: new Date(),
        checked: false,
      }, { merge: true });

      //get listData
      const listSnapshot = await listRef.get();
      const listData = listSnapshot.data();
      
      if (listData) {
        // update the number of tasks on the list
        await listRef.set({
          tasksCount: listData.tasksCount + 1
        }, { merge: true });
      }
    }
    await assignTasks(snap);
  }

const assignTasks = async (taskSnapshot: FirebaseFirestore.DocumentSnapshot) => {
  const taskData = taskSnapshot.data();
  if (taskData) {
    const chargedUsers = taskData.chargedUsersIds;
    try {
      chargedUsers.forEach(async (user: string) => {
        const userDocRef = admin.firestore().doc(`users/${user}`);
        const userDocSnapshot = await userDocRef.get()
        const userData = userDocSnapshot.data();
    
        if (userData) {
          await userDocRef.set({
            assignedTasks: [
              ...userData.assignedTasks,
              {
                taskId: taskSnapshot.id,
                taskName: taskData.taskName,
                list: taskData.list
              }
            ]
          }, { merge: true });
        }
      });
    }
    catch(error) {
      console.error(error);;
    }
  }
}


export const onTaskDeleted = async (snap:FirebaseFirestore.DocumentSnapshot, context:EventContext) => {
    const taskData = snap.data();
    if (taskData) {
      const listRef = admin.firestore().doc(`lists/${taskData.list}`);
      
      const listSnapshot = await listRef.get();
      const listData = listSnapshot.data();

      if (listData) {
        await listRef.set({
          tasksCount: listData.tasksCount - 1
        }, { merge: true });
      }
    }
  };