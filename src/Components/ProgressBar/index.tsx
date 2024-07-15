import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {getProgressBarStyles} from './styles';
import {useTheme} from '../../useContexts/Theme/ThemeContext';

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({progress}) => {
  const progressValue = useSharedValue(0);

  const {colors} = useTheme();
  const styles = getProgressBarStyles(colors);

  useEffect(() => {
    progressValue.value = withTiming(progress, {duration: 500});
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value * 100}%`,
    };
  });

  return (
    <View>
      {progress ? (
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progress, animatedStyle]} />
        </View>
      ) : null}
    </View>
  );
};
