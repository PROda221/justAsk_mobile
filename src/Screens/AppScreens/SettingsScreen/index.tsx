import React from 'react';
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import {Typography} from '../../../Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useProfile} from '../HomeScreen/CustomHooks/useProfile';
import {baseURL} from '../../../Constants';
import {getSettingsScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {RenderSvg} from '../../../Components/RenderSvg';
import {ProfileEdit} from '../../../Assets/Images';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import Header from '../../../Components/Header';
import {resetAccessToken} from '../../../Functions/EncryptedStorage';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {setLoginFalse} from '../../../Redux/Slices/IsLogInSlice';
import {useLogin} from '../../AuthScreens/Login/CustomHooks/useLogin';

type PropsType = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const SettingsScreen = ({navigation}: PropsType) => {
  const {profileSuccess} = useProfile();
  const {colors} = useTheme();
  const styles = getSettingsScreenStyles(colors);
  const {resetLoginReducer} = useLogin();

  const dispatch = useDispatch();

  const handleListOnPress = () => {
    console.log('abc');
  };

  const logout = async () => {
    await resetAccessToken();
    resetLoginReducer();
    dispatch(setLoginFalse());
  };

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: logout,
        style: 'cancel',
      },
    ]);
  };

  const listData = [
    {
      name: 'Change Password',
      iconName: 'account-circle',
      iconColor: colors.settingsIconColor,
      onPress: handleListOnPress,
    },
    {
      name: 'Blocked List',
      iconName: 'chat',
      iconColor: colors.settingsIconColor,
      onPress: handleListOnPress,
    },
    {
      name: 'Invite a friend',
      iconName: 'person-add',
      iconColor: colors.settingsIconColor,
      onPress: handleListOnPress,
    },
    {
      name: 'Delete Account',
      iconName: 'delete-forever',
      iconColor: colors.settingsDeleteColor,
      onPress: handleListOnPress,
    },
    {
      name: 'Log out',
      iconName: 'logout',
      iconColor: colors.settingsLogoutColor,
      onPress: handleLogout,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header containerStyle={styles.headerStyle} />
        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.headingText}>
          Settings
        </Typography>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: `${baseURL}/${profileSuccess?.profilePic}?${new Date()}`,
          }}
          style={styles.profilePic}
        />
        <View style={styles.profileText}>
          <View style={styles.editContainer}>
            <Typography
              bgColor={colors.textPrimaryColor}
              fontWeight="400"
              textStyle={styles.profileName}>
              {profileSuccess?.username}
            </Typography>
            <View style={{paddingLeft: horizontalScale(15)}}>
              <RenderSvg
                Icon={ProfileEdit}
                width={horizontalScale(20)}
                height={verticalScale(20)}
              />
            </View>
          </View>

          <Typography
            bgColor={colors.textInputPlaceholderColor}
            fontWeight="400"
            textStyle={styles.profileStatus}>
            {profileSuccess?.status}
          </Typography>
        </View>
      </View>

      {listData.map((value, index) => {
        return (
          <TouchableOpacity
            style={styles.menuItem}
            key={index}
            onPress={value.onPress}>
            <Icon
              name={value.iconName}
              size={moderateScale(24)}
              color={value.iconColor}
            />
            <Typography
              bgColor={colors.textPrimaryColor}
              fontWeight="400"
              textStyle={styles.menuText}>
              {value.name}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SettingsScreen;
