import { Button, Container } from '@mui/material';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { getCharacter, getCharacters } from 'dh-marvel/services/marvel/marvel.service';
import { Character } from 'model/character';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'

interface Props {
    personaje: Character
}

const Personaje = ({ personaje }: Props) => {

    const router = useRouter();

    const handleGoBack = () => {
        router.back(); // Navegar a la página anterior
    };
    return (
        <BodySingle title={personaje.name}>
            <Container style={{ width: '300px !important', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={personaje.thumbnail.path + '.' + personaje.thumbnail.extension} width={300} height={300} />
                <Button variant="contained" color="primary" onClick={handleGoBack} style={{marginTop: '10px'}}>
                    Volver
                </Button>
            </Container>
        </BodySingle>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await getCharacters();

    const personajes = data;

    // Obtener los paths para cada personaje
    const paths = personajes.map((personaje: Character) => ({ params: { id: personaje.id.toString() } }));

    return {
        paths,
        // Mostar las diferentes opcion de ISG por ejemplo: blocking, incremental
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

    let personaje;
    if (params != undefined) {
        const id = parseInt(params.id as string);
        if (typeof (id) == 'number') {
            personaje = await getCharacter(id);
        }

    }

    return {
        props: {
            personaje
        }
    }
}


export default Personaje