import { createStore, applyMiddleware} from 'redux';
import { persistStore } from 'redux-persist'; //it allows browser to catch our store based on some config
import logger from 'redux-logger';
import rootReducer from './root-reducer';

// const middlewares = [logger]; //putting the logger func inside the array
const middlewares =[];
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}
export const store = createStore(rootReducer, applyMiddleware(...middlewares));//what it "...middlewares" does is it spread all of the values in the array into this function call as individual arguments
export const persistor = persistStore(store); //pass the store into the persistStore method of redux-persist library
export default {store, persistor};