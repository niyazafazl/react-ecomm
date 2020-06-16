import React from 'react';
import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.components';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email:'',
            password:'',
            confirmPassword:''
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        if(password !== confirmPassword) {
            alert('Password do not match');
            return;
        }

        try {
            const user = await auth.createUserWithEmailAndPassword(email, password);
           
            await createUserProfileDocument(user, {displayName});
            //this is to clear the form
            this.setState({
                displayName: '',
                email:'',
                password:'',
                confirmPassword:''
            })
        } catch(error) {
            console.error(error);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({[name]: value});

    }
    render(){
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput type='text' name='displayName' value={this.state.displayName} handleChange={this.handleChange} label='Display Name' required />
                    <FormInput type='text' name='email' value={this.state.email} handleChange={this.handleChange} label='Email' required />
                    <FormInput type='text' name='password' value={this.state.password} handleChange={this.handleChange} label='Password' required />
                    <FormInput type='text' name='confirmPassword' value={this.state.confirmPassword} handleChange={this.handleChange} label='Confirm Password' required />
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign Up </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}
export default SignUp;