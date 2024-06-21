import React, {useEffect, useCallback, useState} from 'react';
import {View} from 'react-native';
import {TextInput} from '../TextInput';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getSearchStyles} from './styles';
import {useForm} from 'react-hook-form';
import SelectableAdviceList from './SelectableAdviceList';
import ActionSheet, {
  Route,
  SheetProps,
  useSheetRouter,
} from 'react-native-actions-sheet';

import {Typography} from '../Typography';

import {Filter} from '../../Assets/Images';
import {horizontalScale, verticalScale} from '../../Functions/StyleScale';
import {RenderSvg} from '../RenderSvg';
import {debounce, isEqual} from 'lodash';
import {FlashList} from 'react-native-actions-sheet/dist/src/views/FlashList';
import {UserCard} from '../UserCard';
import {useSearch} from '../../CustomHooks/AppHooks/useSearch';

let currentGenres: string[];

const SearchScreen = (props: SheetProps<'SearchFeature-sheet'>) => {
  const router = useSheetRouter('SearchFeature-sheet');
  const {colors} = useTheme();
  const styles = getSearchStyles(colors);
  const {control, getValues, watch} = useForm();
  const allFields = watch('search');

  const {
    searchedGenres,
    callSearchUserApi,
    searchSuccess,
    resetSearchUserReducer,
    searchError,
  } = useSearch();
  const [userList, setUserList] = useState(searchSuccess?.data || []);

  useEffect(() => {
    if (searchSuccess?.data.length) {
      const conctinatedUserList = [...userList, ...searchSuccess.data];
      setUserList(conctinatedUserList);
    }
  }, [searchSuccess?.data]);

  const createSearchObj = () => {
    const searchObj = {
      username: getValues('search'),
      genreName: searchedGenres,
      limit: 10,
      lastId: searchSuccess?.lastId,
    };
    callSearchUserApi(searchObj);
  };

  const debouncedCreateSearchObj = useCallback(
    debounce(createSearchObj, 1000),
    [searchedGenres],
  );

  useEffect(() => {
    currentGenres = [...searchedGenres];
  }, []);

  useEffect(() => {
    if (allFields || !isEqual(currentGenres, searchedGenres)) {
      resetSearchUserReducer();
      setUserList([]);
      debouncedCreateSearchObj();
      currentGenres = [...searchedGenres];
    }
  }, [allFields, searchedGenres]);

  const getNoRenderMsg = () => {
    if (searchError?.message) {
      return searchError.message;
    }

    return 'Type a name or select a topic by pressing on the filter icon for results.';
  };

  const renderNotFound = () => (
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
        {getNoRenderMsg()}
      </Typography>
    </View>
  );

  const renderItem = ({item}) => (
    <UserCard
      username={item.username}
      skills={item.adviceGenre}
      status={item.status}
      image={`${item.pic}`}
    />
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
        rightIcon="search"
        handleRightIconPress={() => router.navigate('AdviceListScreen')}
      />
      {(!searchedGenres.length && !userList.length) || searchError?.message
        ? renderNotFound()
        : null}
      <View
        style={{
          height: userList.length ? verticalScale(500) : verticalScale(30),
        }}>
        <FlashList
          data={userList}
          renderItem={renderItem}
          estimatedItemSize={100}
          onEndReached={() => searchSuccess?.data.length && createSearchObj()}
          onEndReachedThreshold={0.5}
        />
      </View>

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
