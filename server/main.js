import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import '../imports/api/methods';
import '../imports/api/userRolePublish';
import '../imports/api/loanPublish';

const SEED_EMAIL = 'admin@admin.com';
const SEED_PASSWORD = 'admin';
const SEED_ROLE = 'admin';

// function insertLink({ title, url }) {
//   LinksCollection.insert({title, url, createdAt: new Date()});
// }

// console.log(Roles);


Meteor.startup(() => {
  if (!Accounts.findUserByEmail(SEED_EMAIL)) {
    Accounts.createUser({
      email: SEED_EMAIL,
      password: SEED_PASSWORD,
    });
    const user = Accounts.findUserByEmail(SEED_EMAIL);
    Roles.addUsersToRoles(user, ['admin'],SEED_EMAIL);
  }

  if(Meteor.roles.find().count() === 0){
    Roles.createRole('user-lend');
    Roles.createRole('user-borrow');
    Roles.createRole('admin');
  }
  

});
