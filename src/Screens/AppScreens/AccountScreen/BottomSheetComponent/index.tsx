import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {CustomButton, TextInput, Typography} from '../../../../Components';
import {verticalScale, horizontalScale} from '../../../../Functions/StyleScale';
import {colors} from '../../../../DesignTokens/Colors';
import content from '../../../../Assets/Languages/english.json';
import {type AccountType} from '../../../../Assets/Languages/englishTypes';
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

const settingScreenContent: AccountType = content.SettingScreen;

export const BottomSheetComponent: React.FC<
  BottomSheetComponentProps
> = props => {
  const {control, handleSubmit} = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = data => {
    // eslint-disable-next-line no-restricted-syntax
    console.log('data is :', data);
  };

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      index={props.index}
      snapPoints={props.snapPoints}
      backdropComponent={renderBackdrop}
      onChange={props.handleSheetChanges}
      backgroundStyle={styles.bottomSheet}>
      <View style={styles.contentContainer}>
        <Typography
          bgColor={colors.drawerFontColor}
          size={'medium'}
          fontWeight={'600'}>
          {settingScreenContent.forgottenPassowrd}
        </Typography>
        <View style={styles.innerContainer}>
          <Typography
            bgColor={colors.drawerFontColor}
            size={'medium'}
            fontWeight={'400'}>
            {settingScreenContent.enterYourEmail}
          </Typography>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          control={control}
          name={'email'}
          label={settingScreenContent.Email}
          secureTextEntry={false}
          rules={{required: 'Email Required'}}
        />
      </View>

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
  bottomSheet: {borderRadius: 40},

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
    marginTop: verticalScale(24),
    paddingHorizontal: horizontalScale(16),
  },

  inputContainer: {
    paddingHorizontal: horizontalScale(16),
  },
});
