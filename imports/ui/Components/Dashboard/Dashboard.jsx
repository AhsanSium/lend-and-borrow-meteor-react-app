import React from 'react';
import Admin from '../Accounts/Admin';
import Borrower from '../Accounts/Borrower';
import Lender from '../Accounts/Lender';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const Dashboard = ({user,userRole}) => {

    // console.log(user, userRole);


    return (
        <Container>
            <Grid  container spacing={3} justify = "center" alignItems = "center" >              
                <Grid item xs={12} sm={6}>
                    <Paper >
                        <Box p={3}>
                            <h2>Welcome {user?.profile?.name}</h2>
                            <strong>Role: {userRole && userRole}</strong>
                        </Box>             
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box mt={2} >
                        <img style={{width: '100%'}} src="/Images/Client.jpg" alt="" />
                    </Box>
                </Grid>
            </Grid>

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