import React, {useState} from 'react';
import {connect} from 'react-redux';
import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.components';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({signUpStart}) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email:'',
        password:'',
        confirmPassword:''
    });
    const { displayName, email, password, confirmPassword } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert('Password do not match');
            return;
        }
      
        //this is redux saga funct
        signUpStart({displayName, email, password});
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value});

    }
    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput type='text' name='displayName' 
                    value={displayName} 
                    handleChange={handleChange} 
                    label='Display Name' required />
                <FormInput type='text' name='email' 
                    value={email} 
                    handleChange={handleChange} 
                    label='Email' required />
                <FormInput type='text' name='password' 
                    value={password} 
                    handleChange={handleChange} 
                    label='Password' required />
                <FormInput type='text' name='confirmPassword' 
                    value={confirmPassword} 
                    handleChange={handleChange} 
                    label='Confirm Password' required />
                <div className='buttons'>
                    <CustomButton type='submit'> Sign Up </CustomButton>
                </div>
            </form>
        </div>
    )

}
const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})
export default connect(null, mapDispatchToProps)(SignUp);