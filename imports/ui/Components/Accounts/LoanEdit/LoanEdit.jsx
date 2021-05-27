import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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

const LoanEdit = ({singleLoan, handleConfirmPay}) => {

    const classes = useStyles();
    const [dense, setDense] = useState(false);

    const [ hideElement , setHideElement ] = useState(false);

    console.log(singleLoan.status);
    
    const handleConfirmClick = () => {
        handleConfirmPay(singleLoan._id, 'Confirmed')
        setHideElement(true);
    }

    return (
        <div>
            {
                !hideElement && singleLoan.status === 'pending' &&
                    <div className={classes.demo}>
                        <List dense={dense}>
                            <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                <AccountBoxIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<h3>Name: {singleLoan.borrowInfo.name}</h3>}
                            />
                            <ListItemText>
                                <h5>Amount: {singleLoan.borrowInfo.amount}</h5>
                            </ListItemText>
                            <ListItemText>
                                <h5>Status: {singleLoan.status}</h5>
                            </ListItemText>
                            
                            <ListItemSecondaryAction>
                                confirm Pay
                                <IconButton edge="end" aria-label="delete" onClick={ handleConfirmClick}>
                                    
                                <CheckCircleOutlineIcon color={'primary'} />
                                </IconButton>
                            </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </div>
            }
            {/* {   !hideElement &&
                <>
                    <h3>Name: {singleLoan.borrowInfo.name}</h3>
                    <h5>Amount: {singleLoan.borrowInfo.amount}</h5>
                    <h5>Status: {singleLoan.status}</h5>
                    {
                        singleLoan.status === 'pending' &&
                        <button onClick={handleConfirmClick}>Confirm</button>
                    }
                </>
            } */}
        </div>
    );
};

export default LoanEdit;