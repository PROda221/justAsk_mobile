import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { Typography} from '../../../Components';
import {
  verticalScale,
  moderateScale,
} from '../../../Functions/StyleScale';
import {colors} from '../../../DesignTokens/Colors';
import Header from '../../../Components/Header';

import {type ParamListBase} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';


type Props = {
  navigation: NativeStackNavigationProp<ParamListBase, 'Fees'>;
};


const FeesScreen = ({navigation}: Props): JSX.Element => {


  const Scroll = styled(ScrollView)`
    flex-grow: 1;
    padding: 0 8px 0 8px;
  `;

  

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
          </View>
        </Scroll>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginHorizontal: moderateScale(6),
    marginVertical: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
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
});

export default FeesScreen;
