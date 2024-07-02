import {useDispatch, useSelector} from 'react-redux';
import {type RootState} from '../../Redux/rootReducers';
import {setLoginTrue, setLoginFalse} from '../../Redux/Slices/IsLogInSlice';

export const useIsLogin = () => {
  const dispatch = useDispatch();
  const isLoginSlice = useSelector((state: RootState) => state.isLoginSlice);

  const userLogedIn = () => {
    dispatch(setLoginTrue());
  };

  const userLogedOut = () => {
    dispatch(setLoginFalse());
  };

  return {
    userLogedIn,
    userLogedOut,
    isLogedIn: isLoginSlice.isLogin,
  };
};
