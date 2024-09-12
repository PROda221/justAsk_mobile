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
  data.map(async chat => {
    let downloadedPic;
    let chatExists: boolean | _RawRecord = await checkChatExists(
      chat.username,
      accountUsername,
    );
    if (!chatExists) {
      console.log('syncing new chats.....');
      downloadedPic = await downloadImg(chat.profilePic);
      // add download logic from here
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
      )
    }
  });
};
