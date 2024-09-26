import {Model} from '@nozbe/watermelondb';
import {markMsgRead} from '../DB/DBFunctions';
import {Socket} from 'socket.io-client';

export const sendReadReceipt = async (
  ReadMsgObj: Model[],
  socket: Socket | null,
  sender: string,
  receiver?: string,
) => {
  let firstReceivedMessage: Model = {} as Model;
  for (let i = 0; i < ReadMsgObj.length; i++) {
    if (ReadMsgObj[i]._raw['is_received'] === true) {
      firstReceivedMessage = ReadMsgObj[i];
      break; // Exit the loop as soon as we find the first match
    }
  }

  const msg = firstReceivedMessage._raw?.['text'];
  const msgId = firstReceivedMessage._raw?.['msg_id'];
  const read = firstReceivedMessage._raw?.['read'];

  if (!msg || !msgId) return;

  if (!read) {
    await markMsgRead(firstReceivedMessage.id);
    socket?.emit('read receipt', {
      msg,
      msgId,
      senderId: sender,
      receiverId: receiver,
    });
  }
};
