import React from 'react'
import MyCard from '../utils/card'
import { Box, Container } from '@mui/material'
import Image from 'next/image'

interface Props {
    comic: string,
    price: string,
    img: string
}

const ProductDetails = ({comic, price, img}: Props) => {

  return (
    <MyCard>
        <Container>
            <h2>{comic}</h2>
            <Box sx={{ with: '300px' }}>
                <Image src={img} width={300} height={400}/>
            </Box>
            <h2>${price}</h2>
        </Container>
    </MyCard>
  )
}

export default ProductDetails