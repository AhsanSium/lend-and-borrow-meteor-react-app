import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Users from './Users/Users';

const Admin = ({ user }) => {

    const [adminInfo, setAdminInfo] = useState({
        name:'',
        email:'',
        password:'',
    });

    const {allUserData} = useTracker(()=> {
        Meteor.subscribe("userList");
        if (!Meteor.user()) {
            return 'noDataAvailable';
        }
        const allUserData = Meteor.users?.find({}).fetch();
        return {allUserData};
    });

    const handleChange = e => {
        // console.log(e.target.value,e.target.name);
        if(e.target.name === 'username'){
            const newAdminInfo = {...adminInfo};
            newAdminInfo.name = e.target.value;
            setAdminInfo(newAdminInfo);
        }
        if(e.target.name === 'email'){
            const newAdminInfo = {...adminInfo};
            newAdminInfo.email = e.target.value;
            setAdminInfo(newAdminInfo);
        }
        if(e.target.name === 'password'){
            const newAdminInfo = {...adminInfo};
            newAdminInfo.password = e.target.value;
            setAdminInfo(newAdminInfo);
        }
    }

    const setAdminRole = (adminData) => Meteor.call('admin.role', adminData);

    const submit = e => {
        e.preventDefault();
        const adminData = {
            email:adminInfo.email,
            password:adminInfo.password,
            name:adminInfo.name
        }
        // console.log(email, userRole);
        setAdminRole(adminData );

    };

    const handleDelete = (id) => {
        Meteor.call('delete.user', id);
    }
    

    return (
        <div>
            <h3>This is ADMIN</h3>
            {
                console.log(user)
            }
            <h3>Add ADMIN</h3>
            <form onSubmit={submit} className="login-form">

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

                <div>

                    <button type="submit">Submit</button>

                </div>

            </form>

            <h3>Delete User</h3>
            {
                console.log(allUserData)
            }
            { 
                allUserData && allUserData.map(singleUser => <Users handleDelete={handleDelete} key={singleUser._id} singleUser={singleUser}></Users>)
                
            }

        </div>
    );
};

export default Admin;


//meteor deploy lend-and-borrow.meteorapp.com --free --mongo
//npx browserslist@latest --update-db