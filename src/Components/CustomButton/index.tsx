import React from 'react';
import styled from 'styled-components/native';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {FrontArrow} from '../../Assets/Images';
import {type ViewStyle} from 'react-native';
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type CustomButtonProps = {
  onPress?: () => void;
  label: string;
  backArrow?: boolean;
  viewStyle?: ViewStyle[] | ViewStyle;
  textColor?: string;
  radius: number;
  textStyle?: TextStyle;
  loading?: boolean;
};

type StyledButtonType = {
  onPress?: () => void;
  label: string;
  viewStyle?: ViewStyle;
  radius: number;
};

type StyledButtonTextType = {
  textColor?: string;
  viewStyle?: ViewStyle;
};

const Button = styled(TouchableOpacity)<StyledButtonType>`
  border: 1px;
  justify-content: center;
  align-items: center;
  width: '100%';
  background-color: #1b1e20;
  height: 65px;
  border-radius: ${props => `${props.radius}px`};
`;

const ButtonText = styled(Text)<StyledButtonTextType>`
  font-family: 'Urbanist-SemiBold';
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.textColor};
  text-align: center;
`;

export const CustomButton: React.FC<CustomButtonProps> = ({
  loading,
  onPress,
  ...props
}) => {
  const {colors} = useTheme();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = (onPress: (() => void) | undefined) => {
    scale.value = withSpring(1);
    onPress?.();
  };

  return (
    <Animated.View style={animatedStyle}>
      <Button
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={() => handlePressOut(onPress)}
        label={props.label}
        style={props.viewStyle}
        radius={props.radius}>
        {loading ? (
          <ActivityIndicator size='large' color={colors.buttonLoader} />
        ) : (
          <ButtonText
            textColor={
              props.textColor ? props.textColor : colors.buttonTextColor
            }
            style={props.textStyle}>
            {props.label + ' '}
          </ButtonText>
        )}

        {props.backArrow && <FrontArrow />}
      </Button>
    </Animated.View>
  );
};
