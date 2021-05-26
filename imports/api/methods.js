import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { loanCollection } from '../db/LoanCollection';


Meteor.methods({
  'users.role'({ email, role }) {

    console.log({ email, role });
    console.log(role);
    const user = Accounts.findUserByEmail(email)
    const id = user._id;
    console.log(user._id);
    if (Meteor.roleAssignment.find({ 'user._id': id }).count() === 0) {
      Roles.createRole(role, { unlessExists: true });
      Roles.addUsersToRoles(user, [`${role}`], email);
    }
  },

  'admin.role'(adminData){
    console.log(adminData.email);
    const email = adminData.email;
    const password = adminData.password;
    const name = adminData.name;

    try{
      const user = Accounts.createUser({
        email:email,
        password:password, 
        profile:{
          name:name
        }
      });
      console.log(user);
      if(user){
        Roles.addUsersToRoles(user, [`admin`], email);
      }
      
    }
    catch(err){
      console.log('Something Went Wrong');
      return err;
    }
  },

  'loans.insert'( userInfo, status, borrowInfo ) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    loanCollection.insert({
      userInfo:userInfo,
      createdAt: new Date,
      status:status,
      borrowInfo:borrowInfo,
      lenderInfo:''
    })
  },

  'delete.user'(id){
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    Meteor.users.remove(id);
  },

  'loans.update'( id, status, lenderInfo ) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    loanCollection.update( id, {
    $set: {
      'status':status,
      'lenderInfo':lenderInfo
    }
    });
  },


});