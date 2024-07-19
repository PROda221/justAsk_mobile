import {useEffect, useState} from 'react';
import {
  addMessageToChat,
  checkChatExists,
  createNewChat,
} from '../../DB/DBFunctions';
import {Socket} from 'socket.io-client';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {saveURLImage} from '../../Functions/SaveBase64Image';

export const useGetMessage = (socket: Socket | null) => {
  const [newMessage, setNewMessage] = useState();
  const localReducer = useSelector((state: RootState) => state.localReducer);

  const getMessages = async (
    msg: string,
    isReceived: boolean,
    type: string = 'message',
    senderId: string,
    yourId: string,
  ) => {
    try {
      const chatExists = await checkChatExists(senderId, yourId);
      if (!chatExists) {
        console.log('a');
        await createNewChat(senderId, `${senderId}-.png`, '', '', yourId);
      }
      let newMessage;
      console.log('b');
      newMessage = await addMessageToChat(
        senderId,
        yourId,
        msg,
        isReceived,
        type,
        localReducer.inChatScreen,
      );

      setNewMessage(newMessage);
    } catch (err) {
      console.log('err on getMessage :', err);
    }
  };

  useEffect(() => {
    const receiveMessage = async () => {
      // Receive message
      socket?.on('chat message', async (msg, type, senderId, yourId) => {
        if (type === 'image') {
          let imageUri = await saveURLImage(msg);
          let computedImg = {uri: `file://${imageUri}`};
          getMessages(computedImg.uri, true, type, senderId, yourId);
        } else {
          getMessages(msg, true, type, senderId, yourId);
        }
      });
    };

    receiveMessage();

    return () => {
      socket?.off('chat message');
    };
  }, [socket, localReducer]);

  return {newMessage};
};
