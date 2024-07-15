import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

export const uploadImage = async (uri: string, currentProgress: (progress: number) => void) => {
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

  const task = storage().ref(filename).putFile(uploadUri);

  try {
    task.on('state_changed', taskSnapshot => {
      currentProgress(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes)
    });
    await task;
    const url = await storage().ref(filename).getDownloadURL();
    return url
  } catch (e) {
    console.error('error uploading :', e);
  }
};