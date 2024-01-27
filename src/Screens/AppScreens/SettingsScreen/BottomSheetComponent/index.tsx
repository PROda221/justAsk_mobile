import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {CustomButton, Typography} from '../../../../Components';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../../../Functions/StyleScale';

interface BottomSheetComponentProps {
  handleSheetChanges: ((index: number) => void) | undefined;
  handlePresentModalPress: () => void;

  index: number | undefined;
  isSheetOpen: boolean;

  snapPoints: string[];
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

export const BottomSheetComponent: React.FC<
  BottomSheetComponentProps
> = props => {
  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      index={props.index}
      snapPoints={props.snapPoints}
      onChange={props.handleSheetChanges}
      // backdropComponent={props => (
      //   <BottomSheetBackdrop {...props} pressBehavior="close" />
      // )}
    >
      <View style={styles.contentContainer}>
        <Typography
          bgColor={'#000000'}
          type={'titleMedium'}
          size={'medium'}
          fontWeight={'600'}>
          {`Forgotten Your Password`}
        </Typography>
        <View style={styles.innerContainer}>
          <Typography
            bgColor={'#000000'}
            type={'titleMedium'}
            size={'medium'}
            fontWeight={'400'}>
            {`Please enter the email address you used to register on the system to identify yourself. If this email address exists in our database an automatic email will be sent to the associated email address.`}
          </Typography>
        </View>
      </View>
      <View style={styles.buttonView}>
        <CustomButton
          onPress={() => console.log('hello')}
          label={'SUBMIT'}
          variant={'typeA'}
        />

        <CustomButton
          onPress={props.handlePresentModalPress}
          label={'LOGIN YOUR ACCOUNT?'}
          variant={'typeB'}
        />
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    alignItems: 'center',
  },

  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
  },

  buttonView: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: verticalScale(16),
    justifyContent: 'space-evenly',
  },
});
