import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {selectShopCollection } from '../../redux/shop/shop.selectors';
import CollectionItems from '../../components/collection-item/collection-item.components';
import './collection.styles.scss';
import { firestore } from '../../firebase/firebase.utils';

const CollectionPage = ({collection}) => {// here we have access to match, location and history, bcoz the category page is inside shop component's <Route> so the Route automatically passess these 3 objects access into category component

/** Note: the below useEffect method we putting just to show the use of useEffect and its clean-up function. Actually its not required for this collection component */
//with useEffect funct we can able to return the other funct which is the clean-up function, this clean-up func the useEffect will call when the component un-mount. So this serves the same purpose as componentWillUnMount method
useEffect(() => {
    console.log('I am subscribing');
    const unsubscribeFromCollections = firestore
        .collection('collections')
        .onSnapshot(async snapshot => console.log(snapshot));
    return () => { // clean-up funct.
        console.log('I am unsubscribing');
        unsubscribeFromCollections();
    }
});

const { title, items } = collection;    

    return(
        <div className='collection-page'>
            <h2 className='title'> {title}</h2>
            <div className='items'> 
                { items.map(item => ( 
                    <CollectionItems key={item.id} item={item}/>
                ))}
            </div>
        </div>
    )
    
};
const mapStateToProps = (state, ownProps) => ({
    collection: selectShopCollection(ownProps.match.params.collectionId)(state) // we need to pass the state for this selector for the urlParam
})
export default connect(mapStateToProps)(CollectionPage);