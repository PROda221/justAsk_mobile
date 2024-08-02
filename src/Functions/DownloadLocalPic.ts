import ReactNativeBlobUtil from 'react-native-blob-util';
import { baseURL } from '../Constants';

const DOWNLOAD_DIR = ReactNativeBlobUtil.fs.dirs.DownloadDir;
export const downloadImage = async (url: string, image?: string, gotBlockedStatus: boolean = false) => {
  try {
    if(!url){
      return ''
    }
    const {fs} = ReactNativeBlobUtil;
    // Generate a unique filename based on the URL
    let computedUrl = gotBlockedStatus ? 'ProfilePic.png' : url
    const path = `${DOWNLOAD_DIR}/${computedUrl}`;

    // Check if the file already exists
    const fileExists = await fs.exists(path);

    if (fileExists) {
      return path;
    } else {
        if(image){
          console.log('image to delete :', image)
            await fs.unlink(image);
        }
      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: path,
      }).fetch('GET', `${baseURL}/${computedUrl}`);
      console.log('image downloaded :', path);
      return response.path();
    }
  } catch (error) {
    console.error('Error downloading image:', error);
    return null;
  }
};
