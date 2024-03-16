import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from '../../../Components';
import {colors} from '../../../DesignTokens/Colors';
import {moderateScale} from '../../../Functions/StyleScale';
import RenderHtml from 'react-native-render-html';

type CourseOverviewData = {
  title: string;
};

type PropsTypes = {
  content: string;
  highlights: string;
};

const courseOverviewContent: CourseOverviewData = {
  title: 'Highlights',
};

const CourseOverview = ({content, highlights}: PropsTypes): JSX.Element => (
  <View style={styles.container}>
    <RenderHtml
      contentWidth={10}
      baseStyle={styles.htmlStyle}
      source={{html: content}}
    />
    <View>
      <Typography
        bgColor={colors.black}
        size="large"
        fontWeight="700"
        textStyle={styles.textLeft}>
        {courseOverviewContent.title}
      </Typography>
    </View>
    <View>
      <RenderHtml
        baseStyle={styles.htmlStyle}
        contentWidth={10}
        source={{html: highlights}}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {paddingHorizontal: moderateScale(16)},
  htmlStyle: {
    color: colors.black,
  },
  textLeft: {
    textAlign: 'left',
  },
});

export default CourseOverview;
