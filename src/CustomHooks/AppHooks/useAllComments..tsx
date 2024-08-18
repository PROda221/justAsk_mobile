import {useDispatch, useSelector} from 'react-redux';

import {useEffect} from 'react';
import {RootState} from '../../Redux/rootReducers';
import {
  callAllComments,
  resetAllCommentsData,
} from '../../Redux/Slices/FeedbackSlice';
import Toast from 'react-native-toast-message';

export const useAllComments = (username?: string) => {
  const dispatch = useDispatch();
  const allCommentsSlice = useSelector(
    (state: RootState) => state.feedbackSlice.allComments,
  );

  const callAllCommentsApi = (
    limit: number,
    lastId: string,
    username?: string,
  ) => {
    dispatch(callAllComments({username, limit, lastId}));
  };

  const resetAllCommentsReducer = () => {
    dispatch(resetAllCommentsData());
  };

  useEffect(() => {
    if (allCommentsSlice.success) {
      console.log('success is :', allCommentsSlice.success);
    }
  }, [allCommentsSlice.success]);

  useEffect(() => {
    if (allCommentsSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: allCommentsSlice.error.message,
        visibilityTime: 5000,
      });
    }
  }, [allCommentsSlice.error]);

  return {
    callAllCommentsApi,
    resetAllCommentsReducer,
    allCommentsSuccess: allCommentsSlice.success,
    allCommentsLoading: allCommentsSlice.loading,
    allCommentsError: allCommentsSlice.error,
  };
};
