import React from 'react';
import Admin from '../Accounts/Admin';
import Borrower from '../Accounts/Borrower';
import Lender from '../Accounts/Lender';

const logout = () => Meteor.logout();

const Dashboard = ({user,userRole}) => {

    console.log(user, userRole);


    return (
        <div>
            <div>
                <h2>Welcome {user?.profile?.name}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, architecto? At facere quod consequatur, nobis quis nam doloribus quasi, reiciendis quam velit fuga deserunt soluta enim tempore necessitatibus. Modi, autem.</p>
            </div>
            <button onClick={logout}>Logout</button>

            {userRole === 'admin' &&
                <>
                <h3> ADMIN Check</h3>
                <Admin user={user}></Admin>
                </>
            }

            { userRole === 'user-borrow' &&
                <>
                <h3> Borrower Check</h3>
                <Borrower user={user}></Borrower>
                </>
            }
            { userRole === 'user-lend' &&
                <>
                <h3> Lender Check</h3>
                    <Lender user={user}></Lender>
                </>
            }

        </div>
    );
};

export default Dashboard;