import {useEffect, useState} from 'react';
import {getUserChats} from '../../DB/DBFunctions';
import {Model} from '@nozbe/watermelondb';

export const useActiveChats = (accountName?: string) => {
  const [activeChats, setActiveChats] = useState<Model[]>();

  useEffect(() => {
    if (!accountName) return;
    const subscription = getUserChats(accountName).subscribe(data => {
      setActiveChats(data);
    });

    return () => subscription.unsubscribe();
  }, [accountName]);

  return {activeChats};
};
