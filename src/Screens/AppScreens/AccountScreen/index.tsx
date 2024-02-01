import {View, StyleSheet} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Typography} from '../../../Components/Typography';
import {colors} from '../../../DesignTokens/Colors';
import {type AccountType} from '../../../Assets/Languages/englishTypes';
import {verticalScale, moderateScale} from '../../../Functions/StyleScale';
import {CustomButton, TextInput} from '../../../Components';
import {
  type BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {BottomSheetComponent} from './BottomSheetComponent';
import {type SubmitHandler, useForm} from 'react-hook-form';

import content from '../../../Assets/Languages/english.json';
import Header from '../../../Components/Header';

type FormData = {
  username: string;
  password: string;
};

const AccountScreen = (): JSX.Element => {
  const settingScreenContent: AccountType = content.SettingScreen;

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const {control, handleSubmit} = useForm<FormData>();
  const snapPoints = useMemo(() => ['65%'], []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    setIsSheetOpen(index !== -1);
  }, []);

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log('data is :', data);
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Header title={settingScreenContent.loginIntoYourAccount} />
          <View
            style={[styles.container, {paddingHorizontal: moderateScale(16)}]}>
            <BottomSheetComponent
              isSheetOpen={isSheetOpen}
              bottomSheetModalRef={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              handleSheetChanges={handleSheetChanges}
              handlePresentModalPress={handlePresentModalPress}
            />

            <View style={styles.welcomeText}>
              <Typography
                bgColor={colors.drawerFontColor}
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
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(16),
  },

  container: {
    flex: 1,
  },

  welcomeText: {
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
});

export default AccountScreen;
