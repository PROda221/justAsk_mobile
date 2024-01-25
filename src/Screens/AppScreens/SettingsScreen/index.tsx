import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Typography} from '../../../Components/Typography';
import {useNavigation} from '@react-navigation/native';

const AccountScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.navigate('Home Screen');
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={handleBackPress}>
              <MaterialIcons name={'chevron-left'} size={25} color="black" />
            </TouchableOpacity>
            <Typography
              bgColor={'black'}
              type={'displayLarge'}
              size={'large'}
              fontWeight="600">
              {`Login Into your Account`}
            </Typography>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1},
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
});

export default AccountScreen;
