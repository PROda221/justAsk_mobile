import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {HeaderBackArrow} from '../../Assets/Images';
import {horizontalScale, verticalScale} from '../../Functions/StyleScale';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getHeaderStyles} from './styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const Container = styled(View)<{drawer?: boolean}>`
  padding: 20px 0 0 0;
  align-items: flex-start;
`;

const leftFeatureHandler = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
): void => {
  navigation.goBack();
};

const Header = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const styles = getHeaderStyles(colors);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    leftFeatureHandler(navigation);
  };

  return (
    <Animated.View style={animatedStyle}>
      <Container>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}>
          <HeaderBackArrow
            width={horizontalScale(9.26)}
            height={verticalScale(16)}
          />
        </TouchableOpacity>
      </Container>
    </Animated.View>
  );
};

export default Header;
