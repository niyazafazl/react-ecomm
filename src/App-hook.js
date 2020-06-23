import React, {useEffect, useState} from 'react';

import {Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.components';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-sign-up.components';
import CheckoutPage from './pages/checkout/checkout.components';
// import WithSpinner from './components/with-spinner/with-spinner.component';

import { addCollectionAndDocuments , firestore, convertCollectionSnapshotToMap} from './firebase/firebase.utils';
import { checkUserSession } from './redux/user/user.actions';
import { fetchCollectionsStart } from './redux/shop/shop.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview, selectIsCollectionLoaded } from './redux/shop/shop.selectors';
// import CollectionPage from './pages/collection/collection.component';
import CollectionPageContainer from './pages/collection/collection.container';

// convert class component to functional component for react hooks. we use useEffect method to replace for componentDidMount
const App = ({ fetchCollectionsStart, checkUserSession, currentUser }) => { 
  
  const [loadingVal, setLoading] = useState({
              loading:''
          });

  useEffect(() => {
    checkUserSession(); //this check usersession, we want to call only for the first time to check for the current user, so need  to render for every updates
    fetchCollectionsStart();
  }, [checkUserSession, fetchCollectionsStart]); //this checkUserSession ppty is somethign we pass it from the mapsDispathToProps function, but if we pass this func from parent component then we would have tackle in different way.
  
  return (
    <div>
      <Header/>
       <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signIn' render={() => currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage/>} />
      <Route path='/shop/:collectionId' 
                 component={CollectionPageContainer}/>
       </Switch>
    </div>
  );

}

// change the above method with reselect slector method
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionsForPreview, //Add Shop collections to firebase
  isCollectionLoaded: selectIsCollectionLoaded
});

const mapDispatchToProps = dispatch =>({ //It is a func that gets dispatch ppty and it returns whatever the prop we pass to it. Here we pass the user action 'setCurrentUser'
//  setCurrentUser : user => dispatch(setCurrentUser(user)),  // this dispatch func is a way for reduc to know that whatever object ur passing is going to be send as an action object to every reducer. Soo we pass the user obj here to set as the payload for the setCurrentUser action
//  updateCollection: collectionsMap => dispatch(updateCollections(collectionsMap)),
  checkUserSession: () => dispatch(checkUserSession()),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);//now we connect our app to the outcome of the mapDispatchToProps. Actually connect has 2 args 'mapStateToProps' and 'mapDispatchToProps'. Here we dont use 'mapStateToProps' bcoz we dont need currentUser here as we passed currrentUser to the headerComponent
//so we pass the 1st arg is 'mapStateToProps' it returns the currentUser value and in the 2nd arg pass the 'mapDispatchToProps' func.


