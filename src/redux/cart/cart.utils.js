export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );
    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id ? 
            { ...cartItem, quantity: cartItem.quantity + 1} : 
            cartItem)
    }
    //if the cartItem is not found in the array then return all of the cartItems, plus the new cratItem to add as quantity 1
    return [...cartItems, { ...cartItemToAdd, quantity:1}];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const exisitingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )
    if(exisitingCartItem.quantity === 1) { // we want to keep all the cartItem except the one it match with cartItemToRemove
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    //if quantity is more than one, then reduce the number by 1
    return cartItems.map(
        cartItem => 
        cartItem.id === cartItemToRemove.id ?
         { ...cartItem, quantity: cartItem.quantity - 1} 
         : cartItem
    );
}