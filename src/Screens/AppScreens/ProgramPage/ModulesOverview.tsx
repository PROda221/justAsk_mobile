import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from '../../../Components/Typography';
import {moderateScale} from '../../../Functions/StyleScale';
import {colors} from '../../../DesignTokens/Colors';

const ModulesCovered: React.FC = () => (
  <View style={styles.container}>
    <Typography bgColor={colors.black} size={'medium'} fontWeight="400">
      {'ModulesCovered'}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {padding: moderateScale(16)},
});

export default ModulesCovered;
