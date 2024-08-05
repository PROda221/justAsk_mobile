import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {getBlockedUsersScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {FlashList} from '@shopify/flash-list';
import {CustomButton, Typography} from '../../../Components';
import Header from '../../../Components/Header';
import content from '../../../Assets/Languages/english.json';
import UserList from './UserList';
import {useAllBlocked} from '../../../CustomHooks/AppHooks/useAllBlocked';
import {BlockedUser} from '../../../Redux/Slices/AllBlockedSlice';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Loader from '../../../Components/Loader/Loader';
import {useMultiUnblock} from '../../../CustomHooks/AppHooks/useMultiUnblock';

type Params = {
  params: {
    username: string;
  };
};

// Props type
type BlockedListProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<Params>;
};

const BlockedListScreen = ({
  navigation,
  route,
}: BlockedListProps): JSX.Element => {
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);

  const {
    callAllBlockedApi,
    allBlockedSuccess,
    allBlockedLoading,
    resetAllBlockedReducer,
  } = useAllBlocked();

  const handleUnblockSuccess = useCallback(async () => {
    resetAllBlockedReducer();
    setBlockedUsers([]);
    getBlockedList();
    setSelectedUsers(new Set());
  }, []);

  const {callMultiUnblockApi} = useMultiUnblock(
    handleUnblockSuccess,
    [...selectedUsers],
    route.params.username,
  );

  const getBlockedList = () => {
    callAllBlockedApi(10, allBlockedSuccess?.lastId || '');
  };

  useEffect(() => {
    getBlockedList();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (allBlockedSuccess) {
      setBlockedUsers([...blockedUsers, ...allBlockedSuccess.data]);
    }
  }, [allBlockedSuccess]);

  const {colors} = useTheme();
  const styles = getBlockedUsersScreenStyles(colors);

  const toggleSelection = (userId: string) => {
    setSelectedUsers(prevSelected =>
      prevSelected.has(userId)
        ? new Set([...prevSelected].filter(id => id !== userId))
        : new Set(prevSelected).add(userId),
    );
  };

  const handleUnblock = () => {
    callMultiUnblockApi([...selectedUsers]);
  };

  const renderItem = ({item}: {item: BlockedUser}) => {
    return (
      <UserList
        name={item.blocked}
        image={item.blockedImg}
        updateStatus={item.updatedAt}
        selectedUsers={selectedUsers}
        toggleSelection={toggleSelection}
        styles={styles}
        colors={colors}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          containerStyle={styles.backButtonContainer}
          onPress={resetAllBlockedReducer}
        />
        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.headingText}>
          {content.BlockScreen.title}
        </Typography>
      </View>

      <FlashList
        showsVerticalScrollIndicator={false}
        estimatedItemSize={120}
        contentContainerStyle={styles.listConatiner}
        data={blockedUsers}
        renderItem={renderItem}
        onEndReached={() => allBlockedSuccess?.data.length && getBlockedList()}
        ListFooterComponent={() => {
          return <>{(loading || allBlockedLoading) && <Loader isLoading />}</>;
        }}
        extraData={[selectedUsers]}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          radius={14}
          viewStyle={{
            backgroundColor:
              selectedUsers.size === 0
                ? colors.disabledButton
                : colors.enabledButton,
          }}
          label={content.BlockScreen.unblockButton}
          onPress={handleUnblock}
          disabled={selectedUsers.size === 0}
        />
      </View>
    </View>
  );
};

export default BlockedListScreen;
