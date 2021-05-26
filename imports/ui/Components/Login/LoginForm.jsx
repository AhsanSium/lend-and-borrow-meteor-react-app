import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
// {{> loginButtons}}
import { Accounts } from 'meteor/accounts-base';
// import { Roles } from 'meteor/alanning:roles';

const LoginForm = () => {

    const [userName, setUsername] = useState('');
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('user-borrow');
    const [newUser, setNewUser] = useState(false);

    const setRole = ( email, role ) => Meteor.call('users.role', {email, role});

    const submit = e => {
        e.preventDefault();
        console.log(email, userRole);
        if(newUser){
            Accounts.createUser({ email:email, password: password, profile: { name: userName }}, (err)=> {
                if (err) console.error(err.reason);
                else {
                    console.info('Create user success !');
                    setRole(email, userRole);
                }
            });
        }
        else{
            Meteor.loginWithPassword(email, password);
            console.log(email, userRole);
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
                onChange={e => setUsername(e.target.value)}
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
                onChange={e => setUserEmail(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
                />

            </div>

            { newUser &&
                <div>
                    <label htmlFor="role">Choose a Role:</label>
                    <select id="role" name="role" onChange={e => setUserRole(e.target.value)} required >
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