import React from 'react';
import styled from 'styled-components/native';
import { Card } from 'react-native-paper';
import { type ImageSourcePropType } from 'react-native';
import { Typography } from '..';
import content from '../../Assets/Languages/english.json';
type CustomCardProps = {
  mode: 'elevated' | 'outlined' | 'contained';
  onPress: () => void;
  title: string;
  imageSource?: ImageSourcePropType;
};

type StyledButtonType = {
  mode: 'elevated' | 'outlined' | 'contained';
  onPress: () => void;
};

const StyledCard = styled(Card)<StyledButtonType>`
  margin: 10px;
  background-color: black;
  width: 250px;
  height: 300px;
  border-radius: 15px;
`;

const StyledCardCover = styled(Card.Cover)`
  border-radius: 15px;
`;

const StyledCardContent = styled(Card.Content)`
  justify-content: center;
  align-items: center;
`;

const StyledView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px;
`;

export const CustomCard: React.FC<CustomCardProps> = ({ ...props }) => (
  <StyledCard onPress={props.onPress} mode={props.mode}>
    <StyledCardCover source={props.imageSource} />

    <Typography bgColor="white" type="labelMedium" size="medium">
      {props.title}
    </Typography>
    <StyledCardContent>
      <StyledView>
        <Typography bgColor="white" type="labelMedium" size="medium">
          {content.homeScreen.hello}
        </Typography>
        <Typography bgColor="white" type="labelMedium" size="medium">
          {content.homeScreen.world}
        </Typography>
      </StyledView>
      <Typography bgColor="white" type="labelMedium" size="medium">
        {content.homeScreen.world}
      </Typography>
    </StyledCardContent>
  </StyledCard>
);
