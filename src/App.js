import React from 'react';
import {Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.components';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-sign-up.components';
import CheckoutPage from './pages/checkout/checkout.components';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import CollectionPage from './pages/collection/collection.component';

const TopicsList = (props) => {
  console.log(props);
  return(
    <div>
      <Link to='/'>Home </Link>
      <h1> TOPIC LIST </h1>
      <Link to={`${props.match.url}/13`}> Topic 13</Link>
      <Link to={`${props.match.url}/14`}> Topic 14</Link>
      <Link to={`${props.match.url}/15`}> Topic 15</Link>
    </div>
  )
}
const TopicsDetail = (props) => {
  console.log(props);
  return(
    <div>
      <button onClick={() => props.history.push('/topics')}>Topics </button>
      {/* <Link to='/topics'> Topics</Link> */}
      <h1> TOPIC DETaIL : {props.match.params.topicId} </h1>
    </div>
  )
}

// whnever the user login using whatever service Google signIn or normal Email/Password, we want to store the state of the user on the App state and pass it into the components, so make the App as class component

class App extends React.Component { //Route component has 3 attributes, component is the name of the compoenent, path - want we want to set, exact - exactly the actual path matches with the path's attribute value, it accepts true/ false. bydefault its true
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null
  //   }
  // }
// we dont need the constructor with the state as we pass currentUserState using redux 
unSubscribeFromAuth = null;

  //componentDidMount method where used to firing a fetch to back end to fetch data, once it call fetch it wont call fetch again until the componentDidMount method gets call again, but we dont want to remount our app.
  //so whenver the user signIn and signOut we want to be aware of the change without having to manually fetch. Firebase makes that reaaly easy
  componentDidMount() {
    const { setCurrentUser } = this.props;
    //this is open subscription, its an open messaging system between our appln and firebase, whenever any changes occur on firebase from any source in this appln, it sends out a msg says that App status change and user has updated, whether they signIn with Google or normal Email/Password or signOut.
    // Then it wil give that current App state user to the below func, so we dont want to manually fetch to check the status has changed or not
    /** The beloe methid will return the user object and its DocRef exist in DB, if it not exist it created the userRef document which is  defined in the 'firebase.utils.js' */
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { // this onAuthStateChanged method from firebase's auth library provide the user state of the auth firebase project
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);  // passing the user we logged in via Google SignIn to the firebase createUserProfileDocument methids, so this user will get store into the firestore
        userRef.onSnapshot(snapShot => { // snaphsot object provide the data related to the user stored in the DB
          // this.setState({currentUser: {
          //   id: snapShot.id,
          //   ...snapShot.data()
          // }});
          setCurrentUser({ //repalace the above this.setState witht the redux's setCurrentUser
            id: snapShot.id,
            ...snapShot.data()
          });
        })
      }
      setCurrentUser(userAuth); // this is to set if the user is not signed In also we need to set null to the currentUser, userAuth is null outisde of if(userAuth) condn
    })
  }
  //since the above is the open subscription, we also have to close the subscription when this unmounts as we dont want any memory leaks in our JS
  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
//Switch component wraps around the Route component, it works in a way if finds a match in the path then it render that only, it will not render other paths
render() {
  return (
    <div>
      <Header/>
       <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signIn' render={() => this.props.currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage/>} />
        <Route exact path='/topics' component={TopicsList}/>
        <Route path='/topics/:topicId' component={TopicsDetail}/>
        <Route path='/shop/:collectionId' component={CollectionPage} />
       </Switch>
    </div>
  );
}  

}

// const mapStateToProps = ({user}) => ({
//   currentUser: user.currentUser
// });
// change the above method with reselect slector method
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch =>({ //It is a func that gets dispatch ppty and it returns whatever the prop we pass to it. Here we pass the user action 'setCurrentUser'
 setCurrentUser : user => dispatch(setCurrentUser(user))  // this dispatch func is a way for reduc to know that whatever object ur passing is going to be send as an action object to every reducer. Soo we pass the user obj here to set as the payload for the setCurrentUser action
})

export default connect(mapStateToProps, mapDispatchToProps)(App);//now we connect our app to the outcome of the mapDispatchToProps. Actually connect has 2 args 'mapStateToProps' and 'mapDispatchToProps'. Here we dont use 'mapStateToProps' bcoz we dont need currentUser here as we passed currrentUser to the headerComponent
//so we pass the 1st arg is 'mapStateToProps' it returns the currentUser value and in the 2nd arg pass the 'mapDispatchToProps' func.


