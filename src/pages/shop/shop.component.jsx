import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOveriew from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

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

const ShopPage = ({ match }) => (// here we have access to match, location and history, bcoz the shop page is inside app.js <Route> so the Route automatically passess these 3 objects access into shop component
  
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOveriew}/>
            <Route path= {`${match.path}:/collectionId`} component={CollectionPage} />
        </div>
        
);

// const mapStateToProps = createStructuredSelector({
//     collections: selectShopCollections
// })
export default ShopPage;