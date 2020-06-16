//it is the base reducer it represents all of the state of our appln, it combines all of our other stats together. we cant put all the states in to one state , wo we break up into individual sections
//so all the of individual reducer will fo through this root reducer. we are gogin to write the user reducer first, that is the reducer that maintain the curerentUser state
import { combineReducers } from'redux';
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import CartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import ShopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] //this is an array that we can put any of the reducer that we want to store. We have t reducers cart and user. we are storing only for cart
}

// export default combineReducers({
//     user: userReducer,
//     cart: CartReducer
// });
//change the above method to this for the redux persistance
const rootReducer = combineReducers({
    user: userReducer,
    cart: CartReducer,
    directory: directoryReducer,
    shop: ShopReducer
});

export default persistReducer(persistConfig, rootReducer);