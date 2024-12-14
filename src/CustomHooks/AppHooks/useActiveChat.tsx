import {useEffect, useState} from 'react';
import {getCurrentChatObservable} from '../../DB/DBFunctions';
import {Model} from '@nozbe/watermelondb';

export const useActiveChat = (accountName: string, username: string) => {
  const [activeChat, setActiveChat] = useState<Model[]>();

  useEffect(() => {
    const subscription = getCurrentChatObservable(
      accountName,
      username,
    ).subscribe(data => {
      setActiveChat(data);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {activeChat};
};
