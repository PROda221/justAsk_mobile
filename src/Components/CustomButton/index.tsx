import React from 'react';
import styled from 'styled-components/native';
import { Button, Text } from 'react-native-paper';

type CustomButtonProps = {
  onPress: () => void;
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary';
};

type StyledButtonType = {
  onPress: () => void;
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary';
};

type StyledButtonTextType = {
  mode: 'primary' | 'secondary' | 'tertiary';
};

const StyledButton = styled(Button)<StyledButtonType>`
  background-color: ${(props) => props.buttonColor};
  border: 1px solid rgba(27, 31, 35, 0.15);
  align-items: center;
  justify-content: center;

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: #000000;
          color: #fff;
          border-radius: 3px;
          border: 1px solid rgba(27, 31, 35, 0.15);
          height:50px;
          width:30%;


        `;
      case 'secondary':
        return `
          background-color: #ffffff;
          color: #000000;
          border-radius: 3px;
          border: 1px solid  #000000;
          height:50px;
          width:50%;


        `;
      case 'tertiary':
        return `
          background-color: #d0d7dd;
          color: #312d2d;
          border: 1px solid rgba(27, 31, 35, 0.15);
        `;

      default:
        return '';
    }
  }}
`;

const ButtonText = styled(Text)<StyledButtonTextType>`
  font-size: 16px;
  font-weight: bold;
  flex: 1;
  width: 100%;
  ${({ mode }) => {
    switch (mode) {
      case 'primary':
        return `
          color: #fff;
          
        `;
      case 'secondary':
        return `
          color: #000000;
        `;
      case 'tertiary':
        return `
          color: #312d2d;
        `;
      default:
        return '';
    }
  }};
`;

export const CustomButton: React.FC<CustomButtonProps> = ({ onPress, ...props }) => (
  <StyledButton onPress={onPress} variant={props.variant} label={props.label}>
    <ButtonText mode={props.variant}>{props.label}</ButtonText>
  </StyledButton>
);
