import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from '../../../Components';
import {colors} from '../../../DesignTokens/Colors';
import {moderateScale, verticalScale} from '../../../Functions/StyleScale';

type CourseOverviewData = {
  title: string;
  content: string;
  data: string[];
};

const bullet = '\u2022 ';

const courseOverviewContent: CourseOverviewData = {
  content:
    'This course is ideal for students in the creative industries who are interested in starting their own business or improving the structure of an existing one. This course also meets the perfect fit for recent graduates, designers, creatives, managers, and entrepreneurs in the creative field. Get the classroom experience from the comfort of your home. We give you real-world advice on what to expect and how to maximise your creative and professional prospects.',
  title: 'Highlights',
  data: [
    'Business of Fashion Course is taught by an industry expert.',
    'The course consists of practical learning, highly interactive research assignments and quizzes.',
    'Learn online, on any device or browser over 12 months.',
    'Get personal feedback on every assignment.',
    'Study from anywhere and at your own pace.',
    'Successful students will receive a diploma certificate from the London School of Trends.',
  ],
};

const CourseOverview: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <Typography
        bgColor={colors.black}
        size="medium"
        fontWeight="400"
        textStyle={styles.textLeft}>
        {courseOverviewContent.content}
      </Typography>
    </View>

    <View style={styles.innerContainer}>
      <Typography
        bgColor={colors.black}
        size="large"
        fontWeight="700"
        textStyle={styles.textLeft}>
        {courseOverviewContent.title}
      </Typography>
    </View>
    <View style={styles.innerContainer}>
      {courseOverviewContent.data.map((item, index) => (
        <View key={index} style={styles.pointersContainers}>
          <Typography
            bgColor={colors.black}
            size="large"
            textStyle={styles.textLeft}
            fontWeight="400">
            {bullet}
          </Typography>
          <Typography
            bgColor={colors.black}
            size="medium"
            textStyle={styles.textLeft}
            fontWeight="400">
            {item}
          </Typography>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {paddingHorizontal: moderateScale(16)},
  innerContainer: {marginTop: verticalScale(20)},
  pointersContainers: {flexDirection: 'row'},
  textLeft: {
    textAlign: 'left',
  },
});

export default CourseOverview;
