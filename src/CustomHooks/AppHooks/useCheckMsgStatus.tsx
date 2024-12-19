import {useEffect} from 'react';
import {getAllPendingMsgs, updateMsgStatus} from '../../DB/DBFunctions';

export const useCheckMsgStatus = () => {
  useEffect(() => {
    // Check every second for pending messages
    const interval = setInterval(async () => {
      const pendingMessages = await getAllPendingMsgs();
      pendingMessages.map(async message => {
        if (message._raw['msg_id'] == '') {
          const createdTimeStamp = Date.parse(message._raw['msg_created_at']);
          const elapsedTime = Date.now() - createdTimeStamp;
          if (elapsedTime > 5000) {
            // Mark the message as 'failed' after 5 seconds
            await updateMsgStatus(message.id, 'failed');
          }
        }
      });
    }, 7000);

    return () => clearInterval(interval); // Cleanup interval when component unmounts
  }, []);
};
