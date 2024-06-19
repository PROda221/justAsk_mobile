import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../Redux/rootReducers';
import {
  resetYourCommentData,
  callYourComment,
} from '../../../../Redux/Slices/FeedbackSlice';
import {useEffect} from 'react';

export const useYourComment = (username?: string) => {
  const dispatch = useDispatch();
  const getYourCommentSlice = useSelector(
    (state: RootState) => state.feedbackSlice.getYourComment,
  );

  const callGetYourCommentApi = () => {
    dispatch(callYourComment({username}));
  };

  const resetYourCommenReducer = () => {
    dispatch(resetYourCommentData());
  };

  useEffect(() => {
    if (getYourCommentSlice.success) {
      console.log('success your comment :', getYourCommentSlice.success);
    }
  }, [getYourCommentSlice.success]);

  useEffect(() => {
    if (getYourCommentSlice.error) {
      console.log('error your comment :', getYourCommentSlice.error);
    }
  }, [getYourCommentSlice.error]);

  return {
    callGetYourCommentApi,
    resetYourCommenReducer,
    getYourCommentSuccess: getYourCommentSlice.success,
    getYourCommentLoading: getYourCommentSlice.loading,
    getYourCommentError: getYourCommentSlice.error,
  };
};
