import React from 'react';
import Admin from '../Accounts/Admin';
import Borrower from '../Accounts/Borrower';
import Lender from '../Accounts/Lender';
import Container from '@material-ui/core/Container';

const Dashboard = ({user,userRole}) => {

    console.log(user, userRole);


    return (
        <Container>
            <div>
                <h2>Welcome {user?.profile?.name}</h2>
            </div>

            {userRole === 'admin' &&           
                <Admin user={user}></Admin>
            }

            { userRole === 'user-borrow' &&
                <Borrower user={user}></Borrower>
            }
            { userRole === 'user-lend' &&
                    <Lender user={user}></Lender>
            }

        </Container>
    );
};

export default Dashboard;