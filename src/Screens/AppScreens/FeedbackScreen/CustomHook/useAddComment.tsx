import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../Redux/rootReducers';
import {
  resetAddCommenetData,
  callAddComment,
} from '../../../../Redux/Slices/FeedbackSlice';
import {useEffect} from 'react';
import {useYourComment} from './useYourComment';

export const useAddComments = (
  username?: string,
  content?: string,
  rating?: number,
) => {
  const dispatch = useDispatch();
  const addCommenetSlice = useSelector(
    (state: RootState) => state.feedbackSlice.addCommenet,
  );

  const {callGetYourCommentApi} = useYourComment(username);

  const callAddCommentApi = () => {
    dispatch(callAddComment({username, content, rating}));
  };

  const resetaddCommenetReducer = () => {
    dispatch(resetAddCommenetData());
  };

  useEffect(() => {
    if (addCommenetSlice.success) {
      console.log('success add comment :', addCommenetSlice.success);
      resetaddCommenetReducer();
      callGetYourCommentApi();
    }
  }, [addCommenetSlice.success]);

  useEffect(() => {
    if (addCommenetSlice.error) {
      console.log('error add comment :', addCommenetSlice.error);
    }
  }, [addCommenetSlice.error]);

  return {
    callAddCommentApi,
    resetaddCommenetReducer,
    addCommenetSuccess: addCommenetSlice.success,
    addCommenetLoading: addCommenetSlice.loading,
    addCommenetError: addCommenetSlice.error,
  };
};
