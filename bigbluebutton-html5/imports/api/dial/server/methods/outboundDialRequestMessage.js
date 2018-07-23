import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import RedisPubSub from '/imports/startup/server/redis';

export default function outboundDialRequestMessage(credentials, destination, voiceBridge) {
  const REDIS_CONFIG = Meteor.settings.private.redis;
  const CHANNEL = REDIS_CONFIG.channels.toSfuPhone;
  const EVENT_NAME = 'DialStartMsg';

  const { meetingId, requesterUserId, requesterToken } = credentials;

  check(meetingId, String);
  check(voiceBridge, String);
  check(requesterUserId, String);
  check(requesterToken, String);
  check(destination, String);


  // const actionName = 'joinVideo';
  /* TODO throw an error if user has no permission to share webcam
  if (!isAllowedTo(actionName, credentials)) {
    throw new Meteor.Error('not-allowed', `You are not allowed to share webcam`);
  } */


  const payload = {
    destination,
    voiceBridge,
  };

  return RedisPubSub.publishUserMessage(CHANNEL, EVENT_NAME, meetingId, requesterUserId, payload);
}
