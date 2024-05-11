import React, {useEffect} from 'react';
// Import {TextInput as RPTextInput} from 'react-native-paper';
import styled from 'styled-components/native';
import {View, TextInput as RPTextInput, TouchableOpacity} from 'react-native';
import {Controller, useForm, type UseFormReturn} from 'react-hook-form';
import {Typography} from '..';
import {type ViewStyle} from 'react-native';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {Username, Email, Lock, EyeOff, EyeOn} from '../../Assets/Images';

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
  viewStyle?: ViewStyle;
  multiline?: boolean;
  leftIcon?: 'email' | 'lock' | 'phone' | 'search' | 'user';
};

const StyledTextInput = styled(RPTextInput)<{secure: boolean, contextStyle: any}>`
  font-size: 15px;
  height: 65.52px;
  width: ${(props) => props.secure ? '64%' : '82%'};
  border-radius: ${(props) => props.secure ? 0 : '0 12.84px 12.84px 0'};
  font-family: 'Segoe UI';
  background-color: ${({contextStyle})=>contextStyle.textInputBackgroundColor};
`;

const Container = styled(View)`
  flex-direction: row;
`;

const LeftIconContainer = styled(View)<{contextStyle: any}>`
  justify-content: center;
  align-items: center;
  background-color: ${({contextStyle})=>contextStyle.textInputBackgroundColor};
  height: 65.52px;
  width: 65.52px;
  border-radius: 12.84px 0 0 12.84px;
`;

const RightIconContainer = styled(TouchableOpacity)<{contextStyle: any}>`
  justify-content: center;
  align-items: center;
  background-color: ${({contextStyle})=>contextStyle.textInputBackgroundColor};
  height: 65.52px;
  width: 65.52px;
  border-radius: 0 12.84px 12.84px 0;
`;

const renderLeftIcon = (
  leftIcon: 'email' | 'lock' | 'phone' | 'search' | 'user',
) => {
  switch (leftIcon) {
    case 'email':
      return <Email />;
    case 'lock':
      return <Lock />;
    case 'user':
      return <Username />;
    default:
      return null;
  }
};

const renderRightIcon = (showPass: boolean | undefined) => {
  switch (showPass) {
    case false:
      return <EyeOff />;
    case true:
      return <EyeOn />;
    default:
      return null;
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
}: TextInputProps) => {
  const {colors} = useTheme();

  useEffect(() => {
    if (secureTextEntry) {
      setValue(name, {...watchedValues, showPass: false});
    }
  }, []);

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
        <Container>
          {leftIcon && (
            <LeftIconContainer contextStyle={colors}>{renderLeftIcon(leftIcon)}</LeftIconContainer>
          )}
          <StyledTextInput
            placeholder={watchedValues?.isFocussed ? '' : placeholder}
            placeholderTextColor={colors.textInputPlaceholderColor}
            style={viewStyle}
            contextStyle={colors}
            multiline
            value={value as string}
            onChangeText={onChange}
            secure={secureTextEntry}
            secureTextEntry={secureTextEntry && watchedValues?.showPass}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
          />
          {secureTextEntry && (
            <RightIconContainer contextStyle={colors} activeOpacity={1} onPress={handleHidePassword}>
              {renderRightIcon(watchedValues?.showPass)}
            </RightIconContainer>
          )}
          {error && (
            <Typography bgColor="red" size="medium" fontWeight="400">
              {error?.message}
            </Typography>
          )}
        </Container>
      )}
    />
  );
};
