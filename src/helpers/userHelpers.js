export const getUserIds = async (firestore, users, first) => {
    const userIds = [];
    if (first) {
        userIds.push(first);
    }
    console.log(users);
    for (let i in users) {
      if (users[i] !== first) {
        const userSnapshot = await firestore.collection('users').where("email", "==", users[i]).get();
        if (!userSnapshot.empty) {
            userIds.push(userSnapshot.docs[0].id);
        } else {
          // eslint-disable-next-line no-throw-literal
          throw { type: "LIST_CREATE_FAIL", error: `Invalid users emails: couldn't find user ${users[i]}` }
        }
      }
    }
    return userIds;
  }