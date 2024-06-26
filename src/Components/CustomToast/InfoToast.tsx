// InfoBox.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getToastStyles} from './styles';
import {moderateScale} from '../../Functions/StyleScale';
import {Typography} from '../Typography';

type PropTypes = {
  title: string;
  text: string;
};

const InfoBox = ({title, text}: PropTypes) => {
  const {colors} = useTheme();
  const styles = getToastStyles(colors);
  return (
    <View style={styles.infoBox}>
      <Icon
        name="info-outline"
        size={moderateScale(32)}
        color={colors.toastInfoIconColor}
        style={styles.infoIcon}
      />
      <View style={styles.infoTextContainer}>
        <Typography
          bgColor={colors.toastInfoTitleColor}
          fontWeight="bold"
          textStyle={styles.infoTitle}>
          {title}
        </Typography>
        <Typography
          bgColor={colors.toastInfoTextColor}
          fontWeight="400"
          textStyle={styles.infoMessage}>
          {text}
        </Typography>
      </View>
    </View>
  );
};

export default InfoBox;
