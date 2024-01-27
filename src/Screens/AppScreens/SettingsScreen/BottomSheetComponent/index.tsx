import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {CustomButton, TextInput, Typography} from '../../../../Components';
import {verticalScale, horizontalScale} from '../../../../Functions/StyleScale';
import {colors} from '../../../../DesignTokens/Colors';
import content from '../../../../Assets/Languages/english.json';
import {type SettingType} from '../../../../Assets/Languages/englishTypes';
import {type SubmitHandler, useForm} from 'react-hook-form';

type BottomSheetComponentProps = {
  handleSheetChanges: ((index: number) => void) | undefined;
  handlePresentModalPress: () => void;
  index: number | undefined;
  isSheetOpen: boolean;
  snapPoints: string[];
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

type FormData = {
  username: string;
  password: string;
};

const settingScreenContent: SettingType = content.SettingScreen;

export const BottomSheetComponent: React.FC<
  BottomSheetComponentProps
> = props => {
  const {control, handleSubmit} = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = data => {
    // eslint-disable-next-line no-console, no-restricted-syntax
    console.log('data is :', data);
  };

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      index={props.index}
      snapPoints={props.snapPoints}
      onChange={props.handleSheetChanges}>
      <View style={styles.contentContainer}>
        <Typography
          bgColor={colors.drawerFontColor}
          type={'titleMedium'}
          size={'medium'}
          fontWeight={'600'}>
          {settingScreenContent.forgottenPassowrd}
        </Typography>
        <View style={styles.innerContainer}>
          <Typography
            bgColor={colors.drawerFontColor}
            type={'titleMedium'}
            size={'medium'}
            fontWeight={'400'}>
            {settingScreenContent.enterYourEmail}
          </Typography>
        </View>
      </View>

      <TextInput
        control={control}
        name={'email'}
        label={settingScreenContent.Email}
        secureTextEntry={false}
        rules={{required: 'Email Required'}}
      />

      <View style={styles.buttonView}>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          label={settingScreenContent.submit}
          variant={'typeA'}
        />

        <CustomButton
          onPress={props.handlePresentModalPress}
          label={settingScreenContent.loginAccount}
          variant={'typeB'}
        />
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: verticalScale(16),
  },

  contentContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },

  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: horizontalScale(32),
  },
});
