import { getUserIds } from "../../helpers/userHelpers";
import { validateList } from "../../helpers/listHelpers";

export const createTask = data => {
    return (dispatch, getState, { getFirestore }) => {
        const user = getState().firebase.auth;
        const firestore = getFirestore();

        validateList(data.list).then(listExists => {
            if (listExists) {
                getUserIds(firestore, data.chargedUsersEmails).then(userIds => {
                    firestore.collection("tasks").add({
                        ...data,
                        chargedUsersIds: userIds,
                        creatorId: user.uid,
                        creatorEmail: user.email
                    }).then(docSnapshot => {
                        dispatch({ type: 'TASK_CREATE_SUCCESS' })
                    })
                }).catch(error => dispatch({ type: 'TASK_CREATE_FAIL', error }));
            } else {
                // eslint-disable-next-line no-throw-literal
                throw "List Not found"
            }
        }).catch(error => dispatch({ type: 'TASK_CREATE_FAIL', error }));

    }
}

export const updateTask = (taskId, updates) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.doc(`tasks/${taskId}`).set(updates, { merge: true }).then(() => {
            dispatch({type: 'TASK_UPDATE_SUCCESS'});
        }).catch(error => dispatch({ type: 'TASK_UPDATE_FAIL', error }));
    }
}

export const openCreateTaskDialog = () =>{
    return (dispatch, getState) => {
        dispatch({ type: 'OPEN_TASK_CREATE_DIALOG' });
    }
}

export const closeCreateTaskDialog = () =>{
    return (dispatch, getState) => {
        dispatch({ type: 'CLOSE_TASK_CREATE_DIALOG' });
    }
}

export const deleteTask = taskId => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.doc(`tasks/${taskId}`).delete()
            .then(() => dispatch({ type: 'TASK_DELETE_SUCCESS' }))
            .catch(error => dispatch({ type: 'TASK_DELETE_FAIL', error }));
    }
}