import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, Typography} from '../../../Components';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import {colors} from '../../../DesignTokens/Colors';
import {
  moderateScale,
} from '../../../Functions/StyleScale';


type MyCard = {
  id: number;
  heading: string;
  description: string;
  date: string;
  file: string;
};

const ContactUsScreen = (): JSX.Element => {
  const Scroll = styled(ScrollView)`
    flex-grow: 1;
    padding: 0 8px 0 8px;
  `;
  const myArray: MyCard[] = [
    {
      id: 1,
      heading: 'Interior Design Specialisation',
      description: 'Module 1: The design process',
      date: '2024-02-11 at 03:10',
      file: 'File 1:2699851fb_img-1594641992.jpg',
    },
    {
      id: 2,
      heading: 'Interior Design Specialisation',
      description: 'Module 1: The design process',
      date: '2024-02-12 at 03:10',
      file: 'File 1:2699851fb_img-1594641992.jpg',
    },
    {
      id: 3,
      heading: 'Interior Design Specialisation',
      description: 'Module 1: The design process',
      date: '2024-02-13 at 03:10',
      file: 'File 1:2699851fb_img-1594641992.jpg',
    },
    // Add more objects as needed
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header title={'Submission History'} center={true} />
        <Scroll>
          <View
            style={[
              styles.container,
              {
                paddingHorizontal: moderateScale(0),
                marginBottom: moderateScale(10),
              },
            ]}>
            <View style={styles.headingStyle}>
              <Typography
                bgColor={colors.black}
                size={'large'}
                fontWeight={'700'}
                textStyle={styles.textContentStyle}>
                {'Submission History'}
              </Typography>
            </View>
            {myArray.map(item => (
              <View key={`${item.id}`} style={styles.cardStyle}>
                <View>
                  <Typography
                    bgColor={colors.black}
                    size={'medium'}
                    fontWeight={'700'}
                    textStyle={styles.textContentStyle}>
                    {item.heading}
                  </Typography>

                  <Typography
                    bgColor={colors.black}
                    size={'medium'}
                    fontWeight={'400'}
                    textStyle={styles.textStyle}>
                    {item.description}
                  </Typography>

                  <View style={styles.dropdownContainer}>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'400'}
                      textStyle={styles.textStyle}>
                      {item.date}
                    </Typography>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'400'}
                      textStyle={styles.textStyle}>
                      {item.file}
                    </Typography>
                  </View>
                </View>
                <View style={styles.dropdownContainer}>
                  <CustomButton
                    variant="typeA"
                    label={'Complete'}
                    viewStyle={styles.completeButton}
                  />
                  <CustomButton
                    variant="typeB"
                    label={'Feedback'}
                    viewStyle={styles.feedbackButton}
                  />
                </View>
              </View>
            ))}
          </View>
          <View
            style={[
              styles.container,
              {
                paddingHorizontal: moderateScale(0),
                marginBottom: moderateScale(10),
              },
            ]}>
            <View style={styles.headingStyle}>
              <Typography
                bgColor={colors.black}
                size={'large'}
                fontWeight={'700'}
                textStyle={styles.textContentStyle}>
                {'Downloaded Certificate'}
              </Typography>
            </View>

            <View
              style={styles.bottomContainer}>
              <Typography
                bgColor={colors.black}
                size={'medium'}
                fontWeight={'700'}
                textStyle={styles.textContentStyle}>
                {'Fashion Communication'}
              </Typography>

              <Typography
                bgColor={colors.black}
                size={'medium'}
                fontWeight={'400'}
                textStyle={styles.textStyle}>
                {'Module 1 : The Role of Public Relations within Fashion'}
              </Typography>

              <View style={styles.dropdownContainer}>
                <Typography
                  bgColor={colors.black}
                  size={'medium'}
                  fontWeight={'400'}
                  textStyle={styles.textStyle}>
                  {'02/19/2021 at 19:52'}
                </Typography>
                <Typography
                  bgColor={colors.black}
                  size={'medium'}
                  fontWeight={'400'}
                  textStyle={styles.textStyle}>
                  {'Result: 30%'}
                </Typography>
              </View>
            </View>
          </View>
        </Scroll>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  bottomContainer:{
    borderColor: colors.lightGrey,
    borderTopWidth: moderateScale(1),
    padding: moderateScale(20),
  },

  cardStyle: {
    borderColor: colors.lightGrey,
    borderTopWidth: moderateScale(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(20),
  },

  completeButton:{
    backgroundColor: colors.buttonGreen,
    borderWidth: 0,
    height: 30,
    marginBottom: 10,
    width: 76,
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

  feedbackButton:{height: 30, marginBottom: 10, width: 76},

  headingStyle:{padding: moderateScale(16)},
  safeAreaContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  textContentStyle: {textAlign: 'left'},

  textStyle: {fontSize: 12, textAlign: 'left'}


});

export default ContactUsScreen;
