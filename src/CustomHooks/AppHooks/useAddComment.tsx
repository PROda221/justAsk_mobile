import {useDispatch, useSelector} from 'react-redux';

import {useEffect} from 'react';
import {RootState} from '../../Redux/rootReducers';
import {
  callAddComment,
  callYourComment,
  resetAddCommenetData,
} from '../../Redux/Slices/FeedbackSlice';
import Toast from 'react-native-toast-message';

export const useAddComments = (
  username?: string,
  content?: string,
  rating?: number,
) => {
  const dispatch = useDispatch();
  const addCommenetSlice = useSelector(
    (state: RootState) => state.feedbackSlice.addCommenet,
  );

  const callAddCommentApi = () => {
    dispatch(callAddComment({username, content, rating}));
  };

  const resetaddCommenetReducer = () => {
    dispatch(resetAddCommenetData());
  };

  useEffect(() => {
    if (addCommenetSlice.success) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: addCommenetSlice.success.message,
        visibilityTime: 5000,
      });
      resetaddCommenetReducer();
      dispatch(callYourComment({username}));
    }
  }, [addCommenetSlice.success]);

  useEffect(() => {
    if (addCommenetSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: addCommenetSlice.error.message,
        visibilityTime: 5000,
      });
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
