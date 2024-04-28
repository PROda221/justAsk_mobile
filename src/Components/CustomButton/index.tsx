import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../DesignTokens/Colors';
import {Text, TouchableOpacity, View} from 'react-native';
import {FrontArrow} from '../../Assets/Images';
import { type ViewStyle} from 'react-native';


type CustomButtonProps = {
  onPress?: () => void;
  label: string;
  variant?: 'typeA' | 'typeB' | 'typeC' | 'typeD';
  backArrow?: boolean;
  viewStyle?:ViewStyle;
};

type StyledButtonType = {
  onPress?: () => void;
  label: string;
  variant?: 'typeA' | 'typeB' | 'typeC' | 'typeD';
  viewStyle?:ViewStyle;
};

type StyledButtonTextType = {
  mode?: 'typeA' | 'typeB' | 'typeC' | 'typeD';
};

const ContentContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Button = styled(TouchableOpacity)<StyledButtonType>`
  border: 1px;
  justify-content: center;
  align-items: center;

  ${({variant}) => {
    switch (variant) {
      case 'typeA':
        return `
          background-color: ${colors.black};
          color: ${colors.white};
          border-radius: 4px;
          border: 1px solid ${colors.black};
          height:52px;
          width:150px;
        `;
      case 'typeB':
        return `
          background-color: ${colors.white};
          color: ${colors.black};
          border-radius: 4px;
          border: 1px solid  ${colors.black};
          height:52px;
          width:190px;
        `;
      case 'typeC':
        return `
          background-color: ${colors.white};
          color: ${colors.black};
          border: 1px;
          border-color: ${colors.black};
          height:19px;
          width:62px;
          border-radius: 12px;
        `;
      case 'typeD':
        return `
          background-color: ${colors.white};
          border: 1px;
          border-color: ${colors.buttonBorder};
          border-radius: 12px;
          height: 22px;
          width: 70px;
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
          color: ${colors.white}; 
          font-size:13px;
        `;
      case 'typeB':
        return `
          color: ${colors.black};
          font-size:13px;
        `;
      case 'typeC':
        return `
          color: ${colors.black};
          font-size:9px;
        `;
      case 'typeD':
        return `
        color: ${colors.buttonBorder};
          font-weight: 700;
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
  <Button onPress={onPress} variant={props.variant} label={props.label} style={props.viewStyle}>
    <ContentContainer>
      <ButtonText mode={props.variant}>{props.label + ' '}</ButtonText>
      {props.backArrow && <FrontArrow />}
    </ContentContainer>
  </Button>
);
