import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Users from './Users/Users';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const Admin = ({ user }) => {

    const [adminInfo, setAdminInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { allUserData } = useTracker(() => {
        Meteor.subscribe("userList");
        if (!Meteor.user()) {
            return 'noDataAvailable';
        }
        const allUserData = Meteor.users?.find({}).fetch();
        return { allUserData };
    });

    const handleChange = e => {
        // console.log(e.target.value,e.target.name);
        if (e.target.name === 'username') {
            const newAdminInfo = { ...adminInfo };
            newAdminInfo.name = e.target.value;
            setAdminInfo(newAdminInfo);
        }
        if (e.target.name === 'email') {
            const newAdminInfo = { ...adminInfo };
            newAdminInfo.email = e.target.value;
            setAdminInfo(newAdminInfo);
        }
        if (e.target.name === 'password') {
            const newAdminInfo = { ...adminInfo };
            newAdminInfo.password = e.target.value;
            setAdminInfo(newAdminInfo);
        }
    }

    const setAdminRole = (adminData) => Meteor.call('admin.role', adminData);

    const submit = e => {
        e.preventDefault();
        const adminData = {
            email: adminInfo.email,
            password: adminInfo.password,
            name: adminInfo.name
        }
        // console.log(email, userRole);
        setAdminRole(adminData);

    };

    const handleDelete = (id) => {
        Meteor.call('delete.user', id);
    }


    return (
        <Container>
            <Grid container spacing={3} justify = "center" alignItems = "center">
                <Grid item xs={6}>
                <h3>Add ADMIN</h3>
                    <form onSubmit={submit} className="login-form">
                        <div>
                            <br />
                            <TextField
                                type="text"
                                placeholder="Admin Name"
                                name="username"
                                required
                                onChange={e => handleChange(e)}

                            />
                        </div>

                        <div>

                            <TextField
                                type="email"
                                placeholder="Admin Email"
                                name="email"
                                required
                                onChange={e => handleChange(e)}

                            />
                        </div>

                        <div>
                            <TextField
                                type="password"
                                placeholder="Password"
                                name="password"
                                required
                                onChange={e => handleChange(e)}
                            />

                        </div>
                        <br />
                        <div>

                            <Button variant="contained" color="primary" type="submit">Submit</Button>

                        </div>
                    </form>
                </Grid>
                <Grid item xs={6}>
                    <h3>Delete User</h3>

                    {
                        console.log(allUserData)
                    }
                    {
                        allUserData && allUserData.map(singleUser => <Users handleDelete={handleDelete} key={singleUser._id} singleUser={singleUser}></Users>)

                    }
                </Grid>
            </Grid>


        </Container>
    );
};

export default Admin;


//meteor deploy lend-and-borrow.meteorapp.com --free --mongo
//npx browserslist@latest --update-db