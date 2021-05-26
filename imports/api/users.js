import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// Meteor.publish(null, function () {
//     if (this.userId) {
//       return Meteor.roleAssignment.find({ 'user._id': this.userId });
//     } else {
//       this.ready()
//     }
// })

// Meteor.methods({
//   'create.users'(email, password) {
//     check(email, String);
 
//     if (!this.userId) {
//       throw new Meteor.Error('Not authorized.');
//     }
 
//     TasksCollection.insert({
//       text,
//       createdAt: new Date,
//       userId: this.userId,
//     })
//   },
// });