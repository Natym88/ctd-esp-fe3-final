import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Character } from 'model/character';
import { Creator } from 'model/creator';
import Link from 'next/link';
import MyListItem from './listItem';

interface Props {
    children: Character[] | Creator[]
}
const MyList = ({ children }: Props) => {

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {children.map(c => (
                <>
                    <MyListItem child={c} key={c.id}></MyListItem>
                    <Divider variant="inset" component="li" />
                </>
            ))}
        </List>
    )
}

export default MyList