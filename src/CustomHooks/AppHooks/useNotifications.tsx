import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {Alert} from 'react-native';
import {sendDeviceToken} from '../../Redux/Slices/NotificationsSlice';
import {useDispatch} from 'react-redux';

export const useNotifications = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    if (Platform.OS == 'ios') {
      requestUserPermissionIos();
    } else {
      requestUserPermissionsAndroid();
    }
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    return fcmToken;
  };

  const requestUserPermissionIos = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const requestUserPermissionsAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let fcmToken = await getToken();
        dispatch(sendDeviceToken({deviceToken: fcmToken}));
      } else {
        console.log('Notifications permission denied');
      }
    } catch (err) {
      console.log('error getting notifications :', err);
    }
  };
};
