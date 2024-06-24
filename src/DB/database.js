import { mySchema } from './schema';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Database } from '@nozbe/watermelondb';
import Chat from './Models/Chats';
import Message from './Models/Message'
import Users from './Models/Users'

const adapter = new SQLiteAdapter({

    schema: mySchema,
  });
  const database = new Database({
    adapter,
    modelClasses: [Users, Chat, Message],
    actionsEnabled: true,
  });

export default database