import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {Typography} from '../../Typography';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getEditProfileSheetStyles} from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import {Image as Compress} from 'react-native-compressor';

function AddProfileImage({payload}: SheetProps<'AddProfileImage-sheet'>) {
  const {colors} = useTheme();
  const styles = getEditProfileSheetStyles(colors);

  const openGalary = async () => {
    try {
      let res = await ImagePicker.openPicker({
        path: 'my-file-path.jpg',
        width: 600,
        height: 600,
        cropping: true,
      });
      const compressedResult = await Compress.compress(`${res.path}`);
      SheetManager.hide('AddProfileImage-sheet', {
        payload: `${compressedResult}`,
      });
    } catch (err) {
      console.log('err in galary selection :', err);
    }
  };

  const openCamera = async () => {
    try {
      let res = await ImagePicker.openCamera({
        path: 'my-file-path.jpg',
        width: 600,
        height: 600,
        cropping: true,
      });
      const compressedResult = await Compress.compress(`${res.path}`);
      SheetManager.hide('AddProfileImage-sheet', {
        payload: `${compressedResult}`,
      });
    } catch (err) {
      console.log('err in camera :', err);
    }
  };

  return (
    <ActionSheet containerStyle={styles.actionSheet}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.option} onPress={openGalary}>
          <Typography
            fontWeight="400"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.textStyle}>
            {'Select from Galary'}
          </Typography>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.option} onPress={openCamera}>
          <Typography
            fontWeight="400"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.textStyle}>
            {'Click a Photo'}
          </Typography>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}

export default AddProfileImage;
