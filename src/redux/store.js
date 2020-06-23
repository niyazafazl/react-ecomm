import { createStore, applyMiddleware} from 'redux';
import { persistStore } from 'redux-persist'; //it allows browser to catch our store based on some config
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';

// import { fetchCollectionStart } from './shop/shop.saga';
import rootSaga from './root-saga';
import rootReducer from './root-reducer';

// const middlewares = [logger]; //putting the logger func inside the array
// const middlewares =[thunk];

const sagaMiddleware = createSagaMiddleware();
const middlewares =[sagaMiddleware];
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger); //putting thr logger only for dev environment
}
export const store = createStore(rootReducer, applyMiddleware(...middlewares));//what it "...middlewares" does is it spread all of the values in the array into this function call as individual arguments

// sagaMiddleware.run(fetchCollectionStart); //if we want to run multiple saga, we have to put this code in multiple places where we call the saga. so inorder to avoid this we create root.saga file
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store); //pass the store into the persistStore method of redux-persist library
export default {store, persistor};