import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {// checkout btn will take price as a ppty
    const priceForStripe = price * 100;
    const publishableKey =  'pk_test_51GuINeHMWPvuYAL4Ox1gRmUIA44grkwH9uUJzqGGNokHJO8DprkPNN9AKHqclzIk8KwsojUJIJmWvrSzLZLLRbSn00xTSAHGaO';
    const onToken = token => {
        console.log(token);
        alert('Payment successful');
    }
    return (
        <StripeCheckout label='Pay Now' 
        name='Ecomm Pte' 
        billingAddress 
        shippingAddress 
        image='' 
        description={`Your total is $${price}`} 
        amount ={priceForStripe} panelLabel='Pay Now' 
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}
export default StripeCheckoutButton;