import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {moderateScale} from '../../Functions/StyleScale';

import Icon from 'react-native-vector-icons/Ionicons';
import { Typography } from '..';
import { colors } from '../../DesignTokens/Colors';

type RadioItem = {
  id: number;
  isChecked: boolean;
  label: string;
};

type CustomRadioButtonProps = {
  data: RadioItem[];
};

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({data}) => {
  const [selectedItems, setSelectedItems] = useState(data);

  const handleRadioPress = (itemValue: RadioItem) => {
    const newData = data.map(item => {
      if (item.id === itemValue.id) {
        item.isChecked = true;
      } else {
        item.isChecked = false;
      }

      return item;
    });

    setSelectedItems(newData);
  };

  return (
    <View>
      {selectedItems.map(item => (
        <TouchableOpacity
          key={`radio-button-${item.id}`}
          onPress={() => {
            handleRadioPress(item);
          }}
          style={styles.container}>
          <Icon
            name={item.isChecked ? 'radio-button-on' : 'radio-button-off'}
            size={24}
            color={colors.black}
          />
          <Typography bgColor={colors.black} size={'medium'} fontWeight={'700'} textStyle={styles.label}>{item.label}</Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical:moderateScale(10)
  },
  label:{
    marginLeft:moderateScale(10)
  }
});

export default CustomRadioButton;
