import { check } from 'meteor/check';
import userOutboundDialStateChangedMessenger from '../modifiers/userOutboundDialStateChangedMessenger';

export default function outboundDialStateChangedMessage({ header, body }, meetingId, callId) {
  const { userId, destination, voiceBridge } = body;

  check(header, Object);
  check(meetingId, String);
  check(callId, String);
  check(userId, String);
  check(destination, String);
  check(voiceBridge, String);

  return userOutboundDialStateChangedMessenger(meetingId, callId, userId);
}
