import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useTracker } from 'meteor/react-meteor-data';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formContainer: {

    }
}));

const LoginForm = () => {

    const classes = useStyles();

    const [newUser, setNewUser] = useState(false);

    const [userInfo, setUserInfo] = useState({
        userName: '',
        email: '',
        password: '',
        userRole: 'user-borrow'
    });

    const [open, setOpen] = useState({status:false, message:''});

    const handleChange = e => {
        // console.log(e.target.value,e.target.name);
        if (e.target.name === 'username') {
            const newUserInfo = { ...userInfo };
            newUserInfo.userName = e.target.value;
            setUserInfo(newUserInfo);
        }
        if (e.target.name === 'email') {
            const newUserInfo = { ...userInfo };
            newUserInfo.email = e.target.value;
            setUserInfo(newUserInfo);
        }
        if (e.target.name === 'password') {
            const newUserInfo = { ...userInfo };
            newUserInfo.password = e.target.value;
            setUserInfo(newUserInfo);
        }

        if (e.target.name === 'role') {
            const newUserInfo = { ...userInfo };
            newUserInfo.userRole = e.target.value;
            setUserInfo(newUserInfo);
        }
    }

    const { setRole } = useTracker(() => {
        Meteor.subscribe("roles");
        const setRole = (email, role) => Meteor.call('users.role', { email, role });
        return { setRole };
    })

    const submit = e => {
        e.preventDefault();
        // console.log(userInfo.email, userInfo.userRole);

        try {
            if (Meteor.users?.find({}).count() === 0 && userInfo.email === 'admin@admin.com') {
                Accounts.createUser({ email: userInfo.email, password: userInfo.password, profile: { name: 'Default Admin' } }, (err) => {
                    if (err) console.error(err.reason);
                    else {
                        console.info('Create user success !');
                        setRole('admin@admin.com', 'admin');
                    }
                });
            }
            if (newUser) {
                Accounts.createUser({ email: userInfo.email, password: userInfo.password, profile: { name: userInfo.userName } }, (err) => {
                    if (err) console.error(err.reason);
                    else {
                        console.info('Create user success !');
                        setRole(userInfo.email, userInfo.userRole);
                    }
                });
            }
    
            if (!newUser) {
                try {
                    Meteor.loginWithPassword(userInfo.email, userInfo.password, function(err){
                        console.log('ERMSJ',err.message);
                        if(err.message !== undefined){
                            handleError(err.message);
                        }
                        return err;
                    });
                    console.log(userInfo.email, userInfo.userRole);
                } catch (error) {

                    console.log(error);
                }
                
            }
            
        } catch (error) {
            console.log(error);
        }

    };

    const handleError = (err) => {
        const newOpen = {...open};
        newOpen.status = true;
        newOpen.message = err;
        setOpen(newOpen);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container className={classes.formContainer}>
            <Grid container spacing={3} justify = "center" alignItems = "center" >
                <Grid item xs={12} sm={6}>
                    <Paper >
                        <Box p={3} mt={1}>
                        <Box color="text.secondary">
                        <h5 >For Functionality Testing</h5>
                            <small>Default Admin Email: admin@admin.com</small>
                            <br />
                            <small>Default Admin Password: admin </small>
                        </Box>
                            <form onSubmit={submit} className={classes.root} autoComplete="off">

                                <div>
                                    <h2>{newUser ? 'Sign Up' : 'Login'}</h2>
                                </div>

                                <div>
                                    <label htmlFor="newUser">New User</label>
                                    <Checkbox type="checkbox" name="newUser" id="" onClick={() => setNewUser(!newUser)} />
                                </div>
                                {newUser &&
                                    <div>
                                        <label htmlFor="username">User Name</label>
                                        <br />
                                        <TextField
                                            type="text"
                                            placeholder="Your Name"
                                            name="username"
                                            required
                                            onChange={e => handleChange(e)}
                                        />
                                    </div>
                                }

                                <div>
                                    <label htmlFor="email">E-mail</label>

                                </div>

                                <div>

                                    <TextField
                                        type="email"
                                        placeholder="user email"
                                        name="email"
                                        required
                                        onChange={e => handleChange(e)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Ahsan">Password</label>

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

                                {newUser &&
                                    <div>
                                        <label htmlFor="role">Choose a Role: </label>
                                        <select style={{ padding: '10px 5px', boxShadow: 'rgb(236 236 236) 1px 2px 3px 3px', borderRadius: '10px' }} id="role" name="role" onChange={e => handleChange(e)} required >
                                            <option value="user-borrow">Borrower</option>
                                            <option value="user-lend">Lender</option>
                                        </select>
                                    </div>

                                }

                                <div>

                                    <Button variant="contained" color="primary" type="submit">{newUser ? 'Sign Up' : 'Log In'}</Button>

                                </div>

                            </form>
                            <Snackbar open={open.status} autoHideDuration={2000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error">
                                    {open.message}
                                </Alert>
                            </Snackbar>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box mt={1}>
                        <img style={{width:'100%'}} src="/Images/login.jpg" alt="" />
                    </Box>
                </Grid>
            </Grid>

        </Container>
    );
};

export default LoginForm;