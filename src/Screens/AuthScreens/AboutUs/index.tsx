import {View,  StyleSheet, ScrollView} from 'react-native';
import React, { useEffect } from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../../DesignTokens/Colors';
import {moderateScale} from '../../../Functions/StyleScale';
import styled from 'styled-components';
import Header from '../../../Components/Header';
// Import {type HtmlData} from './Types';
import {type RootState} from '../../../Redux/rootReducers';
import {useDispatch, useSelector} from 'react-redux';
import { callAboutUs } from '../../../Redux/Slices/AboutUsSlice';
import RenderHtml from 'react-native-render-html';

const AboutUsScreen = (): JSX.Element => {
  const dispatch=useDispatch()
  const aboutUsData=useSelector((state: RootState) => state.aboutUsSlice)
  const Scroll = styled(ScrollView)`
    flex-grow: 1;
    padding: 0 8px 0 8px;
  `;

  useEffect(()=>{
    dispatch(callAboutUs(56))
  },[])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header title={'Learning Center Guide'} />

        <Scroll>
          <View style={styles.container}>
          <RenderHtml baseStyle={styles.htmlStyle} contentWidth={10} source={{html:aboutUsData?.success?.document?.content ?? ''}} />
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

  htmlStyle: {
    color: colors.black,
  },
  safeAreaContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default AboutUsScreen;
