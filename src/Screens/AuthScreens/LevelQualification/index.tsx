import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Typography} from '../../../Components';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import {colors} from '../../../DesignTokens/Colors';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {UserProfile} from '../../../Assets/Images';

type Suggestion = {
  content: string;
  highlight: string;
  data: string[];
  salutation: string;
};

const LevelQualScreen = (): JSX.Element => {
  const Scroll = styled(ScrollView)`
    flex-grow: 1;
    padding: 0 8px 0 8px;
  `;

  const bullet = '\u2022 ';

  const suggestion: Suggestion = {
    content:
      'We are committed in making your learning journey as smooth as possible!',
    highlight: `Our Learners Support Team is available for any queries that you may have throughout your course. You can contact them via internal messaging system they are available Mon - Fri 9:00am to 5:00pm GMT.`,
    data: [
      `You can complete your course over a 12 months period any smart device, all you need is an internet connection.Read suggested books from the recommended reading list.`,
      `There is no deadline for assignment submission, you can complete at your own pace.`,
      `Once completed, you can submit via "Submit Assignment" tab.`,
    ],
    salutation: `Best Wishes, 
Learners Support Team`,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header title={'Dashboard'} />
        <Scroll>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <UserProfile />

              <View style={styles.sideContentContainer}>
                <Typography
                  bgColor={colors.black}
                  size={'large'}
                  fontWeight={'700'}
                  textStyle={styles.textContentStyle}>
                  {'Sachin Tyagi'}
                </Typography>
                <View style={styles.sideContainer}>
                  <View style={styles.sideInnerContainer}>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'700'}
                      textStyle={styles.textContentStyle}>
                      {'Phone No.'}
                    </Typography>
                  </View>
                  <View style={styles.valueStyle}>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'400'}
                      textStyle={styles.textContentStyle}>
                      {':- 89839944030'}
                    </Typography>
                  </View>
                </View>
                <View style={styles.sideContainer}>
                  <View style={styles.sideInnerContainer}>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'700'}
                      textStyle={styles.textContentStyle}>
                      {'Address'}
                    </Typography>
                  </View>
                  <View style={styles.valueStyle}>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'400'}
                      textStyle={styles.textContentStyle}>
                      {':- abc sector-100'}
                    </Typography>
                  </View>
                </View>
                <View style={styles.sideContainer}>
                  <View style={styles.sideInnerContainer}>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'700'}
                      textStyle={styles.textContentStyle}>
                      {'Age'}
                    </Typography>
                  </View>
                  <View style={styles.valueStyle}>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'400'}
                      textStyle={styles.textContentStyle}>
                      {':- 20'}
                    </Typography>
                  </View>
                </View>
                <View style={styles.sideContainer}>
                  <View style={styles.sideInnerContainer}>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'700'}
                      textStyle={styles.textContentStyle}>
                      {'Joined'}
                    </Typography>
                  </View>
                  <View style={styles.joinedValueDate}>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'400'}
                      textStyle={styles.textContentStyle}>
                      {':- '}
                    </Typography>
                    <Typography
                      bgColor={colors.black}
                      size={'medium'}
                      fontWeight={'400'}
                      textStyle={styles.textContentStyle}>
                      {'YYYY-MM-DD HH:MM:SS'}
                    </Typography>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.middleContentContainer}>
              <Typography
                bgColor={colors.black}
                size={'medium'}
                fontWeight={'400'}
                textStyle={styles.textContentStyle}>
                {suggestion.content}
              </Typography>
              <View style={styles.bulletPoints}>
                {suggestion.data.map((item, index) => (
                  <View key={index} style={styles.points}>
                    <Typography
                      bgColor={colors.black}
                      size="large"
                      textStyle={styles.textContentStyle}
                      fontWeight="400">
                      {bullet}
                    </Typography>
                    <Typography
                      bgColor={colors.black}
                      size="medium"
                      textStyle={styles.textContentStyle}
                      fontWeight="400">
                      {item}
                    </Typography>
                  </View>
                ))}
              </View>
              <View style={styles.bulletPoints}>
                <Typography
                  bgColor={colors.black}
                  size={'medium'}
                  fontWeight={'400'}
                  textStyle={styles.textContentStyle}>
                  {suggestion.highlight}
                </Typography>
              </View>

              <View style={styles.bulletPoints}>
                <Typography
                  bgColor={colors.black}
                  size={'medium'}
                  fontWeight={'400'}
                  textStyle={styles.textContentStyle}>
                  {suggestion.salutation}
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
  bulletPoints: {marginTop: verticalScale(20)},
  container: {
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginTop: moderateScale(10),
  },
  innerContainer: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(20),
  },

  joinedValueDate:{flexDirection: 'row', width: '60%'},

  middleContentContainer: {
    marginBottom: moderateScale(20),
    paddingHorizontal: moderateScale(15),
  },
  points: {flexDirection: 'row'},
  safeAreaContainer: {backgroundColor: colors.white, flex: 1},
  sideContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
  },
  sideContentContainer: {
    marginLeft: moderateScale(15),
    width: horizontalScale(220),
  },

  sideInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },

  textContentStyle: {textAlign: 'left'},
  valueStyle:{width: '60%'}
});

export default LevelQualScreen;
