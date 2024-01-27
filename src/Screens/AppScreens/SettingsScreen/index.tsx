import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Typography} from '../../../Components/Typography';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../DesignTokens/Colors';
import {type SettingType} from '../../../Assets/Languages/englishTypes';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../Functions/StyleScale';
import {CustomButton, TextInput} from '../../../Components';
import {
  type BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {BottomSheetComponent} from './BottomSheetComponent';
import {type SubmitHandler, useForm} from 'react-hook-form';

import content from '../../../Assets/Languages/english.json';

type FormData = {
  username: string;
  password: string;
};

const AccountScreen = (): JSX.Element => {
  const settingScreenContent: SettingType = content.SettingScreen;

  const navigation = useNavigation();
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const {control, handleSubmit} = useForm<FormData>();
  const snapPoints = useMemo(() => ['60%'], []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    setIsSheetOpen(index !== -1);
  }, []);
  const handleBackPress = () => {
    navigation.navigate('Home Screen');
  };

  const onSubmit: SubmitHandler<FormData> = data => {
    // eslint-disable-next-line no-console, no-restricted-syntax
    console.log('data is :', data);
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={[
            styles.container,
            {backgroundColor: isSheetOpen ? colors.grey : colors.white},
          ]}>
          <View style={styles.header}>
            <View style={styles.innerHeader}>
              <TouchableOpacity onPress={handleBackPress}>
                <MaterialIcons
                  name={'chevron-left'}
                  size={25}
                  color={colors.drawerFontColor}
                />
              </TouchableOpacity>
              <Typography
                bgColor={colors.drawerFontColor}
                type={'titleSmall'}
                size={'large'}
                fontWeight="600">
                {settingScreenContent.loginAccount}
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

          <View style={styles.welcomeText}>
            <Typography
              bgColor={colors.drawerFontColor}
              type={'titleMedium'}
              size={'medium'}
              fontWeight={'400'}>
              {settingScreenContent.welcomeToLondonSchool}
            </Typography>
          </View>

          <TextInput
            control={control}
            name={'username'}
            label={settingScreenContent.username}
            secureTextEntry={false}
            rules={{required: 'Username required'}}
          />

          <TextInput
            control={control}
            name={'password'}
            label={settingScreenContent.password}
            secureTextEntry={true}
            rules={{required: 'Password required'}}
          />

          <View style={styles.buttonView}>
            <CustomButton
              onPress={handleSubmit(onSubmit)}
              label={settingScreenContent.login}
              variant={'typeA'}
            />
            <CustomButton
              onPress={handlePresentModalPress}
              label={settingScreenContent.forgotPassword}
              variant={'typeB'}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: verticalScale(16),
  },

  container: {
    flex: 1,
  },

  header: {
    alignItems: 'center',
    borderBottomWidth: moderateScale(1),
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
  },

  innerHeader: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  welcomeText: {
    alignItems: 'center',
    marginVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
  },
});

export default AccountScreen;
