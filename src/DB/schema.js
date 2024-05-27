import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'chats',
      columns: [
        {name: 'username', type: 'string'},
        {name: 'profile_pic', type: 'string'},
        {name: 'last_message', type: 'string'},
        {name: 'message_time', type: 'string'},
        {name: 'chat_id', type: 'string', isIndexed: true, isUnique: true},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'messages',
      columns: [
        {name: 'is_received', type: 'boolean'},
        {name: 'text', type: 'string'},
        {name: 'chat_id', type: 'string', isIndexed: true},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
  ],
});
