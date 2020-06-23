import React from 'react';

import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

//as we are fetching the collections from DB, it works asynchronous it takes some time to get a response. so we need to show a loading spinner until we recieve the data
// As shop compoent is the one we recieve the data from DB using the updateCollection action, hence we need to put this Spinner component in the shop.component
//since the loading component will have to take the other component's input to decide whether to show spinning or not, thats we called here as WrappedComponent
const WithSpinner = WrappedComponent => {
    const Spinner = ({isLoading, ...otherProps}) => {
        console.log(otherProps);
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer/>
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps} /> //this is the way we pass through the Props to the compoenent we wrap
        )
    };
    return Spinner;
} 
export default WithSpinner;