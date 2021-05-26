import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { loanCollection } from '../db/LoanCollection';

const SEED_EMAIL = 'admin@admin.com';
const SEED_PASSWORD = 'admin';

Meteor.methods({

  // 'set.default'(){
  //   if (!Accounts.findUserByEmail(SEED_EMAIL)) {
  //     const user = Accounts.createUser({
  //       email:SEED_EMAIL,
  //       password:SEED_PASSWORD, 
  //       profile:{
  //         name:'Default Admin'
  //       }
  //     });
  //     console.log(user);
  //     if(user){
  //       Roles.addUsersToRoles(user, [`admin`], SEED_EMAIL);
  //     }
  //   }
  // },
  

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