 
import database from './database';
import { Q } from '@nozbe/watermelondb';

export async function createNewChat(username, chatId, profilePic) {
  try {
    await database.write(async () => {
      const newChat = await database.collections.get('chats').create(chat => {
        chat.username = username;
        chat.chatId = chatId;
        chat.profilePic=profilePic
      });
      console.log('New chat created:', newChat);
      return newChat;
    });
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
}

export async function getAllChats() {
  try{
    const chats = await database.collections.get('chats').query().fetch();
    const allChats = chats.map((value) => value._raw)
    return allChats
  } catch(error){
    console.error('Error fetching all chat:', error);
    throw error;
  }
}

export async function getAllMessagesForChat(chatId) {
  try {
    const chat = await database.get('chats').query(Q.where('chat_id', chatId)).fetch();
    const messages = await database.collections
      .get('messages')
      .query(Q.where('chat_id', chat[0].id), Q.sortBy('created_at', Q.desc))
      .fetch();
    return messages;
  } catch (error) {
    console.error('Error fetching messages for chat:', error);
    throw error;
  }
}

export async function checkChatExists(chatId) {
  try {
    const chat = await database.collections.get('chats').query(Q.where('chat_id', chatId)).fetch()
    return chat[0]?._raw; // Returns true if chat exists, false otherwise
  } catch (error) {
    console.error('Error checking if chat exists:', error);
    return false;
  }
}

  export async function addMessageToChat(chatId, text, isReceived, type) {
    try {
      let newMessage
      await database.write(async () => {
        const chat = await database.get('chats').query(Q.where('chat_id', chatId)).fetch();
        if (chat.length > 0) { // Check if chat exists
           newMessage = await database.get('messages').create(record => {
            record.chat.set(chat[0]);
            record.text = text;
            record.type = type;
            record.received = isReceived;
          });
        }else{
          console.error('Chat not found:', chatId);
        }
          
      });
      return newMessage;
    } catch (error) {
      console.error('Error adding message to chat:', error);
      throw error;
    }
  }