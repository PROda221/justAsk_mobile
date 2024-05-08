import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Typography} from '../../../Components';
import styled from 'styled-components';
import {
  moderateScale,
} from '../../../Functions/StyleScale';
import {CustomButton, TextInput} from '../../../Components';
import {type SubmitHandler, useForm} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Checkbox} from 'react-native-paper'; // Import Checkbox from react-native-paper
import { useTheme } from '../../../useContexts/Theme/ThemeContext';
import { getLoginStyles } from './styles';
// import  {loginImage}  from '../../../Assets/Images';

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = (): JSX.Element => {
  const {colors} = useTheme()
  const {control, handleSubmit} = useForm<FormData>();
  const [agreed, setAgreed] = useState<boolean>(false); // State for checkbox

  const styles = getLoginStyles(colors)

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
    padding: 0 12px 0 12px;
  `;

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log({data});
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Scroll>
          {/* <loginImage width={horizontalScale(72)} height={verticalScale(72)} /> */}
          <View style={styles.welcomeText}>
            <Typography
              bgColor={colors.white}
              size={'large'}
              textStyle={styles.header}
              fontWeight={'800'}>
              {'Login'}
            </Typography>
          </View>

          <TextInput
            control={control}
            name={'email'}
            label={'Email'}
            secureTextEntry={false}
            viewStyle={styles.input}
            rules={{required: 'Username required'}}
            leftIcon={
              <Ionicons
                name="logo-facebook"
                size={moderateScale(28)}
                color={colors.black}
              />
            }
          />

          <TextInput
            control={control}
            name={'password'}
            label={'Password'}
            secureTextEntry={true}
            viewStyle={styles.input}
            rules={{required: 'Password required'}}
            leftIcon={
              <Ionicons
                name="logo-facebook"
                size={moderateScale(28)}
                color={colors.black}
              />
            }
          />
        </Scroll>
        <View style={styles.terms}>
          <Checkbox.Item
            label="" // Set label to null to avoid duplication
            status={agreed ? 'checked' : 'unchecked'}
            onPress={() => {
              setAgreed((value: boolean) => !value);
            }}
            color={colors.white} // Adjust color as needed
          />
          <Text style={styles.text}>
            {'I agree to all terms and conditions'}
          </Text>
        </View>

        <View style={styles.buttonView}>
          <CustomButton
            onPress={handleSubmit(onSubmit)}
            label={'SIGN UP'}
            variant={'typeB'}
            viewStyle={styles.signUpButton}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.line} />
          <Text style={styles.text}>{`OR Connect with`}</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Ionicons
              name="logo-facebook"
              size={moderateScale(28)}
              color={colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons
              name="logo-google"
              size={moderateScale(28)}
              color={colors.black}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons
              name="logo-apple"
              size={moderateScale(28)}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>
            {`Already have an Account?`}
            <Text
              style={styles.login}
              onPress={() => {
                console.log('login pressed');
              }}>
              {` Login`}
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


export default LoginScreen;
