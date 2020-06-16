import React from 'react';
import { connect } from 'react-redux';
import {selectShopCollection } from '../../redux/shop/shop.selectors';
import CollectionItems from '../../components/collection-item/collection-item.components';
import './collection.styles.scss';

const CollectionPage = ({collection}) => {// here we have access to match, location and history, bcoz the category page is inside shop component's <Route> so the Route automatically passess these 3 objects access into category component
const { title, items } = collection;    
console.log(collection);
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