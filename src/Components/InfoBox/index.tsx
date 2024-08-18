import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getInfoBoxStyles} from './stykes';
import {moderateScale} from '../../Functions/StyleScale';
import {Typography} from '../Typography';

type InfoBoxProps = {
  title: string;
  message: string;
};

const InfoBox = ({title, message}: InfoBoxProps) => {
  const {colors} = useTheme();
  const styles = getInfoBoxStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="warning"
          size={moderateScale(20)}
          color={colors.infoBoxIconColor}
        />
        <Typography
          bgColor={colors.infoBoxTextColor}
          fontWeight="400"
          textStyle={styles.title}>
          {title}
        </Typography>
      </View>
      <Typography
        bgColor={colors.infoBoxTextColor}
        fontWeight="400"
        textStyle={styles.message}>
        {message}
      </Typography>
    </View>
  );
};

export default InfoBox;
