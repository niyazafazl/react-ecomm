import { createSelector } from 'reselect'; // catch library

const selectCart = state => state.cart; // this is the input selector

export const selectCartItems = createSelector(
    [selectCart], //first arg is an array of input selector
    cart => cart.cartItems //2nd arg is a func that will return the value that we want
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatorQnty, cartItem) => 
        accumulatorQnty + cartItem.quantity
        , 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatorQnty, cartItem) => 
        accumulatorQnty + cartItem.quantity * cartItem.price
        , 0)
)