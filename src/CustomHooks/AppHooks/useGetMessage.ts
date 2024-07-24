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
import {downloadImage} from '../../Functions/DownloadLocalPic';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';

export const useGetMessage = (socket: Socket | null) => {
  const [newMessage, setNewMessage] = useState();
  const localReducer = useSelector((state: RootState) => state.localReducer);

  const downloadImg = async (imgUrl: string, prevImg?: string) => {
    try {
      let downloadedPic: string | null;
      downloadedPic = await downloadImage(imgUrl ?? '', prevImg);

      let computedImg = {uri: `file://${downloadedPic}`};
      return computedImg.uri;
    } catch (err) {
      console.log('err in fetchProfilePic :', err);
    }
  };

  const getMessages = async (
    msg: string,
    isReceived: boolean,
    type: string = 'message',
    senderId: string,
    yourId: string,
    profilePic: string,
  ) => {
    try {
      let downloadedPic;
      let chatExists: boolean | _RawRecord = await checkChatExists(
        senderId,
        yourId,
      );
      if (!chatExists) {
        console.log('a');
        downloadedPic = await downloadImg(profilePic);
        // add download logic from here
        await createNewChat(senderId, downloadedPic, '', '', yourId);
      } else {
        downloadedPic = await downloadImg(
          profilePic,
          chatExists?.['profile_pic'],
        );
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
        downloadedPic,
      );

      setNewMessage(newMessage);
    } catch (err) {
      console.log('err on getMessage :', err);
    }
  };

  useEffect(() => {
    const receiveMessage = async () => {
      // Receive message
      socket?.on(
        'chat message',
        async (msg, type, senderId, yourId, profilePic) => {
          if (type === 'image') {
            let imageUri = await saveURLImage(msg);
            let computedImg = {uri: `file://${imageUri}`};
            getMessages(
              computedImg.uri,
              true,
              type,
              senderId,
              yourId,
              profilePic,
            );
          } else {
            getMessages(msg, true, type, senderId, yourId, profilePic);
          }
        },
      );
    };

    receiveMessage();

    return () => {
      socket?.off('chat message');
    };
  }, [socket, localReducer]);

  return {newMessage};
};
