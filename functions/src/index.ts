import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { onUserCreated } from './users';
import { onTaskCreated, onTaskDeleted } from './tasks';
import { onListCreated, onListDeleted } from './lists';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://the-task-manager.firebaseio.com',
});

exports.onUserCreated = functions.firestore.document('users/{userId}').onCreate(onUserCreated);

exports.onTaskCreated = functions.firestore.document('tasks/{taskId}').onCreate(onTaskCreated);

exports.onTaskDeleted = functions.firestore.document('tasks/{taskId}').onDelete(onTaskDeleted);

exports.onListCreated = functions.firestore.document('lists/{listId}').onCreate(onListCreated);

exports.onListDeleted = functions.firestore.document('lists/{listId}').onDelete(onListDeleted);