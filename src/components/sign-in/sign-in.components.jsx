import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.components';
import CustomButton from '../custom-button/custom-button.components';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password:''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { emailSignInStart } = this.props;
        const  { email, password } = this.state;
        //we can also use redux Saga Sigin method instead of the below Email and password signIn method
        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        //     this.setState({email:'', password:''});
        // } catch(error) {
        //     console.log(error);
        // }

        emailSignInStart(email, password);
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({ [name]: value})
    }
    render() {
        const { googleSignInStart } = this.props;
        return(
            <div className='sign-in'>
                <h2> I already have an account</h2>
                <span> Sign In with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type='email' label='email' value={this.state.email} handleChange={this.handleChange} required/>
                    
                    <FormInput name='password' type='password' label='password' value={this.state.password} handleChange={this.handleChange} required/>
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign In </CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn> Sign In With Google</CustomButton>
                        {/* //the above custom button methid is using redux saga, even is the above button doesnt have the type submit it triggers the submit action so put type as button  */}
                        {/* this method is using the normal google sign in
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn> Sign In With Google</CustomButton> */}
                    </div>
                    
                </form>
            </div>
        )
    } //Sign In is the children pass to the custome-button component, whatever given inside the custom tag <> <> will pass as the children}
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})
export default connect(null, mapDispatchToProps)(SignIn);