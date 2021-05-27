import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { loanCollection } from '../../../db/LoanCollection';
import LoanEdit from './LoanEdit/LoanEdit';
import { Meteor } from 'meteor/meteor';
import ConfirmedLoans from './LoanEdit/ConfirmedLoans';
import Grid from '@material-ui/core/Grid';

const Lender = ({user}) => {

    const { loans, confirmedLoans , isLoading } = useTracker(() => {
        Meteor.subscribe('loans');
        const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
        if (!Meteor.user()) {
          return noDataAvailable;
        }
    
        const loans = loanCollection.find().fetch();
        
        const confirmedLoans = loanCollection.find({'lenderInfo._id':user._id}).fetch();
        
        console.log(loans,'CFL', confirmedLoans);

        return {loans, confirmedLoans};
    });

    const handleConfirmPay = (id,status) => {
        const lenderInfo = Meteor.user();
        Meteor.call('loans.update',id, status, lenderInfo);
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item sm={12} lg={7}>
                    <h3>Available Loans</h3>
                    {
                        // console.log(loans&&loans[0])
                        loans&&loans.map(singleLoan => <LoanEdit key={singleLoan._id} singleLoan={singleLoan} handleConfirmPay={handleConfirmPay} /> )

                    }
                </Grid>
                <Grid item sm={12} lg={5}>
                    <h3>Your Confirmed Loans {confirmedLoans.length}</h3>
                    {
                        confirmedLoans&&confirmedLoans.map(singleLoan => <ConfirmedLoans key={singleLoan._id} singleLoan={singleLoan} /> )
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default Lender;