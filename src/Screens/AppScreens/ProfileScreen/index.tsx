import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {getUserProfileStyles} from './styles';
import {Typography} from '../../../Components';
import {SheetManager} from 'react-native-actions-sheet';
import {baseURL} from '../../../Constants';
import {useSelector} from 'react-redux';
import {RootState} from '../../../Redux/rootReducers';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {_RawRecord} from '@nozbe/watermelondb/RawRecord';
import {formatTimestamp} from '../../../Functions/FormatTime';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {withObservables} from '@nozbe/watermelondb/react';
import database from '../../../DB/database';
import {Model} from '@nozbe/watermelondb';
import {ImageColorsResult, getColors} from 'react-native-image-colors';

type UserProfileProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const UserProfile = ({navigation, route}: UserProfileProps) => {
  const [backgroundColor, setBackgroundColor] =
    useState<ImageColorsResult>('#228B22');
  const {image, username, status, skills} = route.params;

  useEffect(() => {
    console.log('params: ', route.params);
    getColors(`${baseURL}/${image}`, {
      fallback: '#228B22',
      cache: true,
      key: `${baseURL}/${image}`,
    }).then(setBackgroundColor);
  }, []);

  useEffect(() => {
    console.log('backgroundColor is :', backgroundColor)
  }, [backgroundColor])

  const {colors} = useTheme();
  const styles = getUserProfileStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{uri: `${baseURL}/${image}?${new Date()}`}}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.jobTitle}>{status}</Text>
        <Text style={styles.location}>Lagos, Nigeria</Text>
        {/* <View style={styles.statsContainer}>
          <Text style={styles.stat}>122 followers</Text>
          <Text style={styles.stat}>67 following</Text>
          <Text style={styles.stat}>37K likes</Text>
        </View> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Block</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Give Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
