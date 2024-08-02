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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Loader;
