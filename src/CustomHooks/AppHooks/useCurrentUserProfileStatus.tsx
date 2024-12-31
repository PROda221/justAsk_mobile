import {useEffect, useState} from 'react';
import {Model, Q} from '@nozbe/watermelondb';
import database from '../../DB/database';

export const useCurrentUserProfileStatus = (username: string) => {
  const [currentUserProfile, setCurrentUserProfile] = useState<Model[]>();

  useEffect(() => {
    if (!username) return;
    const subscription = database
      .get('users')
      .query(Q.where('username', username))
      .observeWithColumns(['profile_pic', 'status'])
      .subscribe(data => {
        setCurrentUserProfile(data);
      });

    return () => subscription.unsubscribe();
  }, [username]);

  return {currentUserProfile};
};
