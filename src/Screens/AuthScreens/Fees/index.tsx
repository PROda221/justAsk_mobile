import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
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
import {type DocumentPickerResponse} from 'react-native-document-picker';
import {useSelector} from 'react-redux';
import {type RootState} from '../../../Redux/rootReducers';
import {post} from '../../../Api/AxiosConfig';
import { type ParamListBase } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

type DropdownItem = {
  label: string;
  value: string;
};

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase, 'Fees'>;
};


const dropdownOptions: DropdownItem[] = [
  {label: 'Option 1', value: 'option1'},
  {label: 'Option 2', value: 'option2'},
  {label: 'Option 3', value: 'option3'},
  // Add more options as needed
];
const FeesScreen = ({navigation}: Props): JSX.Element => {
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentPickerResponse>();

  const loginSlice = useSelector((state: RootState) => state.loginSlice);

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
    padding: 0 8px 0 8px;
  `;

  const handleDropdownSelect = (selectedValue: string) => {
    console.log('Selected value:', selectedValue);
    // Handle the selected value here
  };

  const postDocument = async () => {
    try {
      const data = {file: selectedDocument?.uri};
      const resp = await post('/files/uploadfile.php', data, {
        headers: {
          Authorization: `Bearer ${loginSlice.storedAccessToken}`,
        },
      });
      if (resp.status === 200) {
        console.log('inside??? :', resp.data);
        navigation.navigate('Home Screen')
      }
    } catch (err) {
      console.log('err is :', err);
    }
  };

  const handleDocumentPick = (result: DocumentPickerResponse[]) => {
    setSelectedDocument(result[0]);
    // Handle the picked document
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header title={'Assignments'} center={true} />
        <Scroll>
          <View style={styles.container}>
            <Typography
              bgColor={colors.black}
              size={'large'}
              fontWeight={'700'}
              textStyle={styles.testContainer}>
              {'Upload Assignments'}
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
                textStyle={styles.noteTextStyle}
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
              <View style={styles.dropdownContainer}>
                <Dropdown
                  items={dropdownOptions}
                  label="Select Course"
                  onSelect={handleDropdownSelect}
                />
              </View>
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
              <View style={styles.dropdownContainer}>
                <Dropdown
                  items={dropdownOptions}
                  label="Select Module"
                  onSelect={handleDropdownSelect}
                />
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <View style={{width: horizontalScale(100)}} />
              <View style={{width: horizontalScale(220)}}>
                <CustomDocumentPicker
                  buttonStyles={styles.buttonStyles}
                  buttonTextStyles={styles.buttonTextStyles}
                  containerStyles={styles.containerStyles}
                  onDocumentPick={handleDocumentPick}
                />

                <CustomButton
                  onPress={postDocument}
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
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateScale(10),
  },
  buttonStyles: {
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    height: verticalScale(35),
    justifyContent: 'center',
    marginHorizontal: moderateScale(10),
    width: '100%',
  },
  buttonTextStyles: {color: colors.black, fontFamily: 'Arial'},
  container: {
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginHorizontal: moderateScale(6),
    marginVertical: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },

  containerStyles: {marginBottom: verticalScale(20)},

  dropdownContainer: {marginLeft: horizontalScale(10)},

  innerBottomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: horizontalScale(91),
  },

  noteContainer: {
    backgroundColor: colors.noteBackground,
    borderRadius: moderateScale(10),
    marginTop: verticalScale(20),
    padding: moderateScale(10),
  },

  noteTextStyle: {
    fontSize: moderateScale(12),
    textAlign: 'left',
  },

  safeAreaContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },

  testContainer: {
    marginTop: moderateScale(20),
    textAlign: 'left',
  },

  textstyles: {textAlign: 'left'},
});

export default FeesScreen;
