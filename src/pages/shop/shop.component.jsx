import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import CollectionsOveriew from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
// import collectionsOverviewComponent from '../../components/collections-overview/collections-overview.component';
// import SHOP_DATA from './shop.data.js';

//Note: moving this SHOP_DATA to shop.reducer instead of keeping it in the component. For that change the class Component to function component as this doesnt require any state.
/* class ShopPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collections: SHOP_DATA
        };
    }

    render() {
        const {collections} = this.state;
        return(
            <div className='shop-page'>
                {
                    collections.map(({id, ...otherCollectionProps}) => (
                        <CollectionPreview key={id} {...otherCollectionProps}/>
                    ))
                }
            </div>
        );
    }
} */

// const ShopPage = ({ match }) => (// here we have access to match, location and history, bcoz the shop page is inside app.js <Route> so the Route automatically passess these 3 objects access into shop component
  
//         <div className='shop-page'>
//             <Route exact path={`${match.path}`} component={CollectionsOveriew}/>
//             <Route path= {`${match.path}:/collectionId`} component={CollectionPage} />
//         </div>
        
// );
/** Convert the above functional component to class component bcoz we need to fetch the Shop data from frebase as this is the nearest ancestor for the collections components */
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOveriew);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component{
// the below code is for Async code with with-spinning using the HOC (Higher-order component). Another option we can also do using redux thunk
//    state = {
//             loading: true
//         };

    // unsubscribeFromSnapshot = null;

 /**    componentDidMount() {
        // const { updateCollection } = this.props;
        // const collectionRef = firestore.collection('collections');

        // this is using Promise pattern
        /**  fetch('https://firestore.googleapis.com/v1/projects/react-ecomm-4bd07/databases/(default)/documents/collections')
        .then(response => response.json())
        .then(collections => console.log(collections));
        */

        /** collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            console.log(collectionsMap);
            updateCollection(collectionsMap);
            this.setState({loading: false});
        }); */
        //this is using observable pattern
        /**  this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
             const collectionsMap = convertCollectionSnapshotToMap(snapshot);
             console.log(collectionsMap);
             updateCollection(collectionsMap);
             this.setState({loading: false});
         }) 
    } */
    componentDidMount() {
        /** This is for redux-thunk 
       const { fetchCollectionsStartAsync } = this.props;
      fetchCollectionsStartAsync();
      */

      /** This is for redux-saga  */
     const { fetchCollectionsStart } = this.props;
     fetchCollectionsStart();
    }
    render() {
        const {match} = this.props;
        // const { loading } = this.state;
        return(
        <div className='shop-page'>
            {/* <Route 
                path={`${match.path}`} 
                render={(props) => (
                    <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/> 
                )}
            /> */}

            {/* /this overview component is rendering using the container pattern */}
            <Route exact
                path={`${match.path}`} 
                component={CollectionsOverviewContainer}
            />
            {/* <Route path='/shop/:collectionId'
                    render={(props) => (
                    <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/> //if isCollectionsLoaded true means the collection is already loaded, we want to show spinning when the isCollectionsLoaded is false
                )}/> */}
        </div>
        );
    }
} 

// this is to fetch the collections from the shop-data.js file
// const mapStateToProps = createStructuredSelector({
//     collections: selectShopCollections
// })
// change the above method to this. This method is for to fetch the data from the firestore DB and work in async way using HOC
// const mapDispatchToProps = dispatch => ({
//     updateCollection: collectionsMap => 
//     dispatch(updateCollections(collectionsMap))
// })

// These methods are also to fetch data from firebase DB and work in async way using the redux thunk
// const mapStateToProps = createStructuredSelector({
//     isCollectionFetching: selectIsCollectionFetching,
//     isCollectionsLoaded: selectIsCollectionLoaded
// });

/** This is for redux-thunk
const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})
*/

//This is for redux-saga
const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})
export default connect(null, mapDispatchToProps)(ShopPage);