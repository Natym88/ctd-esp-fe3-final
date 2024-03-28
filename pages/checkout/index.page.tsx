import { Container } from '@mui/material';
import ProductDetails from 'dh-marvel/components/productDetails';
import MyStepper from 'dh-marvel/components/stepper';
import { CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';
import { BASE_URL } from 'dh-marvel/services/APIConfig';
import { useRouter } from 'next/router';
import React from 'react'

const Checkout = () => {

    const router = useRouter();
    const {comic, price, comicImg} = router.query

    const getData = (data: CheckoutInput) => {
      const success = checkout(data)
    }

    const checkout = async (checkoutData: CheckoutInput) => {
      const res = await fetch(BASE_URL + 'api/checkout', {method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutData)});
      const data = await res.json();
      return data;
    }

  return (
    <Container sx={{ display: 'flex', margin: '25px', alignItems: 'center'}}>
      <ProductDetails comic={comic as string} price={price as string} img={comicImg as string} />
      <MyStepper getData={getData}></MyStepper>
    </Container>
  )
}

export default Checkout