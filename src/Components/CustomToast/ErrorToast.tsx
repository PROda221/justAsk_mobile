import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getToastStyles} from './styles';
import {Typography} from '../Typography';
import {moderateScale} from '../../Functions/StyleScale';

type PropTypes = {
  title: string;
  text: string;
};

const ErrorBox = ({title, text}: PropTypes) => {
  const {colors} = useTheme();
  const styles = getToastStyles(colors);

  return (
    <View style={styles.errorBox}>
      <Icon
        name="block"
        size={moderateScale(32)}
        color={colors.toastErrorIconColor}
        style={styles.errorIcon}
      />
      <View style={styles.errorTextContainer}>
        <Typography
          bgColor={colors.toastErrorTitleColor}
          fontWeight="bold"
          textStyle={styles.errorTitle}>
          {title}
        </Typography>
        <Typography
          bgColor={colors.toastInfoTextColor}
          fontWeight="400"
          textStyle={styles.errorMessage}>
          {text}
        </Typography>
      </View>
    </View>
  );
};

export default ErrorBox;
