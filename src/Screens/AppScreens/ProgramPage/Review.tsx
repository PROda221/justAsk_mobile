import React from 'react';
import {View, StyleSheet} from 'react-native';
import { moderateScale } from '../../../Functions/StyleScale';
import { Typography } from '../../../Components';
import { colors } from '../../../DesignTokens/Colors';

type PropsTypes = {
  content: any[] | Array<{ point: string; }>
}

const bullet = '\u2022 ';

const Review = ({content}: PropsTypes): JSX.Element => (
  <View style={styles.container}>
    {content.map((item, index) => (
        <View key={index} style={styles.pointersContainers}>
          <Typography
            bgColor={colors.black}
            size="large"
            textStyle={styles.textLeft}
            fontWeight="400">
            {bullet}
          </Typography>
          <Typography
            bgColor={colors.black}
            size="medium"
            textStyle={styles.textLeft}
            fontWeight="400">
            {item}
          </Typography>
        </View>
      ))}
  </View>
);

const styles = StyleSheet.create({
  container: {padding: moderateScale(16)},
  pointersContainers: {flexDirection: 'row'},
  textLeft: {
    textAlign: 'left',
  },
});

export default Review;
