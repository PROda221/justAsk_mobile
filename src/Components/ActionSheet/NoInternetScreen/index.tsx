import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Typography} from '../../Typography';
import NetInfo from '@react-native-community/netinfo';
import {Ionicons} from '@expo/vector-icons';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getNoInternetSheetStyles} from './styles';
import content from '../../../Assets/Languages/english.json';
import Toast from 'react-native-toast-message';

const NoInternetScreen = ({payload}: SheetProps<'NoInternet-sheet'>) => {
  const {colors} = useTheme();
  const styles = getNoInternetSheetStyles(colors);
  const checkConnection = async () => {
    const connection = await NetInfo.fetch();
    if (connection) {
      SheetManager.hide('NoInternet-sheet');
    } else {
      Toast.show({
        type: 'error',
        text1: 'No Internet',
        text2: 'Please check your network settings and try again',
        visibilityTime: 5000,
      });
    }
  };

  return (
    <ActionSheet
      containerStyle={styles.actionSheet}
      closeOnTouchBackdrop={false}
      closeOnPressBack={false}>
      <View style={styles.container}>
        <Ionicons
          name="cloud-offline"
          size={100}
          color={colors.noInternetIcon}
        />
        <Typography
          fontWeight="400"
          bgColor={colors.textPrimaryColor}
          textStyle={styles.title}>
          {content.NoInternetScreen.title}
        </Typography>
        <Typography
          fontWeight="400"
          bgColor={colors.textInputPlaceholderColor}
          textStyle={styles.subtitle}>
          {content.NoInternetScreen.subTitle}
        </Typography>
        <TouchableOpacity style={styles.button} onPress={checkConnection}>
          <Typography
            fontWeight="400"
            bgColor={colors.noInternetRetryButton}
            textStyle={styles.buttonText}>
            {content.NoInternetScreen.retryButton}
          </Typography>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

export default NoInternetScreen;
