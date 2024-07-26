import {useDispatch, useSelector} from 'react-redux';

import {useEffect} from 'react';
import {RootState} from '../../Redux/rootReducers';
import {
  callYourComment,
  resetYourCommentData,
} from '../../Redux/Slices/FeedbackSlice';
import Toast from 'react-native-toast-message';

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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: getYourCommentSlice.error.message,
        visibilityTime: 5000,
      });
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
