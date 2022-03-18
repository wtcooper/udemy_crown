// the code below is older version - had to use /compat/ in all the imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyAsEhGiN2Bw5YQQrudfzY-41qfc-E_zFn0",
  authDomain: "crwn-db-42d3f.firebaseapp.com",
  projectId: "crwn-db-42d3f",
  storageBucket: "crwn-db-42d3f.appspot.com",
  messagingSenderId: "927279858787",
  appId: "1:927279858787:web:f4524670ed5526f55da456",
  measurementId: "G-XFSBXE6DGQ"
};

firebase.initializeApp(config);


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
