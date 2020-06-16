import { createSelector } from 'reselect';

// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// }
const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections=> Object.keys(collections).map(key => collections[key]) // Object.key will provide all the key value, get the key and map that to the collections object to get all its values and rrturn that as array
)
export const selectShopCollection = collectionUrlParam =>  // match the collection item based on the urlparam (/shop/hats) we passed
    createSelector(
        [selectShopCollections],
        collections => collections[collectionUrlParam]
            // collections.find( //this find query will takes lot of time. Instead of looping into the array and look for each data, we can store this in the object with key value pair this is called data normalization.
            //     collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
            // )
    )