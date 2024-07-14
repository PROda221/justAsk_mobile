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

  // const appState = useRef(AppState.currentState);

  const getMessages = async (
    msg: string,
    isReceived: boolean,
    type: string = 'message',
    senderId: string,
    yourId: string,
  ) => {
    try {
      const chatExists = await checkChatExists(senderId);
      if (!chatExists) {
        console.log('a');
        await createNewChat(senderId, `${senderId}-.png`, '', '', yourId);
      }
      let newMessage;
      console.log('b');
      newMessage = await addMessageToChat(
        senderId,
        msg,
        isReceived,
        type,
        localReducer.inChatScreen,
      );

      //set message

      setNewMessage(newMessage);
    } catch (err) {
      console.log('err on getMessage :', err);
    }
  };

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('forground');
  //     //   fetchMessages();
  //     } else {
  //       console.log('background');
  //       appState.current = nextAppState;
  //       // socket?.emit('statusUpdate', profileSuccess?.username, 'offline');
  //     }
  //   });
  //   return () => {
  //     subscription.remove();
  //     socket?.off('chat message');
  //   };
  // }, []);

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
