import React, {type ReactNode} from 'react';
import {View} from 'react-native';
import {Typography} from '../Typography';
import styled from 'styled-components';
import {CustomButton} from '..';

type PropsTypes = {
  buttonOnPress?: () => void;
  buttonVariant?: 'typeA' | 'typeB' | 'typeC' | 'typeD';
  title: string;
  fontColor: string;
  fontSize: 'small' | 'medium' | 'large';
  fontWeight: string;
  buttonTitle?: string;
  buttonImg?: boolean;
};

const Header = styled(View)`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Conatiner = styled(View)`
  padding-bottom: 15px;
`;

const CardContainer = (
  props: PropsTypes & Readonly<{children?: ReactNode}>,
) => (
  <Conatiner>
    <Header>
      <Typography
        bgColor={props.fontColor}
        size={props.fontSize}
        fontWeight={props.fontWeight}>
        {props.title}
      </Typography>

      {props.buttonTitle && (
        <CustomButton
          onPress={props.buttonOnPress}
          label={props.buttonTitle}
          variant={props.buttonVariant}
          backArrow={props.buttonImg}
        />
      )}
    </Header>
    {props.children}
  </Conatiner>
);

export default CardContainer;
