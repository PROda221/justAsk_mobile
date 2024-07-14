import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

export const uploadImage = async (uri: string) => {
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

  const task = storage().ref(filename).putFile(uploadUri);

  try {
    task.on('state_changed', taskSnapshot => {
      console.log(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100)
    });
    await task;
    const url = await storage().ref(filename).getDownloadURL();
    return url
  } catch (e) {
    console.error('error uploading :', e);
  }
};