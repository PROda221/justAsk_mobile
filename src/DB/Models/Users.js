import { Model } from '@nozbe/watermelondb';
import { date, field, readonly } from '@nozbe/watermelondb/decorators';

export default class Users extends Model {
  static table = 'users';

  static associations = {
      chats: { type: 'has_many', foreignKey: 'user_id' },
  };

  @field('username') username;
  @field('profile_pic') profilePic;
  @field('skills') skills;
  @field('status') status;
  @field('emailid') emailid;
  @field('average_rating') averageRating;
  @field('user_id') userId;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
