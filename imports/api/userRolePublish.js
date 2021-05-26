import { Meteor } from 'meteor/meteor';

Meteor.publish('roles', function () {
    if (this.userId) {
      return Meteor.roleAssignment.find({ 'user._id': this.userId });
    } else {
      this.ready()
    }
})

Meteor.publish('userList', function (){ 
  return Meteor.users.find({});
});