// import SHOP_DATA from './shop.data';
import ShopActionTypes from './shop.types';
// const INITIAL_STATE = {
//     collections: SHOP_DATA
// };
const INITIAL_STATE = { //the one we do for Async with-spinning is using the component. Now we using the async activity using redux, for that we have to set the different state of async activity
    collections: null,
    isFetching: false,
    errorMessage: undefined
};
const ShopReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            }
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
                return {
                    ...state,
                    isFetching: false,
                    errorMessage: action.payload
                }
        default:
            return state;
    }
};
export default ShopReducer;
