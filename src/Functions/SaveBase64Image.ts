import { Alert } from "react-native";
import ReactNativeBlobUtil from "react-native-blob-util";

const DOWNLOAD_DIR = ReactNativeBlobUtil.fs.dirs.DownloadDir;

export const saveURLImage = async (url: string): Promise<string | null> => {
  const date = new Date();
  const uniqueSuffix = `${date.getTime()}-${Math.random().toString(36).substring(2, 8)}`;
  const filename = `image_${uniqueSuffix}.jpg`;
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
    Alert.alert('Error', `Failed to save the image from URL: ${url}`);
    return null;
  }
};
