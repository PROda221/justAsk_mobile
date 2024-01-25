import React from 'react';
import styled from 'styled-components/native';
import {Button, Text} from 'react-native-paper';

type CustomButtonProps = {
  onPress: () => void;
  label: string;
  variant: 'typeA' | 'typeB' | 'typeC' | 'typeD';
};

type StyledButtonType = {
  onPress: () => void;
  label: string;
  variant: 'typeA' | 'typeB' | 'typeC' | 'typeD';
};

type StyledButtonTextType = {
  mode: 'typeA' | 'typeB' | 'typeC' | 'typeD';
};

const StyledButton = styled(Button)<StyledButtonType>`
  background-color: ${props => props.buttonColor};
  border: 1px solid rgba(27, 31, 35, 0.15);
  align-items: center;
  justify-content: center;

  ${({variant}) => {
    switch (variant) {
      case 'typeA':
        return `
          background-color: #000000;
          color: #fff;
          border-radius: 3px;
          border: 1px solid rgba(27, 31, 35, 0.15);
          height:50px;
          width:30%;
        `;
      case 'typeB':
        return `
          background-color: #ffffff;
          color: #000000;
          border-radius: 1px;
          border: 1px solid  #000000;
          height:50px;
          width:50%;
        `;
      case 'typeC':
        return `
          background-color: #ffffff;
          color: #000000;
          border: 1px solid #000000;
          height:19px;
          width:62px;
          justify-content: center;
          align-items: center;
        `;
      case 'typeD':
        return `
          background-color: #ffffff;
          color: #000000;
          border: 1px solid #A9A5A5;
          height:30px;
          width:78px;
          justify-content: center;
          align-items: center;
        `;
      default:
        return '';
    }
  }}
`;

const ButtonText = styled(Text)<StyledButtonTextType>`
  font-family: 'Segoe UI';
  font-weight: bold;

  ${({mode}) => {
    switch (mode) {
      case 'typeA':
        return `
          color: #ffffff;       
        `;
      case 'typeB':
        return `
          color: #000000;
        `;
      case 'typeC':
        return `
          color: #000000;
          font-size:9px;
        `;
      case 'typeD':
        return `
          color: #000000;
          font-size: 9px;
        `;
      default:
        return '';
    }
  }};
`;

export const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  ...props
}) => (
  <StyledButton onPress={onPress} variant={props.variant} label={props.label}>
    <ButtonText mode={props.variant}>{props.label}</ButtonText>
  </StyledButton>
);
