import React from 'react';
import styled from 'styled-components/native';
import {Card} from 'react-native-paper';
import {View, type ImageSourcePropType} from 'react-native';
import {CustomButton, Typography} from '..';
import content from '../../Assets/Languages/english.json';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type CustomCardProps = {
  mode: 'elevated' | 'outlined' | 'contained';
  onPress: () => void;
  onPressReadMore?: () => void;
  title: string;
  imageSource?: ImageSourcePropType;
  variant: 'small' | 'medium' | 'large';
  data?: Array<{label: string; icon: string}>;
};

const getCardStyles = (variant: CustomCardProps['variant']) => {
  switch (variant) {
    case 'small':
      return `
        margin: 15px 5px 15px 5px;
        width: 192px;
        height: 220px;
        border-radius: 15px;
        elevation: 5;
        background-color: black;
      `;
    case 'medium':
      return `
        width: 120px;
        height: 120px;
        border-radius: 240px;
        background-color: red;
      `;
    case 'large':
      return `
        background-color: white;
        margin: 15px;
        width: 160px;
        height: 240px;
        border-radius:15px;
      `;
    default:
      return '';
  }
};

const getCardCoverStyles = (variant: CustomCardProps['variant']) => {
  switch (variant) {
    case 'small':
      return `
        width:100%;
        border-top-right-radius:15px;
        border-top-left-radius:15px;
        border-bottom-left-radius:0px;
        border-bottom-right-radius:0px;
        height:121px
      `;
    case 'medium':
      return `
        border-radius: 240px;
        width: 120px;
        height: 120px;
        padding: 2px;
        border-width: 1px;
        border-color: #000; 
      `;
    case 'large':
      return `
        border-radius: 15px;
        width: 160px;
        height: 240px;
        overflow: hidden;
      `;
    default:
      return '';
  }
};

const StyledCard = styled(Card)<{variant: CustomCardProps['variant']}>`
  ${({variant}) => getCardStyles(variant)}
`;

const StyledCardCover = styled(Card.Cover)<{
  variant: CustomCardProps['variant'];
}>`
  ${({variant}) => getCardCoverStyles(variant)}
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

const TitleView = styled.View`
  align-items: center;
  margin-top: 15px;
`;

const DetailsView = styled.View`
  flex-direction: row;
`;

const ButtonView = styled.View<{variant: CustomCardProps['variant']}>`
  z-index: 1000;
  position: absolute;
  bottom: -20px;
  align-self: center;
`;

export const CustomCard: React.FC<CustomCardProps> = ({
  variant,
  onPress,
  title,
  imageSource,
}) =>
  variant === 'small' ? (
    <StyledCard onPress={onPress} variant={variant}>
      <View style={{zIndex: 1, alignItems: 'center'}}>
        <StyledCardCover variant={variant} source={imageSource} />
        <View style={{zIndex: 1}}>
          <TitleView>
            <Typography
              bgColor={'white'}
              type="labelLarge"
              size="large"
              fontWeight="600">
              {title}
            </Typography>
          </TitleView>
          <StyledCardContent>
            <StyledView>
              <DetailsView>
                <MaterialIcons name={'verified'} size={15} color="white" />
                <Typography
                  bgColor={'white'}
                  type="labelMedium"
                  size="medium"
                  fontWeight="600">
                  {content.homeScreen.hello}
                </Typography>
              </DetailsView>
              <DetailsView>
                <MaterialIcons name={'verified'} size={15} color="white" />
                <Typography
                  bgColor={'white'}
                  type="labelMedium"
                  size="medium"
                  fontWeight="600">
                  {content.homeScreen.world}
                </Typography>
              </DetailsView>
            </StyledView>
            <Typography
              bgColor={'white'}
              type="labelMedium"
              size="medium"
              fontWeight="600">
              {content.homeScreen.world}
            </Typography>
          </StyledCardContent>
        </View>
      </View>
      <ButtonView>
        <CustomButton onPress={onPress} label={'Read More'} variant={'typeC'} />
      </ButtonView>
    </StyledCard>
  ) : (
    <StyledCard onPress={onPress} variant={variant}>
      <StyledCardCover variant={variant} source={imageSource} />
    </StyledCard>
  );
