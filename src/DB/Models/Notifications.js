import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Notifications extends Model {
  static table = 'notifications';
  @field('sender') sender;
}
