import Logger from '/imports/startup/server/logger';
import Users from '/imports/api/users';
import { check } from 'meteor/check';

export default function userHangUpReplyMessenger(meetingId, userId, callId) {
  check(meetingId, String);
  check(userId, String);
  const selector = {
    meetingId,
    userId,
    callId,
  };

  const modifier = {
    $set: {
      meetingId,
      userId,
      callId,
      has_stream: true,
    },
  };

  const cb = (err, numChanged) => {
    if (err) {
      return Logger.error(`Adding user to collection: ${err}`);
    }

    if (numChanged) {
      return Logger.info(`Upserted user id=${userId} meeting=${meetingId}`);
    }
  };

  return Users.upsert(selector, modifier, cb);
}
