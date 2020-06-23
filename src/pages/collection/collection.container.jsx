import {connect} from 'react-redux';
import {createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionLoaded
});

// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOveriew));
//this higher order component. wrap the CollectionsOveriew with WithSpinner component and with selectCollectionFetching selector
//we can also write the above line using the compose method from the redux library as below
const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;