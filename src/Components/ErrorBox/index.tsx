import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getErrorBoxStyles} from './styles';
import {moderateScale} from '../../Functions/StyleScale';
import {Typography} from '../Typography';

type ErrorBoxProps = {
  title: string;
  message: string;
};

const ErrorBox = ({title, message}: ErrorBoxProps) => {
  const {colors} = useTheme();
  const styles = getErrorBoxStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="warning"
          size={moderateScale(20)}
          color={colors.errorBoxIconColor}
        />
        <Typography
          bgColor={colors.errorBoxTextColor}
          fontWeight="400"
          textStyle={styles.title}>
          {title}
        </Typography>
      </View>
      <Typography
        bgColor={colors.errorBoxTextColor}
        fontWeight="400"
        textStyle={styles.message}>
        {message}
      </Typography>
    </View>
  );
};

export default ErrorBox;
