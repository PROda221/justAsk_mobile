import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        {name: 'username', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'profile_pic', type: 'string'},
        {name: 'skills', type: 'string'},
        {name: 'emailId', type: 'string'},
        {name: 'average_rating', type: 'string'},
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'chats',
      columns: [
        {name: 'username', type: 'string'},
        {name: 'profile_pic', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'skills', type: 'string'},
        {name: 'last_message', type: 'string'},
        {name: 'message_time', type: 'string'},
        {name: 'unread_count', type: 'number'},
        {name: 'chat_id', type: 'string', isIndexed: true, isUnique: true},
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'messages',
      columns: [
        {name: 'is_received', type: 'boolean'},
        {name: 'text', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'chat_id', type: 'string', isIndexed: true},
        {name: 'read', type: 'boolean'},
        {name: 'uploading_image', type: 'boolean'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    }),
  ],
});
