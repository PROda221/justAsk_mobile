import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../Redux/rootReducers';
import {
  resetAllCommentsData,
  callAllComments,
} from '../../../../Redux/Slices/FeedbackSlice';
import {useEffect} from 'react';

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
      console.log('error in searchUser :', allCommentsSlice.error);
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
