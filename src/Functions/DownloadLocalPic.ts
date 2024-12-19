import ReactNativeBlobUtil from 'react-native-blob-util';
import {baseURL, storageBucketUrl} from '../Constants';

export const downloadImg = async (imgUrl: string, prevImg?: string) => {
  try {
    let downloadedPic: string | null;
    downloadedPic = await downloadImageToLocal(imgUrl ?? '', prevImg);

    let computedImg = {uri: `file://${downloadedPic}`};
    return computedImg.uri;
  } catch (err) {
    console.log('err in fetchProfilePic :', err);
  }
};

export const removeFirebaseUrl = (filePath: string = '', baseUrl: string): string => {
  // Remove the base URL from the filePath
  const updatedPath = filePath.replace(baseUrl, '');
  return updatedPath;
};

const DOWNLOAD_DIR = ReactNativeBlobUtil.fs.dirs.DownloadDir;
export const downloadImageToLocal = async (
  url: string,
  image?: string,
  gotBlockedStatus: boolean = false,
) => {
  try {
    if (!url) {
      return '';
    }
    const {fs} = ReactNativeBlobUtil;
    // Generate a unique filename based on the URL
    let computedUrl = gotBlockedStatus ? `${baseURL}/ProfilePic.png` : url;

    const path = `${DOWNLOAD_DIR}/${computedUrl}`;

    const filePath = removeFirebaseUrl(path, storageBucketUrl);

    // Check if the file already exists
    const fileExists = await fs.exists(filePath);

    if (fileExists) {
      return filePath;
    } else {
      if (image) {
        console.log('image to delete :', image);
        await fs.unlink(image);
      }
      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: filePath,
      }).fetch('GET', `${computedUrl}`);
      return response.path();
    }
  } catch (error) {
    console.error('Error downloading image:', error);
    return null;
  }
};
