import React, {useState} from 'react';
import {TextInput as RPTextInput} from 'react-native-paper';
import styled from 'styled-components/native';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from '../../Functions/StyleScale';
import {Controller, type UseFormReturn} from 'react-hook-form';
import {Typography} from '..';

type TextInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: UseFormReturn<any>['control'];
  name: string;
  label: string;
  secureTextEntry: boolean;
  rules: Record<string, unknown>;
};

const StyledTextInput = styled(RPTextInput)`
  border-radius: 5px;
  font-size: 15px;
  font-family: 'Segoe UI';
`;

export const TextInput = ({
  control,
  label,
  name,
  secureTextEntry,
  rules = {},
}: TextInputProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);

  const toggleEye = () => {
    setShowPass(value => !value);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <View>
          <StyledTextInput
            mode="outlined"
            value={value as string}
            outlineStyle={styles.outlineStyle}
            outlineColor={error ? 'red' : 'gray'}
            activeOutlineColor={error ? 'red' : 'black'}
            label={label}
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
