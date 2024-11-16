import {useEffect, useState} from 'react';
import {
  addMessageToChat,
  checkChatExists,
  createNewChat,
  updateLocalMessageId,
} from '../../DB/DBFunctions';
import {Socket} from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/rootReducers';
import {saveURLImage} from '../../Functions/SaveBase64Image';
import {downloadImg} from '../../Functions/DownloadLocalPic';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {callGetUserProfile} from '../../Redux/Slices/UserProfileSlice';
import { forwardMsgType } from '../../Screens/AppScreens/ChatScreen/types';

const getImageUrl = async (msg: string) => {
  let imageUri = await saveURLImage(msg);
  let computedImg = {uri: `file://${imageUri}`};
  return computedImg.uri;
};

export const useGetMessage = (socket: Socket | null) => {
  const [newMessage, setNewMessage] = useState();
  const localReducer = useSelector((state: RootState) => state.localReducer);

  const dispatch = useDispatch();

  const getMessages = async (
    msg: string,
    isReceived: boolean,
    type: string = 'message',
    senderId: string,
    yourId: string,
    profilePic: string,
    source = 'user',
    id: string | null,
    createdAt: Date | null,
    tempMsgId: string | null,
    forwardMsg: forwardMsgType,
  ) => {
    try {
      if (source === 'server') {
        dispatch(callGetUserProfile({username: yourId}));
      } else if (tempMsgId) {
        await updateLocalMessageId(senderId, yourId, id, tempMsgId, createdAt);
      } else {
        let downloadedPic;
        let chatExists: boolean | _RawRecord = await checkChatExists(
          senderId,
          yourId,
        );
        if (!chatExists) {
          console.log('a');
          downloadedPic = await downloadImg(profilePic);
          await createNewChat(senderId, downloadedPic, '', '', yourId);
        } else {
          downloadedPic = await downloadImg(
            profilePic,
            chatExists?.['profile_pic'],
          );
        }
        let newMessage;
        console.log('b');

        newMessage = await addMessageToChat({
          chatId: senderId,
          account: yourId,
          text: msg,
          isReceived,
          type,
          onChatScreen: localReducer.inChatScreen,
          profilePic: downloadedPic,
          id,
          createdAt,
          forwardMsg,
        });

        setNewMessage(newMessage);
      }
    } catch (err) {
      console.log('err on getMessage in useGetmessages:', err);
    }
  };

  useEffect(() => {
    const receiveMessage = async () => {
      // Receive message
      socket?.on('chat message', async messageData => {
        const {
          msg,
          type,
          senderId,
          receiverId: yourId,
          profilePic,
          source,
          id = null,
          createdAt = null,
          tempMsgId = null,
          forwardMsg = {message: '', type: 'message', received: false, username: '', id: ''},
        } = messageData;
        getMessages(
          type === 'image' ? await getImageUrl(msg) : msg,
          true,
          type,
          senderId,
          yourId,
          profilePic,
          source,
          id,
          createdAt,
          tempMsgId,
          forwardMsg,
        );
      });
    };

    receiveMessage();

    return () => {
      socket?.off('chat message');
    };
  }, [socket, localReducer]);

  return {newMessage};
};
