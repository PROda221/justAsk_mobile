import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import {Typography} from '../../../Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useProfile} from '../../../CustomHooks/AppHooks/useProfile';
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
import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useLogin} from '../../../CustomHooks/AuthHooks/useLogin';
import {useSendOtp} from '../../../CustomHooks/AuthHooks/useSendOtp';
import {useIsLogin} from '../../../CustomHooks/AuthHooks/useIsLogin';
import {useGoogleLogin} from '../../../CustomHooks/AuthHooks/useGoogleLogin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

type PropsType = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const SettingsScreen = ({navigation}: PropsType) => {
  const {profileSuccess} = useProfile();
  const {colors} = useTheme();
  const styles = getSettingsScreenStyles(colors);
  const {resetLoginReducer} = useLogin();
  const {resetGoogleLoginReducer} = useGoogleLogin();
  const {callSendOtpApi, sendOtpSuccess} = useSendOtp();
  const {userLogedOut} = useIsLogin();

  useEffect(() => {
    if (sendOtpSuccess?.success) {
      navigation.navigate('Otp Screen', {emailId: profileSuccess?.emailId});
    }
  }, [sendOtpSuccess]);

  const handleListOnPress = () => {
    navigation.navigate('MyFeedback');
  };

  const openEditProfile = () => {
    navigation.navigate('EditProfile', {
      image: profileSuccess?.profilePic,
      status: profileSuccess?.status,
      username: profileSuccess?.username,
      skills: profileSuccess?.adviceGenre,
    });
  };

  const logout = async () => {
    await resetAccessToken();
    resetLoginReducer();
    resetGoogleLoginReducer();
    await GoogleSignin.signOut();
    userLogedOut();
  };

  const handleChangePass = () => {
    callSendOtpApi({emailId: profileSuccess?.emailId || 'emailId'});
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
      onPress: handleChangePass,
    },
    {
      name: 'My Feedback Page',
      iconName: 'wechat',
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

      <TouchableOpacity
        onPress={openEditProfile}
        style={styles.profileContainer}>
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
      </TouchableOpacity>

      {listData.map((value, index) => (
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
      ))}
    </View>
  );
};

export default SettingsScreen;
