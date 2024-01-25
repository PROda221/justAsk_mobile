import React from 'react';
import {View} from 'react-native';
import {Typography} from '../../../Components/Typography';

const ModulesCovered: React.FC = () => (
  <View style={{padding: 16}}>
    <Typography
      bgColor={'#000000'}
      type={'bodyMedium'}
      size={'medium'}
      fontWeight="400">
      {'ModulesCovered'}
    </Typography>
  </View>
);

export default ModulesCovered;
