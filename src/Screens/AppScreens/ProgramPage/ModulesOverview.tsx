import React from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from '../../../Functions/StyleScale';
import RenderHtml from 'react-native-render-html';


type PropsTypes = {
  content: string
}

const ModulesCovered = ({content}: PropsTypes): JSX.Element => (
  <View style={styles.container}>
    <RenderHtml contentWidth={10} source={{html: content}} />
  </View>
);

const styles = StyleSheet.create({
  container: {padding: moderateScale(16)},
});

export default ModulesCovered;
