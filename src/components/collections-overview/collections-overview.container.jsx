import {connect} from 'react-redux';
import {createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOveriew from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOveriew));
//this higher order component. wrap the CollectionsOveriew with WithSpinner component and with selectCollectionFetching selector
//we can also write the above line using the compose method from the redux library as below
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOveriew);

export default CollectionsOverviewContainer;