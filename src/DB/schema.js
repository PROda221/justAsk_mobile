import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 3,
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
        {name: 'deactivated', type: 'boolean'},
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
        {name: 'got_blocked_status', type: 'boolean'},
        {name: 'you_blocked_status', type: 'boolean'},
        {name: 'msg_id', type: 'string', isIndexed: true},
        {name: 'msg_created_at', type: 'string'},
        {name: 'chat_id', type: 'string', isIndexed: true, isUnique: true},
        {name: 'user_id', type: 'string', isIndexed: true},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
        {name: 'deactivated', type: 'boolean'},
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
        {name: 'msg_id', type: 'string', isIndexed: true},
        {name: 'msg_created_at', type: 'string'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
        {name: 'status', type: 'string', isIndexed: true}
      ],
    }),
    tableSchema({
      name: 'notifications',
      columns: [
        {name: 'sender', type: 'string'},
      ],
    }),
  ],
});
