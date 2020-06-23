import React from 'react';
import { CustomButtonContainer } from './custom-button.styledComp';
import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps}) => (
    <button 
        className= {`${inverted ?  'inverted': ''} 
                    ${isGoogleSignIn ? 'google-sign-in': ''} 
                    custom-button`} 
                    {...otherProps}>
        {children}
    </button>    
);

//Rendring the html and css using stlyedComp instead of css
// const CustomButton = ({children, ...props}) => (
//     <CustomButtonContainer {...props}>
//         {children}
//     </CustomButtonContainer>  
// );

export default CustomButton;