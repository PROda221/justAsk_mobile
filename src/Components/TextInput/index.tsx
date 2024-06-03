import React from 'react';
// Import {TextInput as RPTextInput} from 'react-native-paper';
import styled from 'styled-components/native';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Controller,
  FieldError,
  useForm,
  type UseFormReturn,
} from 'react-hook-form';
import {Typography} from '..';
import {type ViewStyle} from 'react-native';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {
  Username,
  Email,
  Lock,
  EyeOff,
  EyeOn,
  Search,
  Filter,
  ChatIcon,
} from '../../Assets/Images';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Functions/StyleScale';
import {RenderSvg} from '../RenderSvg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

type TextInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: UseFormReturn<any>['control'];
  name: string;
  label?: string;
  secureTextEntry: boolean;
  labelExists?: boolean;
  placeholder?: string;
  rules?: Record<string, unknown>;
  // Add any custom styles you want to accept as props
  viewStyle?: ViewStyle | ViewStyle[];
  multiline?: boolean;
  handleRightIconPress?: () => void;
  handleLeftIconPress?: () => void;
  leftIcon?: 'email' | 'lock' | 'chat' | 'search' | 'user' | 'gallary';
  rightIcon?: 'search' | 'chat';
};

const StyledTextInput = styled(RNTextInput)<{
  secure: boolean;
  rightIcon: boolean;
  contextStyle: unknown;
  error: FieldError | undefined;
}>`
  font-size: 15px;
  height: 65.52px;
  width: ${props => (props.secure || props.rightIcon ? '64%' : '82%')};
  border-radius: ${props =>
    props.secure || props.rightIcon ? 0 : '0 12.84px 12.84px 0'};
  font-family: 'Segoe UI';
  border-width: ${({error}) => (error ? '2px' : '0px')};
  border-left-width: 0px;
  border-right-width: ${({secure, error}) => (secure && error ? '0px' : '2px')};
  border-color: ${({error, contextStyle}) =>
    error ? contextStyle.errorBoundary : contextStyle.textInputBackgroundColor};
  background-color: ${({contextStyle}) =>
    contextStyle.textInputBackgroundColor};
  color: ${({contextStyle}) => contextStyle.textPrimaryColor};
`;

const Container = styled(View)`
  flex-direction: row;
`;

const LeftIconContainer = styled(TouchableOpacity)<{
  contextStyle: any;
  error: FieldError | undefined;
}>`
  justify-content: center;
  align-items: center;
  background-color: ${({contextStyle}) =>
    contextStyle.textInputBackgroundColor};
  height: 65.52px;
  width: 65.52px;
  border-radius: 12.84px 0 0 12.84px;
  border-width: ${({error}) => (error ? '2px' : '0px')};
  border-color: ${({error, contextStyle}) =>
    error ? contextStyle.errorBoundary : contextStyle.textInputBackgroundColor};
  border-right-width: 0px;
`;

const RightIconContainer = styled(TouchableOpacity)<{
  contextStyle: any;
  error: FieldError | undefined;
}>`
  justify-content: center;
  align-items: center;
  background-color: ${({contextStyle}) =>
    contextStyle.textInputBackgroundColor};
  height: 65.52px;
  width: 65.52px;
  border-radius: 0 12.84px 12.84px 0;
  border-width: ${({error}) => (error ? '2px' : '0px')};
  border-color: ${({error, contextStyle}) =>
    error ? contextStyle.errorBoundary : contextStyle.textInputBackgroundColor};
  border-left-width: 0px;
`;

const renderLeftIcon = (
  leftIcon: 'email' | 'lock' | 'chat' | 'search' | 'user' | 'gallary',
) => {
  switch (leftIcon) {
    case 'email':
      return <Email />;
    case 'lock':
      return <Lock />;
    case 'user':
      return <Username />;
    case 'search':
      return <Search />;
    case 'chat':
      return (
        <RenderSvg
          Icon={ChatIcon}
          height={verticalScale(25)}
          width={horizontalScale(25)}
        />
      );
    case 'gallary': 
       return <Entypo name='folder-images' size={moderateScale(25)} color={'white'}/>

    default:
      return null;
  }
};

const renderEye = (showPass: boolean | undefined) => {
  switch (showPass) {
    case true:
      return <EyeOn />;
    case false:
      return <EyeOff />;
    default:
      return <EyeOff />;
  }
};

const renderRightIcon = (rightIcon: 'search' | 'chat') => {
  switch (rightIcon) {
    case 'search':
      return (
        <RenderSvg
          Icon={Filter}
          height={verticalScale(45)}
          width={horizontalScale(45)}
        />
      );
    case 'chat':
      return (
        <AntDesign name="enter" size={moderateScale(25)} color={'white'} />
      );
    default:
      return <View />;
  }
};

export const TextInput = ({
  control,
  placeholder = '',
  name,
  secureTextEntry,
  rules = {},
  viewStyle = {},
  leftIcon = undefined,
  rightIcon = undefined,
  multiline = undefined,
  handleRightIconPress,
  handleLeftIconPress,
  ...props
}: TextInputProps & RNTextInputProps) => {
  const {colors} = useTheme();

  const handleOnFocus = () => {
    setValue(name, {...watchedValues, isFocussed: true});
  };

  const handleOnBlur = () => {
    setValue(name, {...watchedValues, isFocussed: false});
  };

  const handleHidePassword = () => {
    setValue(name, {...watchedValues, showPass: !watchedValues?.showPass});
  };

  const {setValue, watch} = useForm();

  const watchedValues = watch(name);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <Container>
            {leftIcon && (
              <LeftIconContainer
                style={viewStyle}
                error={error}
                disabled={!handleLeftIconPress}
                onPress={handleLeftIconPress}
                contextStyle={colors}>
                {renderLeftIcon(leftIcon)}
              </LeftIconContainer>
            )}
            <StyledTextInput
              {...props}
              keyboardType="numbers-and-punctuation"
              placeholder={watchedValues?.isFocussed ? '' : placeholder}
              placeholderTextColor={colors.textInputPlaceholderColor}
              style={viewStyle}
              contextStyle={colors}
              multiline={multiline}
              value={value as string}
              onChangeText={onChange}
              secure={secureTextEntry}
              rightIcon={Boolean(rightIcon)}
              secureTextEntry={Boolean(
                secureTextEntry &&
                  (!watchedValues?.showPass ||
                    typeof watchedValues?.showPass === 'undefined'),
              )}
              error={error}
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
            />
            {secureTextEntry && (
              <RightIconContainer
                style={viewStyle}
                error={error}
                contextStyle={colors}
                activeOpacity={1}
                onPress={handleHidePassword}>
                {leftIcon === 'search'
                  ? renderRightIcon(leftIcon)
                  : renderEye(watchedValues?.showPass)}
              </RightIconContainer>
            )}
            {rightIcon && (
              <RightIconContainer
                style={viewStyle}
                error={error}
                contextStyle={colors}
                activeOpacity={1}
                onPress={handleRightIconPress}>
                {renderRightIcon(rightIcon)}
              </RightIconContainer>
            )}
          </Container>
          {error && (
            <Typography
              bgColor={colors.errorTextSecondary}
              size="medium"
              fontWeight="400"
              textStyle={styles.errorStyle}>
              {error?.message}
            </Typography>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  errorStyle: {
    paddingLeft: horizontalScale(5),
    textAlign: 'left',
  },
});
