import {baseURL} from '../Constants';

export const getProfilePic = (profilePic: string | undefined) => {
  return `${baseURL}/${profilePic}`;
};
