import {Model} from '@nozbe/watermelondb';
import {markMsgRead} from '../DB/DBFunctions';
import {Socket} from 'socket.io-client';

export const sendReadReceipt = async (
  ReadMsgObj: Model[],
  socket: Socket | null,
  sender: string,
  receiver?: string,
) => {
  const unreadMessages: {msg: string; msgId: string}[] = [];

  for (let i = 0; i < ReadMsgObj.length; i++) {
    const message = ReadMsgObj[i]._raw;

    const msg = message['text'];
    const msgId = message['msg_id'];
    const read = message['read'];
    const isReceived = message['is_received'];

    if (!msg || !msgId || !isReceived) continue;

    if (!read) {
      // Mark the message as read
      await markMsgRead(ReadMsgObj[i].id);

      // Collect unread messages in an array
      unreadMessages.push({msg, msgId});
    }
  }

  // Send all unread messages in one socket event if any unread messages exist
  if (unreadMessages.length > 0) {
    socket?.emit('read receipt', {
      messages: unreadMessages,
      senderId: sender,
      receiverId: receiver,
    });
  }
};
