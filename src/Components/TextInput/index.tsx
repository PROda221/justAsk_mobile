import React, {useState} from 'react';
// Import {TextInput as RPTextInput} from 'react-native-paper';
import styled from 'styled-components/native';
import {View, TextInput as RPTextInput} from 'react-native';
import {Controller, useForm, type UseFormReturn} from 'react-hook-form';
import {Typography} from '..';
import {type ViewStyle} from 'react-native';
import { useTheme } from '../../useContexts/Theme/ThemeContext';
import { moderateScale } from '../../Functions/StyleScale';

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
  leftIcon?: React.ReactNode;
};

const StyledTextInput = styled(RPTextInput)`
  border-radius: 15px;
  font-size: 15px;
  font-family: 'Segoe UI';
`;

export const TextInput = ({
  control,
  labelExists = true,
  label = '',
  placeholder = '',
  name,
  secureTextEntry,
  rules = {},
  viewStyle = {},
  multiline = false,
  leftIcon = '',
}: TextInputProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const {colors} = useTheme()

  const toggleEye = () => {
    setShowPass(value => !value);
  };

  const handleOnFocus = () => {
    setValue(name, {isFocussed: true})
  }

  const handleOnBlur = () => {
    setValue(name, {isFocussed: false})
  }

  const { setValue, watch} = useForm();

  const watchedValues = watch(name);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <View>
          <RPTextInput
            placeholder={watchedValues?.isFocussed ? '' : placeholder}
            placeholderTextColor={colors.textInputPlaceholderColor}
            style={[viewStyle, {opacity: watchedValues?.isFocussed ? 1 : 0.8}]}
            multiline
            value={value as string}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry && !showPass}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            // Right={
            //   secureTextEntry ? (
            //     showPass ? (
            //       <RPTextInput.Icon icon="eye" onPress={toggleEye} />
            //     ) : (
            //       <RPTextInput.Icon icon="eye-off" onPress={toggleEye} />
            //     )
            //   ) : null
            // }
            // {...labelProps}
            // left={leftIcon ? leftIcon : null}
          />
          {error && (
            <Typography bgColor="red" size="medium" fontWeight="400">
              {error?.message}
            </Typography>
          )}
        </View>
      )}
    />
  );
};

