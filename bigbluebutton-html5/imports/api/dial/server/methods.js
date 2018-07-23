import { Meteor } from 'meteor/meteor';
import outboundDialRequestMessage from './methods/outboundDialRequestMessage';
import hangupDialRequestMessage from './methods/hangupDialRequestMessage';

console.log('TEST', outboundDialRequestMessage);
Meteor.methods({
  hangupDialRequestMessage, outboundDialRequestMessage,
});
