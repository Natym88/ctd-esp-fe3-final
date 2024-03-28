import { ListItemAvatar, Avatar, ListItemText, Typography, ListItem } from '@mui/material'
import { Character } from 'model/character'
import { Creator } from 'model/creator'
import Link from 'next/link'

import React from 'react'

interface Props {
    child: Character | Creator
}

const MyListItem = ({ child }: Props) => {

    const isCharacter = 'name' in child;
    let charUrl = "";
    if (isCharacter) {
        charUrl = `/personajes/${child.id}`;
    }
    return (
        <Link href={charUrl}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={isCharacter ? child.name : child.fullName} src={`${child.thumbnail.path}.${child.thumbnail.extension}`} />
                </ListItemAvatar>
                <ListItemText
                    primary={isCharacter ? child.name : child.fullName}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {isCharacter ? 'Personaje' : 'Creador'}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </Link>
    )
}

export default MyListItem