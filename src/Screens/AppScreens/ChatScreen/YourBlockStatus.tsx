import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Typography} from '../../../Components';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getChatScreenStyles} from './styles';
import content from '../../../Assets/Languages/english.json';
import {useUnblockUser} from '../../../CustomHooks/AppHooks/useUnblockUser';
import Loader from '../../../Components/Loader/Loader';

type PropsType = {
  username: string;
  show: boolean;
};

export const YourBlockStatus = ({username, show}: PropsType) => {
  const {colors} = useTheme();
  const styles = getChatScreenStyles(colors);
  const {callUnblockUserApi, unblockLoading} = useUnblockUser(username);
  return (
    <>
      {show ? (
        <TouchableOpacity
          style={styles.messageContainer}
          onPress={callUnblockUserApi}>
          <View
            style={[
              styles.messageBox,
              {backgroundColor: colors.primaryBackgroundColor},
            ]}>
            <Typography
              bgColor={colors.textPrimaryColor}
              fontWeight="400"
              textStyle={styles.messageText}>
              {unblockLoading ? (
                <Loader size={'small'} isLoading={true} />
              ) : (
                content.ChatScreen.yourBlockStatus
              )}
            </Typography>
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </>
  );
};
