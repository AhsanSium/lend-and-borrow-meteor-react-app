import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { loanCollection } from '../../../db/LoanCollection';

const Borrower = ({user}) => {

    const [borrowInfo, setBorrowInfo] = useState({
        name:'',
        amount:'',
        phone:''
    });

    const {requestedLoans} = useTracker(()=> {
        Meteor.subscribe("loans");
        if (!Meteor.user()) {
            return noDataAvailable;
        }
        const requestedLoans = loanCollection.find({'userInfo._id':user._id}).fetch();
        return {requestedLoans};
    });

    const handleChange = e => {
        // console.log(e.target.value,e.target.name);
        if(e.target.name === 'amount'){
            const newBorrowInfo = {...borrowInfo};
            newBorrowInfo.amount = e.target.value;
            setBorrowInfo(newBorrowInfo);
        }
        if(e.target.name === 'name'){
            const newBorrowInfo = {...borrowInfo};
            newBorrowInfo.name = e.target.value;
            setBorrowInfo(newBorrowInfo);
        }
        if(e.target.name === 'phone'){
            const newBorrowInfo = {...borrowInfo};
            newBorrowInfo.phone = e.target.value;
            setBorrowInfo(newBorrowInfo);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(borrowInfo);
        if(!borrowInfo) return;
        const status = 'pending';
        Meteor.call('loans.insert', user, status, borrowInfo);
        setBorrowInfo('');
    }

    return (
        <div>
            <h1>{user?.emails[0].address}</h1>
            <h3>Your Requested Loans:{requestedLoans?.length}</h3>
            {
                console.log('Req Loan',requestedLoans&&requestedLoans )
            }
            <h3>Request a Loan</h3>
            <form className='req-form' onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <br />
                <input name="name" type="text" placeholder='Name' onChange={(e) => handleChange(e)} required />
                <br />
                <label htmlFor="loan">Loan Amount</label>
                <br />
                <input type="number" name="amount"
                placeholder='Amount of Loan' 
                onChange={(e) => handleChange(e)} required />
                <br />
                <label htmlFor="phone">Phone No</label>
                <br />
                <input type="text" name="phone" id="" onChange={(e) => handleChange(e)}  required />
                <br />
            <button type="submit">Request</button>
        </form>
            
        </div>
    );
};

export default Borrower;