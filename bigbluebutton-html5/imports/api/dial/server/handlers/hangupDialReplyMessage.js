import { check } from 'meteor/check';
import userHangUpReplyMessenger from '../modifiers/userHangUpReplyMessenger';

export default function hangupDialReplyMessage({ header, body }, meetingId, callId) {
  const { userId, destination, voiceBridge } = body;

  check(header, Object);
  check(meetingId, String);
  check(callId, String);
  check(userId, String);
  check(destination, String);
  check(voiceBridge, String);


  return userHangUpReplyMessenger(meetingId, userId, callId);
}
