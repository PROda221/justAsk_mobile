import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {moderateScale} from '../../Functions/StyleScale';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getToastStyles} from './styles';
import {Typography} from '../Typography';

type PropTypes = {
  title: string;
  text: string;
};

const SuccessBox = ({title, text}: PropTypes) => {
  const {colors} = useTheme();
  const styles = getToastStyles(colors);
  return (
    <View style={styles.successBox}>
      <Icon
        name="checkcircleo"
        size={moderateScale(30)}
        color={colors.toastSuccessIconColor}
        style={styles.successIcon}
      />
      <View style={styles.successTextContainer}>
        <Typography
          fontWeight="700"
          bgColor={colors.toastSuccessTitleColor}
          textStyle={styles.successTitle}>
          {title}
        </Typography>
        <Typography
          fontWeight="400"
          bgColor={colors.toastSuccessTextColor}
          textStyle={styles.successMessage}>
          {text}
        </Typography>
      </View>
    </View>
  );
};

export default SuccessBox;
