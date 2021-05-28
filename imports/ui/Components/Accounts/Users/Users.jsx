import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
}));

const users = ({singleUser, handleDelete}) => {

    const classes = useStyles();
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    return (
        <div>
            <div className={classes.demo}>
                <List dense={dense}>
                    <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                        <AccountBoxIcon color={'primary'} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={singleUser.emails[0].address}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={()=> handleDelete(singleUser._id)}>
                        <DeleteIcon color={'secondary'} />
                        </IconButton>
                    </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </div>
            {
                console.log(singleUser)
            }
        </div>
    );
};

export default users;