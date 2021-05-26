import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { loanCollection } from '../../../db/LoanCollection';
import LoanEdit from './LoanEdit/LoanEdit';
import { Meteor } from 'meteor/meteor';

const Lender = ({user}) => {

    const { loans, confirmedLoans , isLoading } = useTracker(() => {
        Meteor.subscribe('loans');
        const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
        if (!Meteor.user()) {
          return noDataAvailable;
        }
        // if (!handler.ready()) {
        //   return { isLoading: true };
        // }
    
        const loans = loanCollection.find().fetch();

        // const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

        
        const confirmedLoans = loanCollection.find({'lenderInfo._id':user._id}).fetch();
        
        console.log(loans, confirmedLoans);

        return {loans, confirmedLoans};
    });

    const handleConfirmPay = (id,status) => {
        const lenderInfo = Meteor.user();
        Meteor.call('loans.update',id, status, lenderInfo);
    }

    return (
        <div>
            <h3>Your Confirmed Loans {confirmedLoans.length}</h3>
            {
                // console.log(loans&&loans[0])
                loans&&loans.map(singleLoan => <LoanEdit key={singleLoan._id} singleLoan={singleLoan} handleConfirmPay={handleConfirmPay} /> )

            }
        </div>
    );
};

export default Lender;