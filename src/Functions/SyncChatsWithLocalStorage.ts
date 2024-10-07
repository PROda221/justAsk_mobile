import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {Chats} from '../Redux/Slices/SyncChatsSlice';
import {
  addMessageToChat,
  checkChatExists,
  createNewChat,
  syncChatToLocal,
  updateSynchedChatToLocal,
} from '../DB/DBFunctions';
import {downloadImg} from './DownloadLocalPic';

export const syncChatsToLocal = async (
  data: Chats[],
  accountUsername: string,
) => {
  // Use Promise.all to wait for all async tasks in map
  await Promise.all(
    data.map(async chat => {
      let downloadedPic;
      let chatExists = await checkChatExists(chat.username, accountUsername);

      if (!chatExists) {
        console.log('syncing new chats.....');
        downloadedPic = await downloadImg(chat.profilePic);
        await syncChatToLocal(
          chat.username,
          downloadedPic,
          chat.status,
          chat.adviveGenre,
          accountUsername,
          chat.unreadCount,
          chat.latestMessage
        );
      } else {
        downloadedPic = await downloadImg(
          chat.profilePic,
          chatExists?.['profile_pic'],
        );
        await updateSynchedChatToLocal(
          chat.username,
          downloadedPic,
          chat.status,
          chat.adviveGenre,
          accountUsername,
          chat.unreadCount,
          chat.latestMessage
        );
      }
    })
  );
};
