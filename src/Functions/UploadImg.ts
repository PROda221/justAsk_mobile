import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

export const uploadImages = async (
  uris: string[],
  updateProgress: (progress: number) => void
): Promise<string[]> => {
  let totalBytesTransferred = 0;
  let totalBytes = 0;

  // Helper function to upload a single image
  const uploadSingleImage = async (uri: string, index: number): Promise<string> => {
    const originalName = uri.substring(uri.lastIndexOf('/') + 1);
    const filename = `chat_img_${index}_${originalName}`;
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const task = storage().ref(filename).putFile(uploadUri);

    return new Promise<string>((resolve, reject) => {
      let lastBytesTransferred = 0;

      task.on(
        'state_changed',
        taskSnapshot => {
          const { bytesTransferred, totalBytes: taskTotalBytes } = taskSnapshot;

          // Ensure totalBytes is only calculated once
          if (!totalBytes) totalBytes = uris.length * taskTotalBytes;

          // Update totalBytesTransferred by subtracting the last bytes transferred
          totalBytesTransferred += bytesTransferred - lastBytesTransferred;
          lastBytesTransferred = bytesTransferred;

          // Calculate and report overall progress
          const progress = totalBytesTransferred / totalBytes;
          updateProgress(progress);
        },
        reject, // Handle error
        async () => {
          try {
            const url = await storage().ref(filename).getDownloadURL();
            resolve(url);
          } catch (e) {
            reject(e);
          }
        }
      );
    });
  };

  // Upload all images in parallel and return their URLs
  try {
    const uploadPromises = uris.map((uri, index) => uploadSingleImage(uri, index));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error during bulk upload:', error);
    return [];
  }
};
