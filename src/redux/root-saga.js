//purpose of root saga is to avoid call the "sagaMiddleware.run" in multiple places where we require we put in a single file

import { all, call} from 'redux-saga/effects';

import { shopSagas } from './shop/shop.saga';
import { userSaga } from './user/user.saga';
import { cartSagas } from './cart/cart.saga';
// export default function* rootSaga() {
//     yield fetchCollectionStart(); 
//     yield fetchCollectionStart();
//     yield fetchCollectionStart();
// }
// if we want to call 3 different sagas we yield this separately but these 3 run concurrently, the 2nd yield wait for the first yield to finish.
// we dont want to do the above we want all our code initialise as soon as possible side by side, so that we use yield all 
export default function* rootSaga() {
    yield all([call(shopSagas), call(userSaga), call(cartSagas)]) //we can use call keyword to run the saga funct
    //we can call any no of sagas inside this array and initialise them all on seperate task stream
}