import ReactNativeBlobUtil from 'react-native-blob-util';
import { baseURL } from '../Constants';

const DOWNLOAD_DIR = ReactNativeBlobUtil.fs.dirs.DownloadDir;
export const downloadImage = async (url: string, image?: string) => {
  try {
    if(!url){
      return ''
    }
    const {fs} = ReactNativeBlobUtil;
    // Generate a unique filename based on the URL
    const path = `${DOWNLOAD_DIR}/${url}`;

    // Check if the file already exists
    const fileExists = await fs.exists(path);

    if (fileExists) {
      return path;
    } else {
        if(image){
          console.log('image to delete :', image)
          console.log('new url to download :', url)
            await fs.unlink(image);
        }
      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: path,
      }).fetch('GET', `${baseURL}/${url}`);
      console.log('image downloaded :', path);
      return response.path();
    }
  } catch (error) {
    console.error('Error downloading image:', error);
    return null;
  }
};
