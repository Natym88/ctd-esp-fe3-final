import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Character } from 'model/character';
import { Creator } from 'model/creator';

interface Props {
    children: Character[] | Creator[]
}
const MyList = ({ children }: Props) => {

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {children.map(c => (
                <>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={ 'name' in c ? c.name : c.fullName} src={`${c.thumbnail.path}.${c.thumbnail.extension}`} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={ 'name' in c ? c.name : c.fullName}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                
                                    {'name' in c ? 'Personaje' : 'Creador'}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </>
            ))}
        </List>
    )
}

export default MyList