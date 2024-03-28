import { Typography, Button, Grid, CardActions, CardContent, CardMedia, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React from 'react';
import MyCard from '../utils/card';
import { Comic } from 'model/comic';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getComicCharacter } from 'dh-marvel/services/marvel/marvel.service';
import { GetStaticProps } from 'next/types';
import MyList from '../utils/list';
import { channel } from 'diagnostics_channel';
import { Characters } from 'model/character';
import Link from 'next/link';
import comic from 'dh-marvel/test/mocks/comic';

interface ProductCardProps {
    children: Comic;
}

const ProductCard = ({ children }: ProductCardProps) => {

    const id = children.id;

    return (
        <Grid item xs={12} md={6} lg={3} key={children.id}>
            <MyCard>
                <CardMedia
                    sx={{ height: 500, backgroundSize: 'contain' }}
                    image={children.thumbnail.path + '.' + children.thumbnail.extension}
                    title={"image"}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {children.title}
                    </Typography>
                    {children.description != '' && <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Descripción
                        </AccordionSummary>
                        <AccordionDetails>
                            {children.description}
                        </AccordionDetails>
                    </Accordion>}
                </CardContent>
                <CardActions>
                <Link href={`/`}><Button size="small">Comprar</Button></Link>
                <Link href={`/comics/${children.id}`}><Button size="small">Ver detalle</Button></Link>
                </CardActions>
            </MyCard>
        </Grid>
    )
}

export default ProductCard