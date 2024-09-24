import { mySchema } from './schema';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Database } from '@nozbe/watermelondb';
import Chat from './Models/Chats';
import Message from './Models/Message'
import Users from './Models/Users'
import Notification from './Models/Notifications'
import { migrations } from './migrations';

const adapter = new SQLiteAdapter({
    schema: mySchema,
    migrations,  // Add migrations here
  });
  const database = new Database({
    adapter,
    modelClasses: [Users, Chat, Message, Notification],
    actionsEnabled: true,
  });

export default database