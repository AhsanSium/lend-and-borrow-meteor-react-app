import React from 'react';

const users = ({singleUser, handleDelete}) => {
    return (
        <div>
            {
                console.log(singleUser)
            }
            <h3>Email:{singleUser.emails[0].address}</h3>
            <button onClick={()=> handleDelete(singleUser._id)}>Delete</button>
        </div>
    );
};

export default users;