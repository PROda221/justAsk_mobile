import {useDispatch, useSelector} from 'react-redux';

import {useEffect} from 'react';
import {RootState} from '../../Redux/rootReducers';
import {
  callAllBlocked,
  resetAllBlockedResponse,
} from '../../Redux/Slices/AllBlockedSlice';
import Toast from 'react-native-toast-message';

export const useAllBlocked = () => {
  const dispatch = useDispatch();
  const allBlockedSlice = useSelector(
    (state: RootState) => state.allBlockedSlice,
  );

  const callAllBlockedApi = (limit: number, lastId?: string) => {
    dispatch(callAllBlocked({limit, lastId}));
  };

  const resetAllBlockedReducer = () => {
    dispatch(resetAllBlockedResponse());
  };

  useEffect(() => {
    if (allBlockedSlice.success) {
      console.log('success is :', allBlockedSlice.success);
    }
  }, [allBlockedSlice.success]);

  useEffect(() => {
    if (allBlockedSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: allBlockedSlice.error.message,
        visibilityTime: 5000,
      });
    }
  }, [allBlockedSlice.error]);

  return {
    callAllBlockedApi,
    resetAllBlockedReducer,
    allBlockedSuccess: allBlockedSlice.success,
    allBlockedLoading: allBlockedSlice.loading,
    allBlockedError: allBlockedSlice.error,
  };
};
