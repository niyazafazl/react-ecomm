import {createSelector } from 'reselect';

const selectUser = state => state.user;
// const selectCart = state => state.cart;

export const selectCurrentUser = createSelector(
    // [selectUser, selectCart], //instead of passing is in the array, we can also pass like thr below
    // (user, cart) => user.currentUser
    selectUser,
    (user) => user.currentUser
);