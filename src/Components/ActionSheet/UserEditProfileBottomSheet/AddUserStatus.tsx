import React from 'react';
import {View} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {Typography} from '../../Typography';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getEditProfileSheetStyles} from './styles';
import {TextInput} from '../../TextInput';
import {useForm} from 'react-hook-form';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {moderateScale} from '../../../Functions/StyleScale';

function AddUserStatus({payload}: SheetProps<'AddUserStatus-sheet'>) {
  const {colors} = useTheme();
  const styles = getEditProfileSheetStyles(colors);
  const {control, handleSubmit} = useForm();

  const changeStatus = async (data: {status: string}) => {
    SheetManager.hide('AddUserStatus-sheet', {payload: data.status});
  };

  return (
    <ActionSheet containerStyle={styles.actionSheet}>
      <View style={styles.container}>
        <View style={styles.statusHeader}>
          <View>
            <Typography
              fontWeight="400"
              bgColor={colors.textPrimaryColor}
              textStyle={styles.textStyle}>
              {'Change your status'}
            </Typography>
          </View>
          <View>
            <FontAwesome6
              name="check"
              size={moderateScale(20)}
              color={colors.iconPrimaryColor}
              onPress={handleSubmit(changeStatus)}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.option}>
          <TextInput
            name="status"
            secureTextEntry={false}
            control={control}
            label="Status"
            placeholder="Status"
            leftIcon="chat"
            rules={{required: 'Status is required'}}
          />
        </View>
      </View>
    </ActionSheet>
  );
}

export default AddUserStatus;
