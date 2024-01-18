import React, { type ReactNode } from 'react';
import { Text, type TextProps } from 'react-native';

type TypographyProps = {
  color: string;
  fontSize: 'small' | 'medium' | 'large';
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

  return fontSize;
};

export const Typography = (
  props: TypographyProps & TextProps & Readonly<{ children?: ReactNode }>
): JSX.Element => (
  <Text
    {...props}
    style={[props.style, { fontSize: setFonts(props.fontSize), color: props.color }]}
  >
    {props.children}
  </Text>
);
