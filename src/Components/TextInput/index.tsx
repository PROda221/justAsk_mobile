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
import ReplyMessageBar from '../ReplyMessageBar';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DarkColors} from '../../useContexts/Theme/ThemeType';
import {forwardMsgType} from '../../Screens/AppScreens/ChatScreen/types';

type TextInputProps = {
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
  leftIcon?: 'email' | 'lock' | 'chat' | 'search' | 'user' | 'block' | 'giphy';
  rightIcon?: 'search' | 'chat' | 'gallary';
  disable?: boolean;
  replyMessage?: forwardMsgType;
  setReplyMessage?: React.Dispatch<
    React.SetStateAction<forwardMsgType | undefined>
  >;
};

const ErrorView = styled(View)`
  flex-direction: row;
  padding-top: 10px;
`;

const StyledTextInput = styled(RNTextInput)<{
  secure: boolean;
  rightIcon: boolean;
  contextStyle: DarkColors;
  error: FieldError | undefined;
}>`
  flex: 1;
  font-size: 15px;
  min-height: 65.52px;
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
  replyMessage?: string;
}>`
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({contextStyle}) =>
    contextStyle.textInputBackgroundColor};
  border-radius: ${({replyMessage}) =>
    replyMessage ? '0 0 0 12.84px' : '12.84px 0 0 12.84px'};
  border-width: ${({error}) => (error ? '2px' : '0px')};
  border-color: ${({error, contextStyle}) =>
    error ? contextStyle.errorBoundary : contextStyle.textInputBackgroundColor};
  border-right-width: 0px;
`;

const RightIconContainer = styled(TouchableOpacity)<{
  contextStyle: any;
  error: FieldError | undefined;
  replyMessage?: string;
}>`
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${({contextStyle}) =>
    contextStyle.textInputBackgroundColor};
  border-radius: ${({replyMessage}) =>
    replyMessage ? '0 0 12.84px 0' : '0 12.84px 12.84px 0'};
  border-width: ${({error}) => (error ? '2px' : '0px')};
  border-color: ${({error, contextStyle}) =>
    error ? contextStyle.errorBoundary : contextStyle.textInputBackgroundColor};
  border-left-width: 0px;
`;

const SecureTextEntryContainer = styled(TouchableOpacity)<{
  contextStyle: any;
  error: FieldError | undefined;
}>`
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${({contextStyle}) =>
    contextStyle.textInputBackgroundColor};
  border-radius: 0 12.84px 12.84px 0;
  border-width: ${({error}) => (error ? '2px' : '0px')};
  border-color: ${({error, contextStyle}) =>
    error ? contextStyle.errorBoundary : contextStyle.textInputBackgroundColor};
  border-left-width: 0px;
`;

const renderLeftIcon = (
  leftIcon:
    | 'email'
    | 'lock'
    | 'chat'
    | 'search'
    | 'user'
    | 'gallary'
    | 'block'
    | 'giphy',
) => {
  switch (leftIcon) {
    case 'email':
      return (
        <RenderSvg
          Icon={Email}
          width={moderateScale(25)}
          height={moderateScale(25)}
        />
      );
    case 'lock':
      return (
        <RenderSvg
          Icon={Lock}
          width={moderateScale(20)}
          height={moderateScale(20)}
        />
      );
    case 'user':
      return (
        <RenderSvg
          Icon={Username}
          width={moderateScale(20)}
          height={moderateScale(20)}
        />
      );
    case 'search':
      return (
        <RenderSvg
          Icon={Search}
          width={moderateScale(20)}
          height={moderateScale(20)}
        />
      );
    case 'chat':
      return (
        <RenderSvg
          Icon={ChatIcon}
          height={verticalScale(20)}
          width={horizontalScale(20)}
        />
      );
    case 'giphy':
      return (
        <MaterialCommunityIcons
          name="sticker-emoji"
          size={moderateScale(25)}
          color={'white'}
        />
      );
    case 'gallary':
      return (
        <Entypo name="folder-images" size={moderateScale(25)} color={'white'} />
      );
    case 'block':
      return <Entypo name="block" size={moderateScale(25)} color={'white'} />;

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

const renderRightIcon = (rightIcon: 'search' | 'chat' | 'gallary') => {
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
      return <Ionicons name="send" size={moderateScale(25)} color={'white'} />;
    case 'gallary':
      return (
        <Entypo name="folder-images" size={moderateScale(25)} color={'white'} />
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
  disable,
  replyMessage,
  setReplyMessage,
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
        <View style={styles.mainContainer}>
          {replyMessage && (
            <ReplyMessageBar
              colors={colors}
              clearReply={setReplyMessage}
              forwardedMsg={replyMessage}
            />
          )}

          <Container>
            {leftIcon && (
              <LeftIconContainer
                style={viewStyle}
                error={error}
                disabled={!handleLeftIconPress}
                onPress={handleLeftIconPress}
                activeOpacity={1}
                replyMessage={replyMessage?.message}
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
              <SecureTextEntryContainer
                style={viewStyle}
                error={error}
                contextStyle={colors}
                activeOpacity={1}
                onPress={handleHidePassword}>
                {leftIcon === 'search'
                  ? renderRightIcon(leftIcon)
                  : renderEye(watchedValues?.showPass)}
              </SecureTextEntryContainer>
            )}
            {rightIcon && (
              <RightIconContainer
                style={viewStyle}
                error={error}
                contextStyle={colors}
                activeOpacity={1}
                replyMessage={replyMessage?.message}
                onPress={handleRightIconPress}>
                {renderRightIcon(rightIcon)}
              </RightIconContainer>
            )}
          </Container>
          {error && (
            <ErrorView>
              <Icon
                name="info-outline"
                size={moderateScale(20)}
                color={colors.errorTextSecondary}
              />
              <Typography
                bgColor={colors.errorTextSecondary}
                size="medium"
                fontWeight="400"
                textStyle={styles.errorStyle}>
                {error?.message}
              </Typography>
            </ErrorView>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  errorStyle: {
    paddingLeft: horizontalScale(5),
    textAlign: 'left',
  },
});
