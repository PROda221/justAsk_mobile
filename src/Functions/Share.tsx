import {Alert, Share} from 'react-native';
import content from '../Assets/Languages/english.json';

export const onShare = async () => {
  try {
    const result = await Share.share({
      title: content.SettingsScreen.shareTitle,
      message: content.SettingsScreen.shareMsg,
      url: content.SettingsScreen.shareUrl,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};
