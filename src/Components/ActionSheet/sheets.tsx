import {RouteDefinition, SheetDefinition, registerSheet} from 'react-native-actions-sheet';
import SearchFeature from '../Search';
import ViewImage from '../ViewImage';
 
registerSheet('SearchFeature-sheet', SearchFeature);
registerSheet('ViewProfileImage-sheet', ViewImage);
 
// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'SearchFeature-sheet': SheetDefinition<{
      routes: {
        'SearchScreen': RouteDefinition;
        // Route B with params.
        'AdviceListScreen': RouteDefinition;
      }
    }>
    'ViewProfileImage-sheet': SheetDefinition<{
      payload?: {
        imageUrl: string
      }
    }>
  }
}