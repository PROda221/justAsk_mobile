import React from 'react';
import {View} from 'react-native';
import {Typography} from '../../../Components';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type courseOverviewData = {
  title: string;
  content: string;
  data: string[];
};

const courseOverviewContent: courseOverviewData = {
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
  <View style={{padding: 16}}>
    <View style={{marginVertical: 10}}>
      <Typography
        bgColor="#000000"
        type="titleSmall"
        size="medium"
        fontWeight="400">
        {courseOverviewContent.content}
      </Typography>
    </View>
    <View style={{marginVertical: 10}}>
      <Typography
        bgColor="#000000"
        type="titleSmall"
        size="large"
        fontWeight="700">
        {courseOverviewContent.title}
      </Typography>
    </View>
    <View style={{marginVertical: 10}}>
      {courseOverviewContent.data.map((item, index) => (
        <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons name={'circle'} size={10} color="#000000" />
          <View style={{marginLeft: 5}}>
            <Typography
              bgColor="#000000"
              type="bodyMedium"
              size="medium"
              fontWeight="400">
              {` ${item}`}
            </Typography>
          </View>
        </View>
      ))}
    </View>
  </View>
);

export default CourseOverview;
