import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Typography} from '../../../Components/Typography';
import {useNavigation} from '@react-navigation/native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../Functions/StyleScale';
import {CustomButton} from '../../../Components';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {BottomSheetComponent} from './BottomSheetComponent';

const AccountScreen = (): JSX.Element => {
  const navigation = useNavigation();

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const snapPoints = useMemo(() => ['60%'], []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    setIsSheetOpen(index !== -1);
  }, []);
  const handleBackPress = () => {
    navigation.navigate('Home Screen');
  };
  useEffect(() => {
    console.log('isSheetOpen', isSheetOpen);
  }, [isSheetOpen]);

  return (
    <BottomSheetModalProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={[
            styles.container,
            {backgroundColor: isSheetOpen ? 'grey' : 'white'},
          ]}>
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
                type={'titleSmall'}
                size={'large'}
                fontWeight="600"
                style={styles.textStyle}>
                {`Login Into your Account`}
              </Typography>
            </View>
          </View>
          <BottomSheetComponent
            isSheetOpen={isSheetOpen}
            setIsSheetOpen={setIsSheetOpen}
            bottomSheetModalRef={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            handleSheetChanges={handleSheetChanges}
            handlePresentModalPress={handlePresentModalPress}
          />

          <View
            style={{
              marginVertical: verticalScale(16),
              alignItems: 'center',
            }}>
            <Typography
              bgColor={'#000000'}
              type={'titleMedium'}
              size={'medium'}
              fontWeight={'400'}>
              {` Welcome to the London School of Trends. Please login to your account.`}
            </Typography>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: verticalScale(16),
              justifyContent: 'space-evenly',
            }}>
            <CustomButton
              onPress={() => console.log('hello')}
              label={'LOGIN'}
              variant={'typeA'}
            />
            <CustomButton
              onPress={handlePresentModalPress}
              label={'FORGOT PASSWORD'}
              variant={'typeB'}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1},
  header: {
    alignItems: 'center',
    borderBottomWidth: moderateScale(1),
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },

  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

  textStyle: {
    textAlign: 'right',
  },
});

export default AccountScreen;
