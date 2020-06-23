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
    
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`); //query in the firebase using Doc Refernce by pass the uid
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const displayName = additionalData ? additionalData.displayName : userAuth.displayName;
        // const email = userAuth.email;
        const { email} = userAuth;
        const createdAt = new Date();
        console.log('email ', email);
        console.log('displayName ', displayName);
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
//this id to store the shop collections data to firestore as batch set
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {  // code to add shop Data to firebase
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc(obj.title); // create new docRef in firebase and create id as object title
        // console.log(newDocRef);
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
}

export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })  //collection.doc will give us DocumentSnapshotArray

    //reduce the transformedCollection object to the final object 
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe(); //immediately unsbscribe once get the authenticated user
            resolve(userAuth);
        }, reject)
    })
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();// this give us access to the GoogleAuthProvider class from the auth library
googleProvider.setCustomParameters({prompt: 'select_account'});//this is for we want to aleays trigger the Google popup whenever we use this GoogleAuthProvider and signIn
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

