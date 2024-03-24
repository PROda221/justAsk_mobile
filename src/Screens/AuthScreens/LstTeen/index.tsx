import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, Dropdown, Typography} from '../../../Components';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import {colors} from '../../../DesignTokens/Colors';
import {
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {TextInput} from '../../../Components';
import {type SubmitHandler, useForm} from 'react-hook-form';

import CustomRadioButton from '../../../Components/CustomRadioButton';

type RadioItem = {
  id: number;
  isChecked: boolean;
  label: string;
};

type DropdownItem = {
  label: string;
  value: string;
};

type FormData = {
  addressCertificate: string;
};

type MyCard = {
  id: number;
  heading: string;
  description: string;
  date: string;
};

const LstTeenScreen = (): JSX.Element => {
  const dropdownOptions: DropdownItem[] = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
    // Add more options as needed
  ];

  const handleDropdownSelect = (selectedValue: string) => {
    console.log('Selected value:', selectedValue);
    // Handle the selected value here
  };

  const {control} = useForm<FormData>();

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
    padding: 0 8px 0 8px;
  `;

  const radioData: RadioItem[] = [
    {id: 1, isChecked: false, label: 'Print  Certificate'},
    {id: 2, isChecked: false, label: 'E-Certificate'},
  ];

  const myArray: MyCard[] = [
    {
      id: 1,
      heading: 'First Item',
      description: 'E-Certificate',
      date: 'Submitted on 2024-02-11',
    },
    {
      id: 2,
      heading: 'Second Item',
      description: 'E-Certificate',
      date: 'Submitted on 2024-02-12',
    },
    {
      id: 3,
      heading: 'Third Item',
      description: 'E-Certificate',
      date: 'Submitted on 2024-02-13',
    },
    // Add more objects as needed
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header title={'Request for Certificate'} center={true} />
        <Scroll>
          <View style={styles.container}>
            <Typography
              bgColor={colors.black}
              size={'large'}
              fontWeight={'400'}
              textStyle={styles.heading}>
              {'Request for Certificate'}
            </Typography>

            <View style={styles.dropdownContainer}>
              <Dropdown
                items={dropdownOptions}
                label="Select Course"
                onSelect={handleDropdownSelect}
              />
            </View>

            <View style={styles.textContainer}>
              <Typography
                bgColor={colors.black}
                size={'medium'}
                fontWeight={'400'}
                textStyle={styles.textBox}>
                {'LST-88900'}
              </Typography>
            </View>

            <View style={styles.textContainer}>
              <Typography
                bgColor={colors.black}
                size={'medium'}
                fontWeight={'400'}
                textStyle={styles.textBox}>
                {'Sachin Tyagi'}
              </Typography>
            </View>

            <View style={styles.textContainer}>
              <Typography
                bgColor={colors.black}
                size={'medium'}
                fontWeight={'400'}
                textStyle={styles.textBox}>
                {'sachin89tyagi@gmail.com'}
              </Typography>
            </View>

            <CustomRadioButton data={radioData} />

            <TextInput
              control={control}
              name={'username'}
              labelExists={false}
              placeholder={'Address where you want the certificate'}
              secureTextEntry={false}
              rules={{}}
              viewStyle={styles.addressTextInput}
              multiline={true}
            />

            <View style={styles.dropdownContainer}>
              <CustomButton variant="typeA" label={'Pay (£20)'} />
            </View>
          </View>
          <View
            style={[
              styles.container,
              {
                paddingHorizontal: moderateScale(0),
                marginBottom: moderateScale(10),
              },
            ]}>
            <View style={styles.headingBottomContainer}>
              <Typography
                bgColor={colors.black}
                size={'large'}
                fontWeight={'700'}
                textStyle={styles.textContentStyle}>
                {'Downloaded Certificate'}
              </Typography>
            </View>
            {myArray.map(item => (
              <View key={`${item.id}`} style={styles.cardStyle}>
                <View>
                  <Typography
                    bgColor={colors.black}
                    size={'large'}
                    fontWeight={'700'}
                    textStyle={styles.textContentStyle}>
                    {item.heading}
                  </Typography>

                  <Typography
                    bgColor={colors.black}
                    size={'medium'}
                    fontWeight={'400'}
                    textStyle={styles.textContent}>
                    {item.description}
                  </Typography>

                  <View style={styles.dropdownContainer}>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'400'}
                      textStyle={styles.textContent}>
                      {item.date}
                    </Typography>
                  </View>
                </View>
                <View style={styles.dropdownContainer}>
                  <CustomButton variant="typeA" label={'Download Certificate'}viewStyle={styles.buttonStyle}  />
                </View>
              </View>
            ))}
          </View>
        </Scroll>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  addressTextInput:{height:verticalScale(100)},

  buttonStyle:  {height: 30, marginBottom: 10, width: 132},

  cardStyle: {
    borderColor: colors.lightGrey,
    borderTopWidth: moderateScale(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(20),
  },

  container: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginTop: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  dropdownContainer: {marginVertical: moderateScale(10)},

  heading: {
    marginTop: moderateScale(16),
    textAlign: 'left',
  },

  headingBottomContainer:{padding: moderateScale(16)},

  safeAreaContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },

  textBox: {marginLeft: moderateScale(16), textAlign: 'left'},

  textContainer: {
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    height: verticalScale(40),
    justifyContent: 'center',
    marginVertical: moderateScale(10),
  },
  textContent:{fontSize:12,textAlign: 'left'},

  textContentStyle: {textAlign: 'left'},

});



export default LstTeenScreen;
