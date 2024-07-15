import {baseURL} from '../Constants';
import {ProfilePic} from '../Assets/Images/index';
import {Image} from 'react-native';

export const DEFAULT_IMAGE = Image.resolveAssetSource(ProfilePic).uri;

export const getProfilePic = (profilePic: string | undefined) => {
  if (profilePic) {
    return encodeURI(`${baseURL}/${profilePic}?time=${new Date()}`);
  }
  return DEFAULT_IMAGE;
};
