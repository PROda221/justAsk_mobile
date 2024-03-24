import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Typography} from '../../../Components';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import {colors} from '../../../DesignTokens/Colors';
import {
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {MyProfile} from '../../../Assets/Images';

const LoginScreen = (): JSX.Element => {
  const Scroll = styled(ScrollView)`
    flex-grow: 1;
    padding: 0 8px 0 8px;
  `;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header title={'My Profile'} />
        <Scroll>
          <View style={styles.container}>
            <View style={styles.profile}>
              <MyProfile />
              {/* <EditProfile /> */}
            </View>
            <View style={styles.textBox}>
              <View style={styles.leftContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'700'}
                  textStyle={styles.textContentStyle}>
                  {'First Name'}
                </Typography>
              </View>
              <View style={styles.rightContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'500'}
                  textStyle={styles.textContentStyle}>
                  {': Sachin asfafafaewfawfawffafwfafwfvbzregzrg'}
                </Typography>
              </View>
            </View>
            <View style={styles.textBox2}>
              <View style={styles.leftContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'700'}
                  textStyle={styles.textContentStyle}>
                  {'Last Name'}
                </Typography>
              </View>
              <View style={styles.rightContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'500'}
                  textStyle={styles.textContentStyle}>
                  {': Sachin asfafafaewfawfawffafwfafwfvbzregzrg'}
                </Typography>
              </View>
            </View>
            <View style={styles.textBox}>
              <View style={styles.leftContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'700'}
                  textStyle={styles.textContentStyle}>
                  {'Email Address'}
                </Typography>
              </View>
              <View style={styles.rightContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'500'}
                  textStyle={styles.textContentStyle}>
                  {': Sachin asfafafaewfawfawffafwfafwfvbzregzrg'}
                </Typography>
              </View>
            </View>
            <View style={styles.textBox2}>
              <View style={styles.leftContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'700'}
                  textStyle={styles.textContentStyle}>
                  {'Contach No.'}
                </Typography>
              </View>
              <View style={styles.rightContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'500'}
                  textStyle={styles.textContentStyle}>
                  {': Sachin asfafafaewfawfawffafwfafwfvbzregzrg'}
                </Typography>
              </View>
            </View>
            <View style={styles.textBox}>
              <View style={styles.leftContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'700'}
                  textStyle={styles.textContentStyle}>
                  {'Date Of Birth'}
                </Typography>
              </View>
              <View style={styles.rightContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'500'}
                  textStyle={styles.textContentStyle}>
                  {': Sachin asfafafaewfawfawffafwfafwfvbzregzrg'}
                </Typography>
              </View>
            </View>
            <View style={styles.textBox2}>
              <View style={styles.leftContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'700'}
                  textStyle={styles.textContentStyle}>
                  {'Country'}
                </Typography>
              </View>
              <View style={styles.rightContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'500'}
                  textStyle={styles.textContentStyle}>
                  {': Sachin asfafafaewfawfawffafwfafwfvbzregzrg'}
                </Typography>
              </View>
            </View>
            <View style={styles.textBox}>
              <View style={styles.leftContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'700'}
                  textStyle={styles.textContentStyle}>
                  {'Address'}
                </Typography>
              </View>
              <View style={styles.rightContainer}>
                <Typography
                  bgColor={'black'}
                  size={'medium'}
                  fontWeight={'500'}
                  textStyle={styles.textContentStyle}>
                  {': Sachin asfafafaewfawfawffafwfafwfvbzregzrg'}
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
  container: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    marginTop: moderateScale(10),

  },
  leftContainer: {width: '40%'},
  profile: {alignItems: 'center', marginVertical: verticalScale(30)},
  rightContainer: {width: '60%'},

  safeAreaContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },

  textBox: {
    borderColor: colors.lightGrey,
    borderTopWidth: moderateScale(1),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(16),
  },
  textBox2: {
    backgroundColor: colors.studentCard,
    borderColor: colors.lightGrey,
    borderTopWidth: moderateScale(1),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(16),
  },
  textContentStyle: {textAlign: 'left'},
});
export default LoginScreen;
