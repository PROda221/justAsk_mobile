import {Model} from '@nozbe/watermelondb';
import {
  field,
  relation,
  readonly,
  date,
} from '@nozbe/watermelondb/decorators';

export default class Message extends Model {
  static table = 'messages';

  static associations = {
    chats: { type: 'belongs_to', key: 'chat_id' }
  }

  @field('text') text;
  @field('is_received') received;
  @field('type') type;
  @field('read') read;
  @relation('chats', 'chat_id') chat;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
