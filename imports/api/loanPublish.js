import { Meteor } from 'meteor/meteor';
import { LoanCollection } from '../db/LoanCollection';

Meteor.publish('loans', function publishTasks() {
  return LoanCollection.find({ userId: this.userId });
});