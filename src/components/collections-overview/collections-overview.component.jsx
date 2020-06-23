import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import CollectionPreview from '../preview-collections/preview-collection.components';

import './collections-overview.styles.scss';

const CollectionsOveriew = ({collections}) => {
    console.log(collections);
    return (
        <div className='collections-overview'>
        { // this collections.map function wont work as we change the shop.data.js file to object intead of array. so we create a new selector in shop.selector that will convert object into array
            collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps}/>
        ))
        }
        </div>
    )
    
};

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOveriew);