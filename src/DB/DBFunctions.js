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

export const updateOrCreateUser = async (
  username,
  profilePic,
  status,
  skills,
  emailId,
  averageRating,
) => {
  try {
    await database.write(async () => {
      let user = await database.collections
        .get('users')
        .query(Q.where('username', username))
        .fetch();

      if (user.length > 0) {
        // User exists, update the user
        user = user[0];
        await user.update(u => {
          u.username = username;
          u.profilePic = profilePic;
          u.skills = skills;
          u.status = JSON.stringify(skills);
          u.emailId = emailId;
          u.averageRating = averageRating;
        });
      } else {
        // User does not exist, create a new user
        createNewUser(username, profilePic, status, skills);
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
        return newChat;
      } else {
        console.error('User not found:', account);
      }
    });
  } catch (error) {
    console.error('Error creating chat:', error);
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
      if (users.length > 0) {
        return database.collections
          .get('chats')
          .query(Q.where('user_id', users[0].id), Q.sortBy('updated_at', Q.desc))
          .observeWithColumns([
            'last_message',
            'message_time',
            'profile_pic',
            'status',
            'read_count',
          ]);
      } else {
        return of(null); // Return an empty observable array if no user is found
      }
    }),
    catchError(() => of(null)), // Handle any errors
  );
}

export async function getAllChats() {
  try {
    const chats = await database.collections.get('chats').query().fetch();
    const allChats = chats.map(value => value._raw);
    return allChats;
  } catch (error) {
    console.error('Error fetching all chat:', error);
    throw error;
  }
}

export async function getAllMessagesForChat(chatId) {
  try {
    const chat = await database
      .get('chats')
      .query(Q.where('chat_id', chatId))
      .fetch();
    const messages = await database.collections
      .get('messages')
      .query(Q.where('chat_id', chat[0].id), Q.sortBy('created_at', Q.desc))
      .fetch();
    return {allStoredMsgs: messages, chatId: chat[0].id};
  } catch (error) {
    console.error('Error fetching messages for chat:', error);
    throw error;
  }
}

export async function checkChatExists(chatId) {
  try {
    const chat = await database.collections
      .get('chats')
      .query(Q.where('chat_id', chatId))
      .fetch();
    return chat[0]?._raw; // Returns true if chat exists, false otherwise
  } catch (error) {
    console.error('Error checking if chat exists:', error);
    return false;
  }
}

export async function updateChatMsg(chat, lastMessage, readMessage) {
  try {
    await chat[0].update(chat => {
      chat.lastMessage = lastMessage;
      chat.messageTime = new Date();
      chat.unreadCount = readMessage ? 0 : chat.unreadCount + 1;
    });
  } catch (error) {
    console.error('Error updating chat message:', error);
  }
}

export async function markAllRead(chatId) {
  try {
    await database.write(async () => {
      const chat = await database
        .get('chats')
        .query(Q.where('chat_id', chatId))
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

export async function updateChatData(chatData) {
  try {
    await database.write(async () => {
      const chat = await database.collections
        .get('chats')
        .query(Q.where('chat_id', chatData.username))
        .fetch();

      if (chat.length) {
        await chat[0].update(chat => {
          chat.username = chatData.username;
          chat.profilePic = chatData.profilePic;
          chat.status = chatData.status;
          chat.skills = JSON.stringify(chatData.adviceGenre);
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
  text,
  isReceived,
  type,
  onChatScreen = false,
) {
  try {
    let newMessage;
    let lastMessage = type === 'image' ? 'Image' : text;
    await database.write(async () => {
      const chat = await database
        .get('chats')
        .query(Q.where('chat_id', chatId))
        .fetch();
      if (chat.length > 0) {
        // Check if chat exists
        await updateChatMsg(chat, lastMessage, onChatScreen);
        newMessage = await database.get('messages').create(record => {
          record.chat.set(chat[0]);
          record.text = text;
          record.type = type;
          record.received = isReceived;
          record.read = onChatScreen;
        });
      } else {
        console.error('Chat not found:', chatId);
      }
    });
    return newMessage;
  } catch (error) {
    console.error('Error adding message to chat:', error);
    throw error;
  }
}
