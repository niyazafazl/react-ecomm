import firebase from 'firebase/app'; // firebase is quite large we can import only what we need, always we need to import firebase as this is the base import and that keuwrod is give us access to other libraries
import 'firebase/firestore';// here we need auth and storage
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA_F_DakEzbtey4bSLlR6Wu5uR9mEcKNZI",
    authDomain: "react-ecomm-4bd07.firebaseapp.com",
    databaseURL: "https://react-ecomm-4bd07.firebaseio.com",
    projectId: "react-ecomm-4bd07",
    storageBucket: "react-ecomm-4bd07.appspot.com",
    messagingSenderId: "1075979437296",
    appId: "1:1075979437296:web:82f85df763ad67c2e82e35",
    measurementId: "G-HXG2PEC3TE"
  };

firebase.initializeApp(config);

export const createUserProfileDocument =  async(userAuth, additionalData) => {
    console.log('userAuth ', userAuth);
    console.log('additionalData ', additionalData);
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`); //query in the firebase using Doc Refernce by pass the uid
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const displayName = additionalData ? additionalData.displayName : userAuth.displayName;
        const email = userAuth.email;
        // const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('Error creating user ', error.message);
        }
        
    }
    return userRef;
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();// this give us access to the GoogleAuthProvider class from the auth library
provider.setCustomParameters({prompt: 'select_account'});//this is for we want to aleays trigger the Google popup whenever we use this GoogleAuthProvider and signIn
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

