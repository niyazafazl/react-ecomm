import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import CollectionsOveriew from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import { app } from 'firebase';
import { checkUserSession } from '../../redux/user/user.actions';
import { fetchCollectionStart } from '../../redux/shop/shop.saga';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOveriew);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//this shop compoenent will only rerender if either our props change or if we called the setState in react hook or if the parent of this component which is app.js ends up calling its own re-render
// the only time the above will happen is the current user updates. if we do not listen for that kind of change then will end up calling the useEffect twice.
// if we not put the array property, FETCH_COLLECTION_START will call twice, when the component mounts for the first time it fires the 1st fectCollectionStart, then our component mounts our app, it fires checkUserSession in app comp., 
// this render will in turn trigger the shop component to re-render, this makes the fetchCollectionsStart call twice
const ShopPage = ({ fetchCollectionsStart, match } ) => {

    useEffect(() => {
        fetchCollectionsStart();
    },[fetchCollectionsStart]);
/** if we pass the empty array above it give this warning "React Hook useEffect has a missing dependency: 'fetchCollectionsStart'. Either include it or remove the dependency array. If 'fetchCollectionsStart' changes too often, find the parent component that defines it and wrap that definition in useCallback  react-hooks/exhaustive-deps"<div className=""></div>
in order to avoid that warning we just pass the 'fetchCollectionsStart' in the array. We know this not going to rerender, bcoz the property we pass into the array is the props, we do know this props wont change bcoz we'r getting it form the mapDispatchToProps. */
    return(
        <div className='shop-page'>
           
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

//This is for redux-saga
const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})
export default connect(null, mapDispatchToProps)(ShopPage);