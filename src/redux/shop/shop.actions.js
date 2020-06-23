import ShopActionTypes from './shop.types';
import {firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

//this method is for Async with-spinning is using the HOC (Higher-order component). 
export const updateCollections = (collectionsMap) => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
});

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
     type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
     payload: errorMessage
})

/** This is redux-thunk function 
How redux thunk work - redux doesnt care about objects, instead its only going to catch what it returns a function. As soon as thr thunk sees the func in its tunnel, it gives the dispatch funcationality as the parameter
Now we using the async activity using redux, for that we have to set the different state for async activity and bring the dispatch firebase func in the shop.component to here
If redux-think middleware is enabled, anytime when u attempt to dispatch a func instead of an Object, the middleware will call that func with dispatch method itself as the first argumenr
*/
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            // console.log(collectionsMap);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        })
        .catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
}