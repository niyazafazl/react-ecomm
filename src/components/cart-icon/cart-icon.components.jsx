import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
);

//This mapStateToProps func will call everytime when do some action like login, logout. This func will call everytime and render the whole state even if the object returns from the redux has no change. 
//This will affect the performance, so we need to cache the object so if the object has no change then we dont rerender the whole state. For that we have to use 'reselect' library
/** const mapStateToProps = ({cart: {cartItems}}) => ({
    cartItems.reduce((accumulatorQnty, cartItem) => 
    accumulatorQnty + cartItem.quantity, 0)
}); */
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);