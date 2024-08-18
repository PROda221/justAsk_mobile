import { Alert } from "react-native";
import ReactNativeBlobUtil from "react-native-blob-util";

const DOWNLOAD_DIR = ReactNativeBlobUtil.fs.dirs.DownloadDir;

export const saveURLImage = async (url: string) => {
  const date = new Date();
  const filename = `image_${Math.floor(date.getTime() + date.getSeconds() / 2)}.jpg`;
  const imagePath = `${DOWNLOAD_DIR}/${filename}`;
  
  try {
    const res = await ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'jpg',
      path: imagePath,
    }).fetch('GET', url);
    
    return res.path();
  } catch (error) {
    console.error('Error saving image:', error);
    Alert.alert('Error', 'Failed to save the image.');
    return null;
  }
};