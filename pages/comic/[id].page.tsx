import { Accordion, AccordionDetails, AccordionSummary, Button, Container } from '@mui/material'
import MyList from 'dh-marvel/components/utils/list'
import { getComic, getComicCharacter, getComicCreators, getComics } from 'dh-marvel/services/marvel/marvel.service'
import { Character } from 'model/character'
import { Comic } from 'model/comic'
import { Creator } from 'model/creator'
import { GetStaticPaths, GetStaticProps } from 'next'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image'
import React from 'react'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'
import Link from 'next/link'

interface Props {
  comic: Comic;
  characters: Character[];
  creators: Creator[];
}

const Comic = ({ comic, characters, creators }: Props) => {

  return (
    <BodySingle title={comic.title} containerProps={{sx: {minHeight: 'calc(100vh - 121px)'}}}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Container style={{ width: '300px', margin: 0 }} >
          <Image src={`${comic.thumbnail.path + '.' + comic.thumbnail.extension}`} height={500} width={300} />
          <Link href={`/checkout`}><Button>Comprar</Button></Link>
        </Container>
        {characters.length > 0 &&
          <Container style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', maxWidth: '400px' }}>
          <h2>Precio: ${comic.price}</h2>
          {comic.stock > 0 ? `Stock: ${comic.stock}` : 'Sin stock'}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >personajes</AccordionSummary>
              <AccordionDetails>
                <MyList>{characters}</MyList>

              </AccordionDetails>
            </Accordion>
            {
            creators.length > 0 &&
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >{creators.length === 1 ? 'Creador' : 'Creadores'}</AccordionSummary>
              <AccordionDetails>
                <MyList>{creators}</MyList>
              </AccordionDetails>
            </Accordion>
          }
          </Container>
        }
      </div>
    </BodySingle>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getComics();

  const comics = data.data.results;

  // Obtener los paths para cada comic
  const paths = comics.map((comic: Comic) => ({ params: { id: comic.id.toString() } }));

  return {
    paths,
    // Mostar las diferentes opcion de ISG por ejemplo: blocking, incremental
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  let comic;
  let characters;
  let creators;
  if (params != undefined) {
    const id = parseInt(params.id as string);
    if (typeof (id) == 'number') {
      comic = await getComic(id);
      characters = await getComicCharacter(id);
      creators = await getComicCreators(id);
    }

  }

  return {
    props: {
      comic,
      characters,
      creators
    }
  }
}

export default Comic