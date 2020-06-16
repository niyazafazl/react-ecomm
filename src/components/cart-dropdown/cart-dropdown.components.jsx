import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.components';
import CartItem from '../cart-item/cart-item.components';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import './cart-dropdown.styles.scss';

const CartDropDown = ({cartItems, history, dispatch}) => {
    return (
    <div className='cart-dropdown'>
        <div className='cart-items'> 
        {
        cartItems.length ? (
        cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} />
        ))
        ) : (
            <span className='empty-message'>Your Cart is empty</span>
        )
        }
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());        
        }} >GO TO CHECKOUT</CustomButton>
       
    </div>
    );
};
// const mapStateToProps = ({cart: {cartItems }}) => ({
//     cartItems
// });
//replace the above func with the selector (reselect) funcions, which helps for the cratDropDown component will not get rerender whenver the state chnages tha's unrelated to the card items. It cahced the data, only when the object has the difference it rerender the component 
const mapStateToProps = createStructuredSelector({
    cartItems:selectCartItems
});
//Note: connect method actually pass dispatch into our component as a prop if we dont supply a 2nd mapDispatchToProps method. The reason is bcoz if we need to make one of action dispatches, there is no need to write another mapDispatchToProps method.
export default withRouter(connect(mapStateToProps)(CartDropDown));