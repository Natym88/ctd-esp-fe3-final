import { Container, Snackbar } from '@mui/material';
import { useCheckout } from 'context';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import ProductDetails from 'dh-marvel/components/productDetails';
import MyStepper from 'dh-marvel/components/stepper';
import { CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';
import { BASE_URL } from 'dh-marvel/services/APIConfig';
import { NextApiResponse } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Checkout = () => {

  const { checkoutData, setCheckoutData } = useCheckout();
  const router = useRouter();
  const { comic, price, comicImg } = router.query;
  const [open, setOpen] = React.useState(false);
  const [ res, setRes] = useState<any>();

  useEffect(() => {
    const newData = checkoutData;
    newData.order.name = comic as string;
    newData.order.price = parseInt(price as string);
    newData.order.image = comicImg as string;
    setCheckoutData(newData);
  }, [])

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const confirmation = async () => {
    const res = await checkout(checkoutData);
    res.status == 200 && router.push("/confirmacion-compra");
    const data = await res.json();
    setRes(data);
    setOpen(true);    
  }

  const checkout = async (checkoutData: CheckoutInput) => {
    const res = await fetch(BASE_URL + 'api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutData)
    });
    return res;
  }

  return (
    <LayoutCheckout>
      <Container sx={{ display: 'flex', margin: '25px', alignItems: 'center' }}>
        <ProductDetails comic={comic as string} price={price as string} img={comicImg as string} />
        <MyStepper confirmation={confirmation}></MyStepper>
      </Container>
      <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    message={res?.message}
  />;
    </LayoutCheckout>
  )
}

export default Checkout