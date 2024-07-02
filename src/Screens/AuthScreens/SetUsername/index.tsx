import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, TextInput, Typography} from '../../../Components';
import styled from 'styled-components';
import {
  type SetUsernameScreenStyles,
  getSetUsernameScreenStyles,
} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {type FieldValues, type SubmitHandler, useForm} from 'react-hook-form';
import {type RouteProp, type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {type DarkColors} from '../../../useContexts/Theme/ThemeType';
import content from '../../../Assets/Languages/english.json';
import ErrorBox from '../../../Components/ErrorBox';
import {useCheckUsername} from '../../../CustomHooks/AuthHooks/useCheckUsername';

type Params = {
  params: {
    emailId: string;
    uid: string;
  };
};

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<Params, 'params'>;
};

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: SetUsernameScreenStyles;
  colors: DarkColors;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {content.SetUsernameScreen.title1}
    </Typography>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.subTitle}>
      {content.SetUsernameScreen.title2}
    </Typography>
  </>
);

const SetUsername = ({navigation, route}: Props): JSX.Element => {
  const {control, handleSubmit} = useForm();

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();
  const {
    callCheckUsernameApi,
    checkUsernameError,
    checkUsernameLoading,
    resetCheckUsernameReducer,
  } = useCheckUsername(navigation, 'Select Genres');

  const styles = getSetUsernameScreenStyles(colors);

  const handleNextButton: SubmitHandler<FieldValues> = (data: FieldValues) => {
    const fullData = {
      username: data.username as string,
      password: route.params.uid,
      emailId: route.params.emailId,
    };
    resetCheckUsernameReducer();
    callCheckUsernameApi(fullData);
  };

  const renderForm = () => (
    <>
      <TextInput
        name="username"
        secureTextEntry={false}
        control={control}
        label="Enter Username"
        placeholder={`${content.SetUsernameScreen.enterUsername}`}
        leftIcon="user"
        rules={{
          required: content.SetUsernameScreen.usernameMissing,
        }}
      />
      {checkUsernameError && (
        <ErrorBox title="Error" message={checkUsernameError.message} />
      )}
      <View style={styles.buttonContainer}>
        <CustomButton
          loading={checkUsernameLoading}
          onPress={handleSubmit(handleNextButton)}
          label={`${content.SetUsernameScreen.nextButton}`}
          radius={14}
        />
      </View>
    </>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Animated.View
          entering={FadeInUp.duration(1000)}
          style={styles.mainContainer}>
          <Header onPress={resetCheckUsernameReducer} />
          <Scroll>
            <View style={styles.titleContainer}>
              <RenderTitle styles={styles} colors={colors} />
            </View>
            <View style={styles.formContainer}>{renderForm()}</View>
          </Scroll>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SetUsername;
