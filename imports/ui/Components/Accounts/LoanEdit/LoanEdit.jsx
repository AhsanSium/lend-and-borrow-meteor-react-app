import React, { useState } from 'react';

const LoanEdit = ({singleLoan, handleConfirmPay}) => {

    const [ hideElement , setHideElement ] = useState(false);

    console.log(singleLoan.status);
    
    const handleConfirmClick = () => {
        handleConfirmPay(singleLoan._id, 'Confirmed')
        setHideElement(true);
    }

    return (
        <div>
            {   !hideElement &&
                <>
                    <h3>Name: {singleLoan.borrowInfo.name}</h3>
                    <h5>Amount: {singleLoan.borrowInfo.amount}</h5>
                    <h5>Status: {singleLoan.status}</h5>
                    {
                        singleLoan.status === 'pending' &&
                        <button onClick={handleConfirmClick}>Confirm</button>
                    }
                </>
            }
        </div>
    );
};

export default LoanEdit;