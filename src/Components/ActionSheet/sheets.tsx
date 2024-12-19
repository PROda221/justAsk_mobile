import {
  RouteDefinition,
  SheetDefinition,
  registerSheet,
} from 'react-native-actions-sheet';
import SearchFeature from '../Search';
import ViewImage from './ViewImage';
import {AddProfileImage, AddUserStatus} from './UserEditProfileBottomSheet';
import NoInternetScreen from './NoInternetScreen';
import AlertBox from './AlertBox';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import GiphyPopup from './GiphyPopup';

registerSheet('SearchFeature-sheet', SearchFeature);
registerSheet('ViewProfileImage-sheet', ViewImage);
registerSheet('AddProfileImage-sheet', AddProfileImage);
registerSheet('AddUserStatus-sheet', AddUserStatus);
registerSheet('NoInternet-sheet', NoInternetScreen);
registerSheet('AlertBox-sheet', AlertBox);
registerSheet('GiphyPopup-sheet', GiphyPopup);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'SearchFeature-sheet': SheetDefinition<{
      payload: {
        navigation: NativeStackNavigationProp<ParamListBase>;
      };
      routes: {
        SearchScreen: RouteDefinition<{}>;
        // Route B with params.
        AdviceListScreen: RouteDefinition;
      };
    }>;
    'ViewProfileImage-sheet': SheetDefinition<{
      payload: {
        imageUrl: string | string[];
      };
    }>;
    'AddProfileImage-sheet': SheetDefinition<{
      returnValue: string;
    }>;
    'AddUserStatus-sheet': SheetDefinition<{
      returnValue: string;
    }>;
    'NoInternet-sheet': SheetDefinition;
    'AlertBox-sheet': SheetDefinition<{
      payload: {
        title: string;
        description: string;
        onPressOk: () => void;
        onPressCancel?: () => void;
        confirmCustomName?: string;
        cancelCustomName?: string;
      };
    }>;
    'GiphyPopup-sheet': SheetDefinition<{
      returnValue: string;
    }>;
  }
}
