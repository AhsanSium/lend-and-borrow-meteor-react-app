import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { loanCollection } from '../../../db/LoanCollection';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ConfirmedLoans from './LoanEdit/ConfirmedLoans';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formContainer: {

    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Borrower = ({ user }) => {

    const classes = useStyles();

    const [borrowInfo, setBorrowInfo] = useState({
        name: '',
        amount: '',
        phone: ''
    });

    const { requestedLoans } = useTracker(() => {
        Meteor.subscribe('loans');
        if (!Meteor.user()) {
            return "noDataAvailable";
        }
        const requestedLoans = loanCollection.find({ 'userInfo._id': user._id }).fetch();
        return { requestedLoans };
    });

    const handleChange = e => {
        // console.log(e.target.value,e.target.name);
        if (e.target.name === 'amount') {
            const newBorrowInfo = { ...borrowInfo };
            newBorrowInfo.amount = e.target.value;
            setBorrowInfo(newBorrowInfo);
        }
        if (e.target.name === 'name') {
            const newBorrowInfo = { ...borrowInfo };
            newBorrowInfo.name = e.target.value;
            setBorrowInfo(newBorrowInfo);
        }
        if (e.target.name === 'phone') {
            const newBorrowInfo = { ...borrowInfo };
            newBorrowInfo.phone = e.target.value;
            setBorrowInfo(newBorrowInfo);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(borrowInfo);
        if (!borrowInfo) return;
        try {
            const status = 'pending';
            Meteor.call('loans.insert', user, status, borrowInfo);
            setBorrowInfo({
                name: '',
                amount: '',
                phone: ''
            });
            setOpen(true);
            this.myFormRef.reset();
        } catch (error) {

        }

    }

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={4} align="center">
                    <h3>Request a Loan</h3>

                    <form className={classes.root} onSubmit={handleSubmit} ref={(el) => this.myFormRef = el}>

                        <TextField name="name" type="text" placeholder='Name' onChange={(e) => handleChange(e)} required />
                        <br />
                        <TextField type="number" name="amount"
                            placeholder='Amount of Loan'
                            onChange={(e) => handleChange(e)} required />
                        <br />
                        <TextField placeholder='Phone No' type="text" name="phone" id="" onChange={(e) => handleChange(e)} required />
                        <br />
                        <Button variant="contained" style={{ backgroundColor: '#93ff93' }} type="submit">Request</Button>

                        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                Loan Request Success!
                            </Alert>
                        </Snackbar>

                    </form>
                </Grid>
                <Grid item xs={8}>
                    <h3>Your Requested Loans:{requestedLoans?.length}</h3>
                    {
                        requestedLoans.map(singleLoan => <ConfirmedLoans singleLoan={singleLoan} />)
                    }
                </Grid>

            </Grid>


        </Container>
    );
};

export default Borrower;