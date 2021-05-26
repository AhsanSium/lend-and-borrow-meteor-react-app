import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
// {{> loginButtons}}
import { Accounts } from 'meteor/accounts-base';
// import { Roles } from 'meteor/alanning:roles';

const LoginForm = () => {

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
            newUserInfo.password = e.target.value;
            setUserInfo(newUserInfo);
        }
    }

    const setRole = ( email, role ) => Meteor.call('users.role', {email, role});

    const submit = e => {
        e.preventDefault();
        console.log(userInfo.email, userInfo.userRole);
        if(newUser){
            Accounts.createUser({ email:userInfo.email, password: userInfo.password, profile: { name: userInfo.userName }}, (err)=> {
                if (err) console.error(err.reason);
                else {
                    console.info('Create user success !');
                    setRole(userInfo.email, userInfo.userRole);
                }
            });
        }
        else{
            Meteor.loginWithPassword(userInfo.email, userInfo.password);
            console.log(userInfo.email, userInfo.userRole);
        }
        
    };

    return (
        <form onSubmit={submit} className="login-form">

            
            <div>
                <h3>{newUser ? 'Sign Up': 'Login'}</h3>
            </div>   
                
            <div>
                <label htmlFor="newUser">New User</label>
                <input type="checkbox" name="newUser" id="" onChange={()=>setNewUser(!newUser)}/>
            </div>
            <br />
            { newUser &&
            <div>

                <label htmlFor="username">User Name</label>
                <br />
                <input
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

                <input
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
                <input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={e => handleChange(e)}
                />

            </div>

            { newUser &&
                <div>
                    <label htmlFor="role">Choose a Role:</label>
                    <select id="role" name="role" onChange={e => handleChange(e)} required >
                        <option default value="user-borrow">Borrower</option>
                        <option  value="user-lend">Lender</option>
                    </select>
                </div>

            }            
        
            <div>

                <button type="submit">{ newUser? 'Sign Up': 'Log In'}</button>

            </div>
            
      </form>
    );
};

export default LoginForm;