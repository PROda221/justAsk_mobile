import React, {useState} from 'react';
import {TextInput as RPTextInput} from 'react-native-paper';
import styled from 'styled-components/native';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from '../../Functions/StyleScale';
import {Controller, type UseFormReturn} from 'react-hook-form';
import {Typography} from '..';
import { type ViewStyle} from 'react-native';
import { colors } from '../../DesignTokens/Colors';

type TextInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: UseFormReturn<any>['control'];
  name: string;
  label?: string;
  secureTextEntry: boolean;
  labelExists?: boolean;
  placeholder?: string;
  rules: Record<string, unknown>;
    // Add any custom styles you want to accept as props
  viewStyle?:ViewStyle;
  multiline?:boolean
  
};

const StyledTextInput = styled(RPTextInput)`
  border-radius: 5px;
  font-size: 15px;
  font-family: 'Segoe UI';
`;

export const TextInput = ({
  control,
  labelExists=true,
  label="",
  placeholder="",
  name,
  secureTextEntry,
  rules = {},
  viewStyle={},
  multiline=false

}: TextInputProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);

  const toggleEye = () => {
    setShowPass(value => !value);
  };

  const labelProps = labelExists ? {label} : {placeholder}

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <View>
          <StyledTextInput
          placeholderTextColor={colors.black}
            style={[viewStyle, {backgroundColor: colors.white}]}
            multiline={multiline}
            mode="outlined"
            value={value as string}
            outlineStyle={styles.outlineStyle}
            outlineColor={error ? 'red' : 'gray'}
            activeOutlineColor={error ? 'red' : 'black'}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry && !showPass}
            right={
              secureTextEntry ? (
                showPass ? (
                  <RPTextInput.Icon icon="eye" onPress={toggleEye} />
                ) : (
                  <RPTextInput.Icon icon="eye-off" onPress={toggleEye} />
                )
              ) : null
            }
            {...labelProps}
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

const styles = StyleSheet.create({
  outlineStyle: {
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
  },
});
