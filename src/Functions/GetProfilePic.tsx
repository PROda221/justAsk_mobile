import {baseURL} from '../Constants';
import {ProfilePic} from '../Assets/Images/index';
import {Image} from 'react-native';

const DEFAULT_IMAGE = Image.resolveAssetSource(ProfilePic).uri;

export const getProfilePic = (profilePic: string | undefined) => {
  if (profilePic) {
    return `${baseURL}/${profilePic}?${new Date().getTime()}`;
  }

  return DEFAULT_IMAGE;
};
