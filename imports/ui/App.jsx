import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import LoginForm from './Components/Login/LoginForm';
import Dashboard from './Components/Dashboard/Dashboard';

export const App = () => {

  const [userRole, setUserRole] = useState('');

  const {user, matchedUser} = useTracker(() => {
    Meteor.subscribe("roles");
    const user = Meteor.user();
    const matchedUser = Meteor.roleAssignment.find({ scope: user && user?.emails[0]?.address }).fetch()

    return{user, matchedUser}
  })

  useEffect(() => {
    setUserRole(matchedUser[0]?.role._id);
  }, [matchedUser])

  console.log(userRole ? userRole : '');

  return (
    <div>
      <h1>Lend And Borrow</h1>

      { user ? (
        <Dashboard user={user && user} userRole={userRole && userRole} />
        
      ) : <LoginForm />
      }
    </div>
  );

};
