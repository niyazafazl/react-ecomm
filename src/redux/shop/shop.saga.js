import { takeLatest, call, put, all } from 'redux-saga/effects';
import {firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import ShopActionTypes from './shop.types';


export function* fetchCollectionAsync() {
    yield console.log('I fired');
    try {
        const collectionRef = firestore.collection('collections'); //we get the collections from firebase here
        const snapshot = yield collectionRef.get();
        
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);  //call is the effect inside the generator func that invokes the method. we want to yeild this incase if this async func akes longer than expected.
        yield put(fetchCollectionsSuccess(collectionsMap)); //saga doesnt yeild dispatch method as thunk, instead it use 'put' for creating action, only difference is we have to yield it and just going to use like dispatch

        //call method takes the method whiever we going to call as the 1st param and the value we going to pass to that method is taking as 2nd param
        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        //     // console.log(collectionsMap);
        //     dispatch(fetchCollectionsSuccess(collectionsMap));
        // })
        // .catch(error => dispatch(fetchCollectionsFailure(error.message)));
    } catch(error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

//this saga code is serve the same purpose as the "fetchCollectionsStartAsync" from shop action which is related to redux-thunk code.
export function* fetchCollectionStart() { // generator funct
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync) 
    // the 2nd param for this takEvery func is the another generator func, the 2nd generator func will run in response to the EventListener in the 1st param.
    //this is how we actually trigger more code to run depending on the action type. Purpose of Sagas middleware is to run these sagas functions concurrently meaning run them all together that doesnt block the execution
    //instead of takeEvery we replace with takeLastest as we need the Latest loaded data from DB. if we put takeEvery it hits multiple time
}

export function* shopSagas() {
    yield all([call(fetchCollectionStart)]);
}