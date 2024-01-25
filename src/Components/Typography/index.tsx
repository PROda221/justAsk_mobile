import React, {type ReactNode} from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native-paper';

type TypographyProps = {
  bgColor: string;
  type:
    | 'displayLarge'
    | 'displayMedium'
    | 'displaySmall'
    | 'headlineLarge'
    | 'headlineMedium'
    | 'headlineSmall'
    | 'titleLarge'
    | 'titleMedium'
    | 'titleSmall'
    | 'bodyLarge'
    | 'bodyMedium'
    | 'bodySmall'
    | 'labelLarge'
    | 'labelMedium'
    | 'labelSmall';
  size: 'small' | 'medium' | 'large';
  fontWeight: string;
};

type StyledTextType = {
  bgColor: string;
  size: 'small' | 'medium' | 'large';
  fontWeight: string;
  variant: 'small' | 'medium' | 'large';
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
  /* Adapt the colors based on primary prop */
  color: ${props => props.bgColor};
  font-family: 'Segoe UI';
  font-size: ${props => setFonts(props.size)};
  margin: 0px;
  padding: 0.25px 1px;
  font-weight: ${props => props.fontWeight};
`;

export const Typography = (
  props: TypographyProps & Readonly<{children?: ReactNode}>,
): JSX.Element => (
  <StyledText
    variant={props.type}
    bgColor={props.bgColor}
    size={props.size}
    fontWeight={props.fontWeight}>
    {props.children}
  </StyledText>
);
