import React, {useEffect, useCallback, useState} from 'react';
import {View} from 'react-native';
import {TextInput} from '../TextInput';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getSearchStyles} from './styles';
import {useForm} from 'react-hook-form';
import SelectableAdviceList from './SelectableAdviceList';
import ActionSheet, {Route, useSheetRouter} from 'react-native-actions-sheet';

import {Typography} from '../Typography';

import {Filter} from '../../Assets/Images';
import {horizontalScale, verticalScale} from '../../Functions/StyleScale';
import {RenderSvg} from '../RenderSvg';
import {debounce, isEqual} from 'lodash';
import {FlashList} from 'react-native-actions-sheet/dist/src/views/FlashList';
import {UserCard} from '../UserCard';
import {useSearch} from '../../CustomHooks/AppHooks/useSearch';
import content from '../../Assets/Languages/english.json';
import Loader from '../Loader/Loader';

let currentGenres: string[];

const SearchScreen = () => {
  const router = useSheetRouter('SearchFeature-sheet');
  const {colors} = useTheme();
  const styles = getSearchStyles(colors);
  const {control, getValues, watch} = useForm();
  const allFields = watch('search');

  const {
    searchedGenres,
    searchedResults,
    setSearchedResults,
    callSearchUserApi,
    searchSuccess,
    resetSearchUserReducer,
    searchError,
    searchLoading,
  } = useSearch();
  const [userList, setUserList] = useState(
    searchedResults.length ? searchedResults : [],
  );

  useEffect(() => {
    if (searchSuccess?.data.length) {
      const conctinatedUserList = [...userList, ...searchSuccess.data];
      setSearchedResults(conctinatedUserList);
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
    if (!userList.length && (searchedGenres.length || getValues('search'))) {
      return content.SearchFeature.NoSearch;
    }
    return content.SearchFeature.EmptyListMsg;
  };

  const renderNotFound = () => (
    <View style={styles.noSearchContainer}>
      <RenderSvg
        Icon={Filter}
        height={verticalScale(100)}
        width={horizontalScale(100)}
        onPress={() => router?.navigate('AdviceListScreen')}
      />

      <Typography
        fontWeight="400"
        bgColor={colors.textPrimaryColor}
        textStyle={styles.noSearchText}>
        {getNoRenderMsg()}
      </Typography>
    </View>
  );

  const renderItem = ({item}) => {
    return (
      <UserCard
        username={item.username}
        skills={item.adviceGenre}
        status={item.status}
        image={item.pic}
      />
    );
  };

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
        handleRightIconPress={() => router?.navigate('AdviceListScreen')}
      />
      <View
        style={{
          height: userList.length ? verticalScale(500) : verticalScale(220),
        }}>
        <FlashList
          data={userList}
          ListEmptyComponent={renderNotFound}
          ListFooterComponent={() => {
            return <>{searchLoading && <Loader isLoading />}</>;
          }}
          renderItem={renderItem}
          extraData={searchLoading}
          estimatedItemSize={100}
          onEndReached={() => searchSuccess?.data.length && createSearchObj()}
          onEndReachedThreshold={0.5}
        />
      </View>
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
  const {colors} = useTheme();
  const styles = getSearchStyles(colors);

  return (
    <ActionSheet
      containerStyle={styles.actionSheetContainer}
      enableRouterBackNavigation={true}
      routes={routes}
      initialRoute="SearchScreen"
    />
  );
}

export default SearchFeature;
