import React, {useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {TextInput} from '../TextInput';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getSearchStyles} from './styles';
import {useForm} from 'react-hook-form';
import SelectableAdviceList from './SelectableAdviceList';
import ActionSheet, {Route, RouteScreenProps} from 'react-native-actions-sheet';

import {Typography} from '../Typography';
import {useSearch} from '../../Screens/AppScreens/HomeScreen/CustomHooks/useSearch';

import {Filter} from '../../Assets/Images';
import {horizontalScale, verticalScale} from '../../Functions/StyleScale';
import {RenderSvg} from '../RenderSvg';
import {debounce} from 'lodash';
import {FlashList} from 'react-native-actions-sheet/dist/src/views/FlashList';

const SearchScreen = ({
  router,
}: RouteScreenProps<'SearchFeature-sheet', 'SearchScreen'>) => {
  const {colors} = useTheme();
  const styles = getSearchStyles(colors);
  const {control, getValues, watch} = useForm();

  const allFields = watch('search');

  const {searchedGenres, callSearchUserApi} = useSearch();

  const createSearchObj = () => {
    const searchObj = {
      username: getValues('search'),
      genreName: searchedGenres,
      limit: 10,
      lastId: '',
    };
    callSearchUserApi(searchObj);
  };

  const handler = useCallback(debounce(createSearchObj, 1000), []);

  useEffect(() => {
    createSearchObj();
  }, []);

  useEffect(() => {
    handler();
  }, [allFields]);

  useEffect(() => {
    if (searchedGenres) {
      createSearchObj();
    }
  }, [searchedGenres]);

  const renderNotFound = text => (
    <View style={styles.noSearchContainer}>
      {
        <RenderSvg
          Icon={Filter}
          height={verticalScale(100)}
          width={horizontalScale(100)}
          onPress={() => router.navigate('AdviceListScreen')}
        />
      }
      <Typography
        fontWeight="400"
        bgColor={colors.textPrimaryColor}
        textStyle={styles.noSearchText}>
        {text}
      </Typography>
    </View>
  );

  return (
    <View style={styles.searchContainer}>
      <TextInput
        viewStyle={styles.searchTextInput}
        name="search"
        secureTextEntry={false}
        control={control}
        label="Search"
        placeholder="Search..."
        leftIcon="search"
      />
      {searchedGenres.length === 0 &&
        renderNotFound(
          'Type a name or select a topic by pressing on the filter icon for results.',
        )}
      {/* <FlashList /> */}
      {/* <TouchableOpacity onPress={() => router.navigate('AdviceListScreen')}>
        <Typography fontWeight='400' bgColor='black'>
          {"press me"}
        </Typography>
      </TouchableOpacity> */}
    </View>
  );
};

const routes: Route[] = [
  {
    name: 'SearchScreen',
    component: SearchScreen,
  },
  {
    name: 'AdviceListScreen',
    component: SelectableAdviceList,
  },
];

function SearchFeature() {
  return (
    <ActionSheet
      enableRouterBackNavigation={true}
      routes={routes}
      initialRoute="SearchScreen"
    />
  );
}

export default SearchFeature;
