import {from, of} from 'rxjs';
import {switchMap, catchError} from 'rxjs/operators';
import database from './database';
import {Q} from '@nozbe/watermelondb';

export async function createNewUser(username, profilePic, status, skills) {
  try {
    const newUser = await database.collections.get('users').create(user => {
      user.username = username;
      user.userId = username;
      user.profilePic = profilePic;
      user.status = status;
      user.skills = JSON.stringify(skills);
    });
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export const getUser = async username => {
  try {
    const user = await database
      .get('users')
      .query(Q.where('username', username))
      .fetch();
    return user;
  } catch (err) {
    console.log('error getting user:', err);
  }
};

export const updateOrCreateUser = async (userData, profilePic) => {
  try {
    await database.write(async () => {
      let user = await database.collections
        .get('users')
        .query(Q.where('username', userData.username))
        .fetch();

      if (user.length > 0) {
        // User exists, update the user
        user = user[0];
        await user.update(u => {
          u.username = userData.username;
          u.profilePic = profilePic;
          u.status = userData.status;
          u.skills = JSON.stringify(userData.skills);
          u.emailId = userData.emailId;
          u.averageRating = userData.averageRating;
          u.deactivated = userData.deactivated;
        });
      } else {
        // User does not exist, create a new user
        createNewUser(
          userData.username,
          profilePic,
          userData.status,
          userData.skills,
        );
      }
    });
  } catch (err) {
    console.log('error updating user:', err);
  }
};

export async function createNewChat(
  username,
  profilePic,
  status,
  skills,
  account,
) {
  try {
    await database.write(async () => {
      const user = await database.collections
        .get('users')
        .query(Q.where('username', account))
        .fetch();
      if (user.length > 0) {
        const newChat = await database.collections
          .get('chats')
          .create(record => {
            record.user.set(user[0]);
            record.username = username;
            record.chatId = username;
            record.profilePic = profilePic;
            record.status = status;
            record.skills = JSON.stringify(skills);
          });
        console.log('New chat created:', newChat);
        return newChat?.[0]?._raw;
      } else {
        console.error('User not found:', account);
      }
    });
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
}

export async function syncChatToLocal(
  username,
  profilePic,
  status,
  skills,
  account,
  unreadCount,
  latestMsg,
) {
  try {
    await database.write(async () => {
      const user = await database.collections
        .get('users')
        .query(Q.where('username', account))
        .fetch();
      if (user.length > 0) {
        const newChat = await database.collections
          .get('chats')
          .create(record => {
            record.user.set(user[0]);
            record.username = username;
            record.chatId = username;
            record.profilePic = profilePic;
            record.status = status;
            record.skills = JSON.stringify(skills);
            record.lastMessage =
              latestMsg.type === 'image' ? 'Image' : latestMsg.message;
            record.messageTime = new Date();
            record.unreadCount = unreadCount;
            record.msgId = latestMsg._id;
            record.msgCreatedAt = latestMsg.createdAt;
          });
        return newChat?.[0]?._raw;
      } else {
        console.error('User not found:', account);
      }
    });
  } catch (error) {
    console.error('Error syncing old chats:', error);
    throw error;
  }
}

export async function updateSynchedChatToLocal(
  username,
  profilePic,
  status,
  skills,
  account,
  unreadCount,
  latestMsg,
) {
  try {
    await database.write(async () => {
      const user = await database.collections
        .get('users')
        .query(Q.where('username', account))
        .fetch();
      if (user.length > 0) {
        const chat = await database
          .get('chats')
          .query(Q.where('user_id', user[0].id), Q.where('chat_id', username))
          .fetch();
        if (chat.length > 0) {
          await chat[0].update(record => {
            record.user.set(user[0]);
            record.username = username;
            record.chatId = username;
            record.profilePic = profilePic;
            record.status = status;
            record.skills = JSON.stringify(skills);
            record.lastMessage =
              latestMsg.type === 'image' ? 'Image' : latestMsg.message;
            record.messageTime = new Date();
            record.unreadCount = unreadCount;
            record.msgId = latestMsg._id;
            record.msgCreatedAt = latestMsg.createdAt;
          });
        }
      } else {
        console.error('User not found:', account);
      }
    });
  } catch (error) {
    console.error('Error updating while syncing old chats:', error);
    throw error;
  }
}

export function getUserChats(account) {
  return from(
    database.collections
      .get('users')
      .query(Q.where('username', account))
      .observeWithColumns(['username']),
  ).pipe(
    switchMap(users => {
      if (users?.length > 0) {
        return database.collections
          .get('chats')
          .query(
            Q.where('user_id', users[0].id),
            Q.sortBy('unread_count', Q.desc), // First priority: sort by unread count in descending order
            Q.sortBy('msg_created_at', Q.desc), // Second priority: sort by message creation time in descending order
          )
          .observeWithColumns([
            'last_message',
            'message_time',
            'profile_pic',
            'status',
            'unread_count',
          ]);
      } else {
        return of([]); // Return an empty observable array if no user is found
      }
    }),
    catchError(() => of([])), // Handle any errors
  );
}

export async function getAllChats(account) {
  try {
    const user = await database.collections
      .get('users')
      .query(Q.where('username', account))
      .fetch();

    const chats = await database.collections
      .get('chats')
      .query(Q.where('user_id', user[0].id))
      .fetch();
    const allChats = chats.map(value => value._raw);
    return allChats;
  } catch (error) {
    console.error('Error fetching all chat:', error);
    throw error;
  }
}

export async function getLatestMessageForChat(chatId, account) {
  try {
    const user = await database.collections
      .get('users')
      .query(Q.where('username', account))
      .fetch();

    const chat = await database
      .get('chats')
      .query(Q.where('user_id', user[0].id), Q.where('chat_id', chatId))
      .fetch();

    const latestMessage = await database.collections
      .get('messages')
      .query(
        Q.where('chat_id', chat[0].id),
        Q.where('msg_id', Q.notEq('')),
        Q.sortBy('msg_created_at', Q.desc),
        Q.take(1), // Fetch only the latest message
      )
      .fetch();

    return latestMessage[0];
  } catch (error) {
    console.error('Error fetching latest message for chat:', error);
    throw error;
  }
}

export async function getAllMessagesForChat(chatId, account) {
  try {
    const user = await database.collections
      .get('users')
      .query(Q.where('username', account))
      .fetch();

    const chat = await database
      .get('chats')
      .query(Q.where('user_id', user[0].id), Q.where('chat_id', chatId))
      .fetch();
    const messages = await database.collections
      .get('messages')
      .query(Q.where('chat_id', chat[0].id), Q.sortBy('msg_created_at', Q.desc))
      .fetch();
    return {allLocalStoredMsgs: messages, chatId: chat[0].id};
  } catch (error) {
    console.error('Error fetching messages for chat:', error);
    throw error;
  }
}

export async function checkChatExists(chatUsername, account) {
  try {
    const user = await database.collections
      .get('users')
      .query(Q.where('username', account))
      .fetch();

    const chat = await database.collections
      .get('chats')
      .query(Q.where('user_id', user[0].id), Q.where('username', chatUsername))
      .fetch();
    return chat[0]?._raw; // Returns true if chat exists, false otherwise
  } catch (error) {
    console.error('Error checking if chat exists:', error);
    return false;
  }
}

export async function updateChatMsg(
  chat,
  lastMessage,
  readMessage,
  profilePic,
  msgId,
  msgCreatedAt,
) {
  try {
    await chat[0].update(chat => {
      chat.lastMessage = lastMessage;
      chat.messageTime = new Date();
      chat.unreadCount = readMessage ? 0 : chat.unreadCount + 1;
      chat.msgId = msgId;
      chat.msgCreatedAt = msgCreatedAt
        ? new Date(msgCreatedAt).toISOString()
        : new Date().toISOString;
      if (profilePic) {
        chat.profilePic = profilePic;
      }
    });
  } catch (error) {
    console.error('Error updating chat message:', error);
  }
}

export async function markAllRead(chatId, account) {
  try {
    await database.write(async () => {
      const user = await database.collections
        .get('users')
        .query(Q.where('username', account))
        .fetch();

      const chat = await database
        .get('chats')
        .query(Q.where('user_id', user[0].id), Q.where('chat_id', chatId))
        .fetch();
      if (chat.length) {
        await chat[0].update(chat => {
          chat.unreadCount = 0;
        });
      } else {
        console.log('chat dosent exist');
      }
    });
  } catch (err) {
    console.log('chat mark all read error', err);
  }
}

export async function updateChatData(chatData, account, profilePic) {
  try {
    await database.write(async () => {
      const user = await database.collections
        .get('users')
        .query(Q.where('username', account))
        .fetch();

      const chat = await database.collections
        .get('chats')
        .query(
          Q.where('user_id', user[0].id),
          Q.where('chat_id', chatData.username),
        )
        .fetch();

      if (chat.length) {
        await chat[0].update(chat => {
          chat.username = chatData.username;
          chat.profilePic = profilePic;
          chat.status = chatData.status;
          chat.skills = JSON.stringify(chatData.adviceGenre);
          chat.gotBlockedStatus = chatData.gotBlockedStatus;
          chat.youBlockedStatus = chatData.youBlockedStatus;
          chat.deactivated = chatData.deactivated;
        });
      } else {
        console.log('chat dosent exist');
      }
    });
  } catch (err) {
    console.log('chat update data error', err);
  }
}

export async function addMessageToChat(
  chatId,
  account,
  text,
  isReceived,
  type,
  onChatScreen = false,
  profilePic = '',
  id = null,
  createdAt = null,
) {
  try {
    let newMessage;
    let lastMessage = type === 'image' ? 'Image' : text;
    await database.write(async () => {
      // Fetch user
      const user = await database.collections
        .get('users')
        .query(Q.where('username', account))
        .fetch();

      if (user.length === 0) {
        return;
      }

      // Fetch chat for the user
      const chat = await database
        .get('chats')
        .query(Q.where('user_id', user[0].id), Q.where('chat_id', chatId))
        .fetch();

      if (chat.length === 0) {
        return;
      }

      // Update chat with last message details
      await updateChatMsg(
        chat,
        lastMessage,
        onChatScreen,
        profilePic,
        id,
        createdAt,
      );

      // Create new message
      newMessage = await database.get('messages').create(record => {
        record.chat.set(chat[0]);
        record.text = type === 'image' && !isReceived ? text.url : text;
        record.type = type;
        record.received = isReceived;
        record.uploadingImage = type === 'image' ? text.uploading : false;
        record.msgId = id;
        record.msgCreatedAt = createdAt
          ? new Date(createdAt).toISOString()
          : new Date().toISOString();
        record.status = isReceived ? 'success' : 'pending';
      });
    });

    return newMessage;
  } catch (error) {
    console.error('Error adding message to chat:', error);
    throw error;
  }
}

export async function updateImageUploadStatus(
  chatId,
  account,
  messageId,
  uploading,
) {
  try {
    await database.write(async () => {
      const user = await database.collections
        .get('users')
        .query(Q.where('username', account))
        .fetch();

      const chat = await database
        .get('chats')
        .query(Q.where('user_id', user[0].id), Q.where('chat_id', chatId))
        .fetch();
      if (chat.length > 0) {
        // Check if chat exists
        const message = await database
          .get('messages')
          .query(Q.where('id', messageId))
          .fetch();
        if (message.length > 0) {
          // Check if message exists
          await message[0].update(message => {
            message.uploadingImage = uploading;
          });
        } else {
          console.error('Message not found:', messageId);
        }
      } else {
        console.error('Chat not found:', chatId);
      }
    });
  } catch (error) {
    console.error('Error updating image upload status:', error);
    throw error;
  }
}

export function getCurrentChatObservable(account, username) {
  return database.collections
    .get('users')
    .query(Q.where('username', account))
    .observe()
    .pipe(
      switchMap(users => {
        try {
          if (users.length === 0) {
            // Return an empty observable or handle user not found
            return of([]); // Use `of` from `rxjs` to emit an empty array
          }

          const userId = users[0].id;
          return database.collections
            .get('chats')
            .query(Q.where('user_id', userId), Q.where('chat_id', username))
            .observeWithColumns([
              'you_blocked_status',
              'got_blocked_status',
              'profile_pic',
              'status',
              'advice_genre',
              'username',
              'deactivated',
            ]);
        } catch (error) {
          console.error('Error while querying chats:', error);
          // Return an empty observable or handle the error
          return of([]); // Emit an empty array in case of error
        }
      }),
    );
}

export function getCurrentMsgObservable(id) {
  try {
    return database.collections
      .get('messages')
      .query(Q.where('id', id))
      .observeWithColumns(['msg_id', 'status', 'uploading_image']);
  } catch (err) {
    console.log('err in observing msgId :', err);
  }
}

export async function unblockChats(chatIds, account) {
  try {
    await database.write(async () => {
      const user = await database.collections
        .get('users')
        .query(Q.where('username', account))
        .fetch();

      const userId = user[0].id;

      // Query for all chats that match the userId and any of the chatIds
      const chats = await database
        .get('chats')
        .query(Q.where('user_id', userId), Q.where('chat_id', Q.oneOf(chatIds)))
        .fetch();

      // Update each chat's youBlockedStatus to false
      for (const chat of chats) {
        await chat.update(chat => {
          chat.youBlockedStatus = false;
        });
      }

      if (chats.length === 0) {
        console.log('No chats found for the provided chat IDs.');
      }
    });
  } catch (err) {
    console.log('Error unblocking chats:', err);
  }
}

export async function markMsgRead(msgLocalId) {
  try {
    await database.write(async () => {
      try {
        const message = await database
          .get('messages')
          .query(Q.where('id', msgLocalId))
          .fetch();
        if (message.length > 0) {
          // Check if message exists
          await message[0].update(message => {
            message.read = true;
          });
        } else {
          console.error('Message not found:', messageId);
        }
      } catch (error) {
        console.log('error updating read status :', error);
      }
    });
  } catch (err) {
    console.log('error updating read status :', err);
  }
}

export async function storeSyncedMessages(account, chatId, messages) {
  try {
    let newMessagesArray = [];
    const newMessages = await database.write(async () => {
      const user = await database.collections
        .get('users')
        .query(Q.where('username', account))
        .fetch();

      const chat = await database
        .get('chats')
        .query(Q.where('user_id', user[0].id), Q.where('chat_id', chatId))
        .fetch();

      if (chat.length > 0) {
        // Check if chat exists
        for (const message of messages) {
          let msgExists = await database
            .get('messages')
            .query(Q.where('id', message.localMsgId ?? ''))
            .fetch();
          if (!msgExists.length) {
            const newMessage = await database.get('messages').create(record => {
              record.chat.set(chat[0]);
              record.text = message.message;
              record.type = message.type;
              record.received = message.senderId !== account;
              record.read = false;
              record.uploadingImage = false;
              record.msgId = message._id;
              record.msgCreatedAt = message.createdAt;
              record.status = 'success';
            });
            newMessagesArray.push(newMessage);
          }
        }
        return newMessagesArray; // Return from inside database.write
      } else {
        console.error('Chat not found:', chatId);
        return newMessagesArray; // Return null if chat not found
      }
    });

    return newMessages; // Return the array of newly added messages outside the write block
  } catch (error) {
    console.error('Error storing synced messages:', error);
    throw error;
  }
}

export async function updateLocalMessageId(
  account,
  chatId,
  id,
  tempMsgId,
  createdAt,
) {
  try {
    await database.write(async () => {
      const user = await database.collections
        .get('users')
        .query(Q.where('username', account))
        .fetch();
      if (user.length > 0) {
        const chat = await database
          .get('chats')
          .query(Q.where('user_id', user[0].id), Q.where('chat_id', chatId))
          .fetch();
        if (chat.length > 0) {
          await chat[0].update(chat => {
            chat.msgId = id;
            chat.msgCreatedAt = createdAt;
          });
          const message = await database
            .get('messages')
            .query(Q.where('id', tempMsgId))
            .fetch();
          if (message.length > 0) {
            await message[0].update(message => {
              message.msgId = id;
              message.msgCreatedAt = createdAt;
              message.status = 'success';
            });
          }
          // Check if chat exists
        } else {
          console.error('message not found:', chatId);
        }
      }
    });
  } catch (error) {
    console.error('Error updating message:', error);
    throw error;
  }
}

export async function getAllPendingMsgs() {
  try {
    const messages = await database.collections
      .get('messages')
      .query(Q.where('status', 'pending'), Q.where('uploading_image', false))
      .fetch();
    return messages;
  } catch (error) {
    console.error('Error fetching pending messages:', error);
    throw error;
  }
}

export async function updateMsgStatus(id, status) {
  try {
    await database.write(async () => {
      const message = await database.collections
        .get('messages')
        .query(Q.where('id', id))
        .fetch();
      await message[0].update(message => {
        message.status = status;
        message.msgCreatedAt = new Date().toISOString();
      });
    });
  } catch (error) {
    console.error('Error fetching pending messages:', error);
    throw error;
  }
}

export async function getSenderNotifications(sender) {
  try {
    const notification = await database.collections
      .get('notifications')
      .query(Q.where('sender', sender))
      .fetch();
    return notification[0];
  } catch (error) {
    console.error('Error fetching sender notification exists:', error);
    throw error;
  }
}

export async function setSenderNotifications(sender) {
  try {
    let notification;
    await database.write(async () => {
      notification = await database.collections
        .get('notifications')
        .create(record => {
          record.sender = sender;
        });
      return notification;
    });
    return notification;
  } catch (error) {
    console.error('Error setting sender notification:', error);
    throw error;
  }
}

export async function clearSenderNotifications() {
  try {
    await database.write(async () => {
      const notifications = await database.collections
        .get('notifications')
        .query() // Fetch all notifications
        .fetch();
      const batchOperations = notifications.map(notification =>
        notification.prepareDestroyPermanently(),
      );

      // Perform the batch delete
      await database.batch(...batchOperations);
    });
  } catch (error) {
    console.error('Error deleting sender notifications:', error);
    throw error;
  }
}
