/* eslint-disable no-restricted-syntax */
import database from './database';
import { Q } from '@nozbe/watermelondb';

export async function createNewChat(username, chatId) {
  try {
    await database.write(async () => {
      const newChat = await database.collections.get('chats').create(chat => {
        chat.username = username;
        chat.chatId = chatId;
      });
      console.log('New chat created:', newChat);
      return newChat;
    });
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
}

export async function getAllMessagesForChat(chatId) {
  try {
    const chat = await database.get('chats').query(Q.where('chat_id', chatId)).fetch();
    const messages = await database.collections
      .get('messages')
      .query(Q.where('chat_id', chat[0].id))
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

  export async function addMessageToChat(chatId, text, isReceived) {
    console.log('text is :', text)
    console.log('isReceived is :', isReceived)
    try {
      await database.write(async () => {
        const chat = await database.get('chats').query(Q.where('chat_id', chatId)).fetch();
        console.log('chat is :', chat)
        if (chat.length > 0) { // Check if chat exists
          const newMessage = await database.get('messages').create(record => {
            record.chat.set(chat[0]);
            record.text = text;
            record.received = isReceived;
          });
          console.log('Message added to chat:', chatId);
          console.log('New message:', newMessage);
     
        }else{
          console.error('Chat not found:', chatId);
        }
 
          
          
        
      });
    } catch (error) {
      console.error('Error adding message to chat:', error);
      throw error;
    }
  }