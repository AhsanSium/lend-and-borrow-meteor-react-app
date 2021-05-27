import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useTracker } from 'meteor/react-meteor-data';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formContainer:{
        
    }
}));

const LoginForm = () => {

    const classes = useStyles();

    const [newUser, setNewUser] = useState(false);
    
    const [userInfo, setUserInfo] = useState({
        userName:'',
        email:'',
        password:'',
        userRole:'user-borrow'
    });

    const handleChange = e => {
        // console.log(e.target.value,e.target.name);
        if(e.target.name === 'username'){
            const newUserInfo = {...userInfo};
            newUserInfo.userName = e.target.value;
            setUserInfo(newUserInfo);
        }
        if(e.target.name === 'email'){
            const newUserInfo = {...userInfo};
            newUserInfo.email = e.target.value;
            setUserInfo(newUserInfo);
        }
        if(e.target.name === 'password'){
            const newUserInfo = {...userInfo};
            newUserInfo.password = e.target.value;
            setUserInfo(newUserInfo);
        }

        if(e.target.name === 'role'){
            const newUserInfo = {...userInfo};
            newUserInfo.userRole = e.target.value;
            setUserInfo(newUserInfo);
        }
    }

    const {setRole} = useTracker(() => {
        Meteor.subscribe("roles");
        const setRole = ( email, role ) => Meteor.call('users.role', {email, role});
        return{setRole};
    })

    const submit = e => {
        e.preventDefault();
        console.log(userInfo.email, userInfo.userRole);
        if(Meteor.users?.find({}).count() === 0 && userInfo.email === 'admin@admin.com'){
            Accounts.createUser({ email:userInfo.email, password: userInfo.password, profile: { name: 'Default Admin' }}, (err)=> {
                if (err) console.error(err.reason);
                else {
                    console.info('Create user success !');
                    setRole('admin@admin.com', 'admin');
                }
            });
        }
        if(newUser){
            Accounts.createUser({ email:userInfo.email, password: userInfo.password, profile: { name: userInfo.userName }}, (err)=> {
                if (err) console.error(err.reason);
                else {
                    console.info('Create user success !');
                    setRole(userInfo.email, userInfo.userRole);
                }
            });
        }
        
        if(!newUser){
            Meteor.loginWithPassword(userInfo.email, userInfo.password);
            console.log(userInfo.email, userInfo.userRole);      
        }
        
        
        
    };

    return (
        <Container className={classes.formContainer}>
        <form onSubmit={submit} className={classes.root} autoComplete="off">

            <div>
                <h2>{newUser ? 'Sign Up': 'Login'}</h2>
            </div>   
                
            <div>
                <label htmlFor="newUser">New User</label>
                <Checkbox type="checkbox" name="newUser" id="" onClick={()=>setNewUser(!newUser)}/>
            </div>
            <br />
            { newUser &&
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

            { newUser &&
                <div>
                    <label htmlFor="role">Choose a Role: </label>
                    <select style={{padding:'10px 5px', boxShadow:'rgb(236 236 236) 1px 2px 3px 3px', borderRadius:'10px'}} id="role" name="role" onChange={e => handleChange(e)} required >
                        <option  value="user-borrow">Borrower</option>
                        <option  value="user-lend">Lender</option>
                    </select>
                </div>

            }            
        
            <div>

                <Button variant="contained" color="primary" type="submit">{ newUser? 'Sign Up': 'Log In'}</Button>

            </div>
            
      </form>
      </Container>
    );
};

export default LoginForm;