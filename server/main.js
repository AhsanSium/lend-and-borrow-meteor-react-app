import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import '../imports/api/methods';
import '../imports/api/userRolePublish';
import '../imports/api/loanPublish';




Meteor.startup(() => {
  
  // This Method Not Working........
  // if (!Accounts.findUserByEmail(SEED_EMAIL)) {
  //   const user = Accounts.createUser({
  //     email:SEED_EMAIL,
  //     password:SEED_PASSWORD, 
  //     profile:{
  //       name:'Default Admin'
  //     }
  //   });
  //   console.log(user);
  //   if(user){
  //     Roles.addUsersToRoles(user, [`admin`], SEED_EMAIL);
  //   }
  // }



  if(Meteor.roles.find().count() === 0){
    Roles.createRole('user-lend');
    Roles.createRole('user-borrow');
    Roles.createRole('admin');
  }

});
