import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../../DesignTokens/Colors';
import {verticalScale, moderateScale} from '../../../Functions/StyleScale';
import {Typography} from '../../../Components';
import styled from 'styled-components';
import Header from '../../../Components/Header';

const dataPoints: string[] = [
  'You can complete your course over a 12 months period from any smart device, all you need is an internet connection.',
  'Read suggested books from the recommended reading list.',
  'There is no deadline for assignment submission, you can complete at your own pace. Once completed, you can submit via "Submit Assignment" tab.',
];

const AboutUsScreen = (): JSX.Element => {
  const bullet = '\u2022 ';

  const Scroll = styled(ScrollView)`
    flex-grow: 1;
    padding: 0 8px 0 8px;
  `;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header title={'Learning Center Guide'} />

        <Scroll>
          <View style={styles.container}>
            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'400'}
              textStyle={styles.testContainer}>
              {
                'London School of trends e-learning option is developed to help you study at your own pace and location. Our learning centre is designed in a simple instructive format which helps you devote your time to learning.'
              }
            </Typography>

            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'700'}
              textStyle={styles.testContainer}>
              {'To start with the course please follow the steps below.'}
            </Typography>

            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'700'}
              textStyle={styles.testContainer}>
              {'Step 1'}
              <Typography
                bgColor={colors.black}
                size={'medium'}
                fontWeight={'400'}
                textStyle={styles.textAlign}>
                {
                  '- Click on "My Classroom" tab then click on the launch course. '
                }
              </Typography>
            </Typography>

            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'700'}
              textStyle={styles.testContainer}>
              {'Step 2'}
              <Typography
                bgColor={colors.black}
                size={'medium'}
                fontWeight={'400'}
                textStyle={styles.textAlign}>
                {
                  '- Please select the module of study under the modules drop-down and accordingly follow the module guide. Please note that each and every module has its own guide. This will help you navigate through the course. '
                }
              </Typography>
            </Typography>

            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'400'}
              textStyle={styles.testContainer}>
              {
                'We are committed in making your learning journey as smooth as possible!'
              }
            </Typography>
            <View style={{marginTop: verticalScale(20)}}>
              {dataPoints.map((item, index) => (
                <View key={index} style={{flexDirection: 'row'}}>
                  <Typography
                    bgColor={colors.black}
                    size="large"
                    textStyle={styles.textAlign}
                    fontWeight="400">
                    {bullet}
                  </Typography>
                  <Typography
                    bgColor={colors.black}
                    size="medium"
                    textStyle={styles.textAlign}
                    fontWeight="400">
                    {item}
                  </Typography>
                </View>
              ))}
            </View>
            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'400'}
              textStyle={styles.testContainer}>
              {
                'Our Learners Support Team is available for any queries that you may have throughout your course. You can contact them via internal messaging system they are available Mon - Fri 9:00am to 5:00pm GMT.'
              }
            </Typography>

            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'400'}
              textStyle={styles.testContainer}>
              {
                'We suggest you update your email address to receive any important notification.'
              }
            </Typography>

            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'400'}
              textStyle={styles.testContainer}>
              {
                'Please leave us a review after the completion of the course. Your feedback is very important for us to improve and provide the best learning experience.'
              }
            </Typography>
            <Typography
              bgColor={colors.black}
              size={'medium'}
              fontWeight={'400'}
              textStyle={styles.testContainer}>
              {`Best Wishes,
Learners Support Team`}
            </Typography>
          </View>
        </Scroll>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },

  container: {
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors.lightGrey,
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(10),
  },

  testContainer: {
    textAlign: 'left',
    marginTop: moderateScale(20),
  },

  textAlign: {textAlign: 'left'},
});

export default AboutUsScreen;
