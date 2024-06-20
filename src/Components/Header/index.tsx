import React from 'react';
import {View, TouchableOpacity, ViewStyle} from 'react-native';
import styled from 'styled-components';
import {
  type NavigationProp,
  useNavigation,
  ParamListBase,
} from '@react-navigation/native';
import {HeaderBackArrow} from '../../Assets/Images';
import {horizontalScale, verticalScale} from '../../Functions/StyleScale';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getHeaderStyles} from './styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Router} from 'react-native-actions-sheet';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Container = styled(View)<{drawer?: boolean}>`
  padding: 20px 0 0 0;
  align-items: flex-start;
`;

const leftFeatureHandler = (
  navigation:
    | NavigationProp<ReactNavigation.RootParamList>
    | Router<never>
    | undefined,
  onPress: () => void,
): void => {
  onPress?.();
  navigation?.goBack();
};

type Props = {
  navigation?:
    | Router<'SearchFeature-sheet'>
    | undefined
    | NativeStackNavigationProp<ParamListBase>;
  containerStyle?: ViewStyle;
  onPress?: () => void;
};

const Header = ({navigation, containerStyle, onPress}: Props) => {
  const headerNavigation = navigation ? navigation : useNavigation();
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
    leftFeatureHandler(headerNavigation, onPress);
  };

  return (
    <Animated.View style={animatedStyle}>
      <Container style={containerStyle}>
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
