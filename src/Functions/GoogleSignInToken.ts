import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';

export const googleSignInToken = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const token = await auth().currentUser?.getIdToken();
      return token;
    //   callGoogleLoginApi({idToken: token ?? ''});
    } catch (error) {
      if (error.code === 'SIGN_IN_CANCELLED') {
        console.log('a');
        // User cancelled the login flow
      } else if (error.code === 'IN_PROGRESS') {
        console.log('b');
        // Operation (e.g. sign in) is in progress already
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        console.log('c');
        // Play services not available or outdated
      } else {
        console.log('d', error);
        // Some other error happened
      }
    }
  };