import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, Typography} from '../../../Components';
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../../../Functions/StyleScale';
import {colors} from '../../../DesignTokens/Colors';
import Header from '../../../Components/Header';
import {CustomDocumentPicker} from '../../../Components';
import {Dropdown} from '../../../Components';

type DropdownItem = {
  label: string;
  value: string;
};

type FileInformation = {
  fileCopyUri: null | string;
  name: string;
  size: number;
  type: string;
  uri: string;
};

const dropdownOptions: DropdownItem[] = [
  {label: 'Option 1', value: 'option1'},
  {label: 'Option 2', value: 'option2'},
  {label: 'Option 3', value: 'option3'},
  // Add more options as needed
];
const FeesScreen = (): JSX.Element => {
  const Scroll = styled(ScrollView)`
    flex-grow: 1;
    padding: 0 8px 0 8px;
  `;

  const handleDropdownSelect = (selectedValue: string) => {
    console.log('Selected value:', selectedValue);
    // Handle the selected value here
  };
  const handleDocumentPick = (result: FileInformation[]) => {
    console.log('Picked document:', result);
    // Handle the picked document
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header title={'Assignment'} />
        <Scroll>
          <View style={styles.container}>
            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'700'}
              textStyle={styles.testContainer}>
              {'Upload Assignment'}
            </Typography>

            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'400'}
              textStyle={styles.testContainer}>
              {'Dear Sachin,'}
            </Typography>
            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'400'}
              textStyle={styles.testContainer}>
              {
                'Please select the module and accordingly upload the associated documents, to check your submission history  and  quiz results please click on the tabs below.'
              }
            </Typography>
            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'400'}
              textStyle={styles.testContainer}>
              {`Due to any reason if you are unable to upload your submission's here then please email it directly to `}
            </Typography>
            <View style={styles.noteContainer}>
              <Typography
                bgColor={colors.noteText}
                size={'medium'}
                fontWeight={'400'}>
                {`Note : Submissions which are emailed will not show up under submission history tab so please keep a record of the same.`}
              </Typography>
            </View>
            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'400'}
              textStyle={styles.testContainer}>
              {`Many Thanks
Team LST`}
            </Typography>

            <View style={styles.bottomContainer}>
              <View style={styles.innerBottomContainer}>
                <Typography
                  bgColor={colors.black}
                  size={'medium'}
                  fontWeight={'400'}
                  textStyle={styles.textstyles}>
                  {'Course'}
                </Typography>
                <Typography
                  bgColor={colors.black}
                  size={'medium'}
                  fontWeight={'700'}
                  textStyle={styles.textstyles}>
                  {':-'}
                </Typography>
              </View>
              {/* <View
                style={{
                  borderWidth: moderateScale(1),
                  width: '60%',
                  marginHorizontal: 10,
                  borderColor: '#D4D1D1',
                  borderRadius: 4,
                }}></View> */}

              <Dropdown
                items={dropdownOptions}
                label="Select Course"
                onSelect={handleDropdownSelect}
              />
            </View>

            <View style={styles.bottomContainer}>
              <View style={styles.innerBottomContainer}>
                <Typography
                  bgColor={colors.black}
                  size={'medium'}
                  fontWeight={'400'}
                  textStyle={styles.textstyles}>
                  {'Module'}
                </Typography>
                <Typography
                  bgColor={colors.black}
                  size={'medium'}
                  fontWeight={'700'}
                  textStyle={styles.textstyles}>
                  {':-'}
                </Typography>
              </View>
              {/* <View
                style={{
                  borderWidth: moderateScale(1),
                  width: '60%',
                  marginHorizontal: 10,
                  borderColor: '#D4D1D1',
                  borderRadius: 4,
                }}></View> */}

              <Dropdown
                items={dropdownOptions}
                label="Select Module"
                onSelect={handleDropdownSelect}
              />
            </View>

            <View style={styles.bottomContainer}>
              <View style={{width: horizontalScale(100)}} />
              <View style={{width: horizontalScale(220)}}>
                <CustomDocumentPicker
                  buttonStyles={{
                    borderColor: colors.lightGrey,
                    borderRadius: moderateScale(4),
                    borderWidth: moderateScale(1),
                    height: verticalScale(35),
                    width: '100%',
                    justifyContent: 'center',
                    marginHorizontal: moderateScale(10),
                  }}
                  buttonTextStyles={{color: colors.black}}
                  containerStyles={{marginBottom: 20}}
                  onDocumentPick={handleDocumentPick}
                />

                <CustomButton
                  onPress={() => {
                    console.log('submited');
                  }}
                  label={'SUMBIT'}
                  variant="typeA"
                />
              </View>
            </View>
          </View>
        </Scroll>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors.lightGrey,
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(10),
  },

  safeAreaContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },

  testContainer: {
    marginTop: moderateScale(20),
    textAlign: 'left',
  },

  noteContainer: {
    backgroundColor: colors.noteBackground,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginTop: moderateScale(10),
  },

  bottomContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
  },

  innerBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: horizontalScale(91),
    // alignSelf: 'center',
  },

  textstyles: {textAlign: 'left'},
});

export default FeesScreen;
