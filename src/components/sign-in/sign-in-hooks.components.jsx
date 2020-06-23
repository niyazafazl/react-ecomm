import React, {useState} from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.components';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';
//we are changing the code to using hooks. Hooks can use only in functional component, so we converted the class comp. to functional comp. 
const SignIn = ({emailSignInStart, googleSignInStart}) => { //for functional cpom. we pass the props in the function itself
    //instead of this.state we replace useState method of hooks
    const [userCredentials, setCredentials] = useState({email:'', password:''});
    const  { email, password } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({ ...userCredentials, [name]: value});
    }
    //remove the render method, and remove the 'this' keyword in the method and properties
    // the email and password values we get from the userCredentials
    return(
        <div className='sign-in'>
            <h2> I already have an account</h2>
            <span> Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name='email' type='email' label='email' 
                value={email} 
                handleChange={handleChange} required/>
                
                <FormInput name='password' type='password' label='password' 
                value={password} 
                handleChange={handleChange} required/>
                <div className='buttons'>
                    <CustomButton type='submit'> Sign In </CustomButton>
                    <CustomButton type='button' 
                    onClick={googleSignInStart} isGoogleSignIn> Sign In With Google</CustomButton>
                    {/* //the above custom button methid is using redux saga, even is the above button doesnt have the type submit it triggers the submit action so put type as button  */}
                    {/* this method is using the normal google sign in
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn> Sign In With Google</CustomButton> */}
                </div>
                
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})
export default connect(null, mapDispatchToProps)(SignIn);