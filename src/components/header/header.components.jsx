import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv} from './header.styledComp';

import {ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.components';
import CartDropDown from '../cart-dropdown/cart-dropdown.components';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
// import './header.styles.scss';

const Header = ({currentUser, hidden, signOutStart}) => (
    // <div className='header'>
    //     <Link className='logo-container' to="/">
    //         <Logo className='logo' />
    //     </Link>
    //     <div className='options'>
    //         <Link className='option' to='/shop'>SHOP</Link>
    //         <Link className='option' to='/shop'>CONTACT</Link>
    //         {currentUser ? 
    //         (<div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
    //         ) : (
    //         <Link className='option' to='/signIn'>SIGN IN</Link>
    //         )}
    //          <CartIcon/>
    //     </div>
    //     {hidden ? null : <CartDropDown/>}
        
    // </div>

    //render HTML using styled component instead of css

    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/shop'>CONTACT</OptionLink>
            {/* {currentUser ? 
            (<OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
            ) : (
            <OptionLink to='/signIn'>SIGN IN</OptionLink>
            )} 
            
            // we can also use OptionLink for option div and we have to use the ppt as='div' so it render the div tag
            */} 
            {/* {currentUser ? 
            (<OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
            ) : (
            <OptionLink to='/signIn'>SIGN IN</OptionLink>
            )} */}
            {/* the below signout is using redux saga */}
            {currentUser ? 
            (<OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>
            ) : (
            <OptionLink to='/signIn'>SIGN IN</OptionLink>
            )}
             <CartIcon/>
        </OptionsContainer>
        {hidden ? null : <CartDropDown/>}
        
    </HeaderContainer>
);

// const mapStateToProps = (state) => ({  // the below and this are same. in the above methid we use the object destructuring
//     currentUser: state.user.currentUser,
//     hidden: state.cart.hidden
// })

/** const mapStateToProps = ({user: {currentUser}, cart: { hidden}}) => ({  // this is object destructure pass both reducer and its return values
    //this func will call the root reducer, the root reducer will have the userReducer which returns the curentUser
    // this state is the root reducer. "mapStateToProps" naming can be anythingm but this is std wuth redux codebase 
    currentUser,
    hidden
}) */

/** const mapStateToProps = (state) => ({ //this is the reselect selector functions
    currentUser: selectCurrentUser(state),
    hidden: selectCartHidden(state)
}) */

const mapStateToProps = createStructuredSelector({ // the above function can abe further refined as this. 'createStructuredSelector' is the reselect method, this will automatically pass the top level state into each subsequent selector
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header); // this connect is the higher order func. it takes the component as the argument and retruns a new component. the first arg will be the root reducer func which we create as mapStateToProps
//with the help of redux connect method we are passing the currentUser as null to the Header component.