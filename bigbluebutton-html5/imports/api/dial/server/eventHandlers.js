import RedisPubSub from '/imports/startup/server/redis';
import outboundDialReplyMessage from './handlers/outboundDialReplyMessage';
import hangupDialReplyMessage from './handlers/hangupDialReplyMessage';
import outboundDialStateChangedMessage from './handlers/outboundDialStateChangedMessage';

RedisPubSub.on('UserDialReplyEvtMsg', outboundDialReplyMessage);
RedisPubSub.on('UserHangoutDialEvtMsg', hangupDialReplyMessage);
RedisPubSub.on('UserDialStateEvtMsg', outboundDialStateChangedMessage);

