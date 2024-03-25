import { Container, Grid, LinearProgress } from '@mui/material';
import ProductCard from 'dh-marvel/components/productCard';
import { Comic } from 'model/comic';
import React from 'react';

interface Props {
    comics: Comic[];
}

const Home = ({ comics }: Props) => {

    return (

        <Grid container spacing={2}>
            {!comics || comics.length === 0 ? <LinearProgress /> : comics.map((comic) => (
                <ProductCard key={comic.id}>{comic}</ProductCard>
            ))}
        </Grid>
    );
};


export default Home