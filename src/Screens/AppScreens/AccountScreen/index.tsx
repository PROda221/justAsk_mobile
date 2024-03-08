import {View, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {type RootState} from '../../../Redux/rootReducers';
import {callTokenGenerator, resetLoginResponse, setAccessToken} from '../../../Redux/Slices/LoginSlice';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type ParamListBase} from '@react-navigation/native';

type FormData = {
  username: string;
  password: string;
};

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase, 'Account'>;
};

const AccountScreen = ({navigation}: Props): JSX.Element => {
  const settingScreenContent: AccountType = content.SettingScreen;

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const {control, handleSubmit} = useForm<FormData>();
  const snapPoints = useMemo(() => ['65%'], []);

  const dispatch = useDispatch();
  const loginSlice = useSelector((state: RootState) => state.loginSlice);

  useEffect(() => {
    if (loginSlice.success) {
      dispatch(setAccessToken(loginSlice.success.document.access_token))
      dispatch(resetLoginResponse())
      navigation.navigate('Home Screen');
    }
  }, [loginSlice.success]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    setIsSheetOpen(index !== -1);
  }, []);

  const onSubmit: SubmitHandler<FormData> = data => {
    dispatch(callTokenGenerator(data));
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
            {loginSlice.error ? (
              <Typography bgColor="red" size="medium" fontWeight="400">
                {loginSlice.error.message}
              </Typography>
            ) : null}
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
