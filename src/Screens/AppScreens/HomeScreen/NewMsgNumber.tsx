import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const NewMsgNumber = ({number}) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.number}>{number > 9 ? '9+' : number}</Text>
    </View>
  );
};

export default NewMsgNumber;

const styles = StyleSheet.create({
  circle: {
    alignSelf: 'center',
    marginLeft: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 10,
    color: '#fff',
  },
});
