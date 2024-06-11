import { Model } from '@nozbe/watermelondb';
import { date, field, readonly, children } from '@nozbe/watermelondb/decorators';

export default class Chat extends Model {
  static table = 'chats';

  static associations = {
      messages: { type: 'has_many', foreignKey: 'chat_id' },
  };

  @field('username') username;
  @field('profile_pic') profilePic;
  @field('skills') skills;
  @field('status') status;
  @field('last_message') lastMessage;
  @field('message_time') messageTime;
  @field('chat_id') chatId;
  @children('messages') messages;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
