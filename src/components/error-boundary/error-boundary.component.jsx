import React from 'react';
import {ErrorImageContainer, ErrorImageOverlay, ErrorImageText} from './error-boundary.styles';

//Error Boundary must be a class component bcoz we need to access those life cycle methods
class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = {
            hasErrored: false
        };
    }
    //Inorder to know the react its a error boundary compo. we need to use either one or both of the life cycle methods that are unique to error boundaries
    static getDerivedStateFromError(error) {
        //its a static lifecycle method that essentially catches any error that gets thrown in any of the children of this errorBoundary's compo.
        //we wrap this error compo. around a bunch of compos., any of those wrapped compos. get any error that will pass in as the paramter of this getDerivedStateFromError method.
        
        //this returns an object that set the state of this class compo.
        return { hasErrored: true };
    }
    //it gives us access to both error and info related to the error how it got through. Info like which wrapped compo got the error
    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        //we have to conditionally return a different UI based on state it returns true or false
        if(this.state.hasErrored) { //if has error show this meesage 
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
                    <ErrorImageText> Sorry this page is broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        //if no error render the children
        return this.props.children;
    }
}

export default ErrorBoundary;