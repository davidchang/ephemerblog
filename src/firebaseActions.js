import firebase from 'firebase';
import { getCurrentUserID } from './contexts/Auth';

export const getUserInfo = userID =>
  firebase
    .firestore()
    .collection('users')
    .doc(userID)
    .get();

export const updateUserInfo = userInfo =>
  firebase
    .firestore()
    .collection('users')
    .doc(getCurrentUserID())
    .set({ ...userInfo, userID: getCurrentUserID() }, { merge: true });

export const findUserByUsername = username =>
  firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()
    .then(doc => {
      if (!doc.empty) {
        return doc.docs[0].data();
      }

      return null;
    });

export const getPosts = authorID =>
  firebase
    .firestore()
    .collection('posts')
    .where('authorID', '==', authorID)
    .orderBy('createdAt', 'desc')
    .get();

export const publish = text =>
  firebase
    .firestore()
    .collection('posts')
    .add({
      createdAt: new Date(),
      text,
      authorID: getCurrentUserID(),
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    });
