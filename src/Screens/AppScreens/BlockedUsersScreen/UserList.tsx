import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../../../Components';
import {Image} from 'expo-image';
import {BlockedUsersScreenStyles} from './styles';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';
import {formatTimestamp} from '../../../Functions/FormatTime';
import {Moment} from 'moment';
import {baseURL} from '../../../Constants';

type PropsType = {
  name: string;
  updateStatus: Moment;
  image: string;
  styles: BlockedUsersScreenStyles;
  colors: DarkColors;
  selectedUsers: any;
  toggleSelection: (id: string) => void;
};

const UserList = ({
  name,
  updateStatus,
  image,
  styles,
  colors,
  selectedUsers,
  toggleSelection,
}: PropsType) => {
  const isSelected = selectedUsers.has(name);
  return (
    <TouchableOpacity
      onPress={() => toggleSelection(name)}
      style={[styles.card, isSelected && styles.selectedItem]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: `${baseURL}/${image}`}} style={styles.image} />
      </View>
      <View style={styles.info}>
        <Typography
          bgColor={
            isSelected
              ? colors.textPrimarySelectedColor
              : colors.textPrimaryColor
          }
          fontWeight="400"
          textStyle={styles.username}>
          {name}
        </Typography>
        <Typography
          bgColor={
            isSelected
              ? colors.textPrimarySelectedColor
              : colors.cardUserStatusStyle
          }
          fontWeight="400"
          textStyle={styles.status}>
          {formatTimestamp(updateStatus)}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

export default UserList;
