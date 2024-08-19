import {useDispatch, useSelector} from 'react-redux';
import {type RootState} from '../../Redux/rootReducers';
import {
  callDeactivateAccount,
  resetDeactivateAccountResponse,
} from '../../Redux/Slices/DeactivateSlice';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {SheetManager} from 'react-native-actions-sheet';

export const useDeactivateAccount = (onSuccess: () => void) => {
  const dispatch = useDispatch();
  const deactivateAccountSlice = useSelector(
    (state: RootState) => state.deactivateAccountSlice,
  );

  const callDeactivateAccountApi = async () => {
    await SheetManager.hide('AlertBox-sheet');
    dispatch(callDeactivateAccount());
  };

  const resetDeactivateAccountReducer = () => {
    dispatch(resetDeactivateAccountResponse());
  };

  useEffect(() => {
    if (deactivateAccountSlice.success) {
      resetDeactivateAccountReducer();
      onSuccess?.();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: deactivateAccountSlice.success.message,
        visibilityTime: 5000,
      });
    }
  }, [deactivateAccountSlice.success]);

  useEffect(() => {
    if (deactivateAccountSlice.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: deactivateAccountSlice.error.message,
        visibilityTime: 5000,
      });
    }
  }, [deactivateAccountSlice.error]);

  return {
    callDeactivateAccountApi,
    resetDeactivateAccountReducer,
    deactivateSuccess: deactivateAccountSlice.success,
    deactivateLoading: deactivateAccountSlice.loading,
    deactivateError: deactivateAccountSlice.error,
  };
};
