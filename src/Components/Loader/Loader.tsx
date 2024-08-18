import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

type LoaderProps = {
  isLoading: boolean;
  size?: 'large' | 'small';
};

const Loader: React.FC<LoaderProps> = ({isLoading, size}) => {
  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size ? size : 'large'} color="#FFFFFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
