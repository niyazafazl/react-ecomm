import React from 'react';

import Spinner from '../spinner/spinner.component';

//as we are fetching the collections from DB, it works asynchronous it takes some time to get a response. so we need to show a loading spinner until we recieve the data
// As shop compoent is the one we recieve the data from DB using the updateCollection action, hence we need to put this Spinner component in the shop.component
//since the loading component will have to take the other component's input to decide whether to show spinning or not, thats we called here as WrappedComponent
// const WithSpinner = WrappedComponent => {
//     const Spinner = ({isLoading, ...otherProps}) => {
//         console.log(otherProps);
//         return isLoading ? (
//             <SpinnerOverlay>
//                 <SpinnerContainer/>
//             </SpinnerOverlay>
//         ) : (
//             <WrappedComponent {...otherProps} /> //this is the way we pass through the Props to the compoenent we wrap
//         )
//     };
//     return Spinner;
// } 
// since we moved the Spinner into itws own component, chnaged to this code
const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => {
    return isLoading ? <Spinner/> : <WrappedComponent {...otherProps} /> //this is the way we pass through the Props to the compoenent we wrap
};
   
export default WithSpinner;