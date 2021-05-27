import React from 'react';
import Admin from '../Accounts/Admin';
import Borrower from '../Accounts/Borrower';
import Lender from '../Accounts/Lender';
import Container from '@material-ui/core/Container';

const Dashboard = ({user,userRole}) => {

    console.log(user, userRole);


    return (
        <Container maxWidth="md">
            <div>
                <h2>Welcome {user?.profile?.name}</h2>
            </div>

            {userRole === 'admin' &&
                <>
                <h3> Role: ADMIN </h3>
                <Admin user={user}></Admin>
                </>
            }

            { userRole === 'user-borrow' &&
                <>
                <h3> Role: Borrower</h3>
                <Borrower user={user}></Borrower>
                </>
            }
            { userRole === 'user-lend' &&
                <>
                <h3> Role: Lender</h3>
                    <Lender user={user}></Lender>
                </>
            }

        </Container>
    );
};

export default Dashboard;