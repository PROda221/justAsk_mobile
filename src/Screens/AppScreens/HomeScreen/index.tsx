import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {getHomeScreenStyles} from './styles';
import {Typography} from '../../../Components';
import {SheetManager} from 'react-native-actions-sheet';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNotifications} from '../../../CustomHooks/AppHooks/useNotifications';
import {type Model} from '@nozbe/watermelondb';
import content from '../../../Assets/Languages/english.json';
import ActiveChats from './ActiveChats';
import HomeHeader from './HomeHeader';
import {useIsFocused} from '@react-navigation/native';
import {useProfile} from '../../../CustomHooks/AppHooks/useProfile';
import {Skeleton} from 'moti/skeleton';
import {verticalScale} from '../../../Functions/StyleScale';
import {useActivateAccount} from '../../../CustomHooks/AppHooks/useActivateAccount';
import Loader from '../../../Components/Loader/Loader';
import {useSyncChats} from '../../../CustomHooks/AppHooks/useSyncChats';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  activeChats: Model[];
  currentUser: Model[];
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [initialLoader, setInitialLoader] = useState(true);
  const {colors} = useTheme();
  const styles = getHomeScreenStyles(colors);
  useNotifications();
  // useCheckNet();
  const isFocused = useIsFocused();

  const {profileSuccess, profileLoading, profileError, callGetProfileApi} =
    useProfile(isFocused);

  const {callSyncChatsApi} = useSyncChats();

  const {ActivateLogoutLoading} = useActivateAccount(
    profileSuccess?.deactivated,
    callGetProfileApi,
  );

  useEffect(() => {
    if (profileLoading) {
      setInitialLoader(false);
    }
  }, [profileLoading]);

  useEffect(() => {
    if (profileSuccess?.username) {
      callSyncChatsApi(profileSuccess?.username);
    }
  }, [profileSuccess?.username]);

  const openSettings = () => {
    navigation.navigate('Settings', {username: profileSuccess?.username});
  };

  const searchBar = () => (
    <TouchableOpacity
      style={styles.searchButtonContainer}
      onPress={async () =>
        SheetManager.show('SearchFeature-sheet', {payload: {navigation}})
      }>
      <View style={styles.searchContainer}>
        <Typography
          fontWeight="400"
          bgColor={colors.textPrimaryColor}
          textStyle={styles.searchButtonTextStyle}>
          {content.HomeScreen.searchPlaceholder}
        </Typography>
      </View>
      <View style={styles.addButton}>
        <Icon name="add" size={20} color={colors.iconPrimaryColor} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HomeHeader
        styles={styles}
        colors={colors}
        loading={initialLoader || profileLoading}
        username={profileSuccess?.username ?? ''}
        openSettings={openSettings}
      />
      <View style={{paddingTop: verticalScale(15)}}>
        <Skeleton show={initialLoader || profileLoading} colorMode="light">
          {searchBar()}
        </Skeleton>
      </View>

      <Loader isLoading={ActivateLogoutLoading} />

      <ActiveChats
        navigation={navigation}
        error={profileError?.message ?? ''}
        retryProfileApi={callGetProfileApi}
        accountName={profileSuccess?.username ?? ''}
      />
    </View>
  );
};

export default HomeScreen;
