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
  @field('uploading_image') uploadingImage;
  @field('msg_id') msgId;
  @field('status') status;
  @field('msg_created_at') msgCreatedAt;
  @field('forward_msg_id') forwardMsgId;
  @field('forward_msg') forwardMsg;
  @field('forward_msg_type') forwardMsgType;
  @field('forward_msg_received') forwardMsgReceived;
  @field('forward_msg_username') forwardMsgUsername;
  @relation('chats', 'chat_id') chat;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
