import React, {type ReactNode} from 'react';
import styled from 'styled-components/native';
// import {Text} from 'react-native-paper';
import {View, Text, type TextStyle, type LayoutChangeEvent} from 'react-native';

type TypographyProps = {
  bgColor: string;
  size?: 'small' | 'medium' | 'large';
  fontWeight: string;
  textStyle?: TextStyle[] | TextStyle;
  bullets?: boolean;
  bulletSize?: number;
  elipses?: 'tail' | 'head';
  onPress?: () => void;
  numberOfLines?: number;
  component?: () => JSX.Element;
  onTextLayout?: (event: LayoutChangeEvent) => void;
};

type StyledTextType = {
  bgColor: string;
  size: 'small' | 'medium' | 'large';
  fontWeight: string;
};

const setFonts = (size: string) => {
  let fontSize = 0;
  switch (size) {
    case 'small':
      fontSize = 10;
      break;
    case 'medium':
      fontSize = 15;
      break;
    case 'large':
      fontSize = 18;
      break;
    default:
      fontSize = 10;
      break;
  }
  return `${fontSize}px`;
};

const StyledText = styled(Text)<StyledTextType>`
  text-align: center;
  color: ${props => props.bgColor};
  font-family: 'Urbanist-SemiBold';
  font-size: ${props => setFonts(props.size)};
  font-weight: ${props => props.fontWeight};
`;

export const Typography = (
  props: TypographyProps & Readonly<{children?: ReactNode}>,
): JSX.Element => (
  <View style={{flexDirection: 'row'}}>
    <StyledText
      {...(props.numberOfLines && {numberOfLines: props.numberOfLines})}
      {...(props.onTextLayout && {onLayout: props.onTextLayout})}
      ellipsizeMode={props.elipses}
      style={props.textStyle}
      bgColor={props.bgColor}
      size={props.size || 'small'}
      onPress={props.onPress}
      fontWeight={props.fontWeight}>
      {props.children}
    </StyledText>
    {props.component?.()}
  </View>
);
