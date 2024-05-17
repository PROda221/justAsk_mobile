import * as Keychain from 'react-native-keychain';

/**
 * Stores an access token in the keychain.
 * @param token The access token to store.
 */
export const storeAccessToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword('accessToken', token);
    console.log('Access token stored successfully');
  } catch (error) {
    console.error('Could not store access token', error);
  }
};

/**
 * Retrieves the access token from the keychain.
 * @returns The access token if it exists, or null if it does not.
 */
export const retrieveAccessToken = async (): Promise<string | null> => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('Access token retrieved successfully');
        return credentials.password;
      }
 
        console.log('No access token found');
        return null;
      
    } catch (error) {
      console.error('Could not retrieve access token', error);
      return null;
    }
  };