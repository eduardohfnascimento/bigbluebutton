import { check } from 'meteor/check';
import userOutboundDialReplyMessenger from '../modifiers/userOutboundDialReplyMessenger';

export default function outboundDialReplyMessage({ header, body }, meetingId, callId) {
  const { userId, destination, voiceBridge } = body;

  check(header, Object);
  check(meetingId, String);
  check(callId, String);
  check(userId, String);
  check(destination, String);
  check(voiceBridge, String);


  return userOutboundDialReplyMessenger(meetingId, callId, userId);
}
