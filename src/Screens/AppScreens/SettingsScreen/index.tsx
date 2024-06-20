import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
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

const SettingsScreen = () => {
  const {profileSuccess} = useProfile();
  const {colors} = useTheme();
  const styles = getSettingsScreenStyles(colors);

  const listData = [
    {
      name: 'Change Password',
      iconName: 'account-circle',
      iconColor: colors.settingsIconColor,
    },
    {
      name: 'Blocked List',
      iconName: 'chat',
      iconColor: colors.settingsIconColor,
    },
    {
      name: 'Invite a friend',
      iconName: 'person-add',
      iconColor: colors.settingsIconColor,
    },
    {
      name: 'Delete Account',
      iconName: 'delete-forever',
      iconColor: colors.settingsDeleteColor,
    },
    {
      name: 'Log out',
      iconName: 'logout',
      iconColor: colors.settingsLogoutColor,
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
          <TouchableOpacity style={styles.menuItem} key={index}>
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
