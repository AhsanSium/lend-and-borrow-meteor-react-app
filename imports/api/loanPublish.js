import { Meteor } from 'meteor/meteor';
import { loanCollection } from '../db/LoanCollection';

Meteor.publish('loans', function publishTasks() {
  return loanCollection.find({});
});