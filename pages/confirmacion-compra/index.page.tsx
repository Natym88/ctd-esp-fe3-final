import { Box, Container } from '@mui/material';
import { useCheckout } from 'context';
import ProductDetails from 'dh-marvel/components/productDetails';
import React from 'react'

const Confirmacion = () => {

    const { checkoutData, setCheckoutData } = useCheckout();

  return (
    <Container>
        <Box sx={{backgroundColor: 'green', textAlign: 'center', padding: '25px 0'}}>Que disfrutes tu compra</Box>
        <ProductDetails comic={checkoutData.order.name} price={checkoutData.order.price.toString()} img={checkoutData.order.image} />
        <p>{`Hola! ${checkoutData.customer.name} ${checkoutData.customer.lastname}`}</p>
        <p>{`Te llegará a ${checkoutData.customer.address.address1} ${checkoutData.customer.address.address2}, ${checkoutData.customer.address.city}, ${checkoutData.customer.address.state} CP: ${checkoutData.customer.address.zipCode}`}</p>
    </Container>
  )
}

export default Confirmacion