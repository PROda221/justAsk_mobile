import React from 'react';
import styled from 'styled-components/native';
import {Card} from 'react-native-paper';
import {View, type ImageSourcePropType, StyleSheet} from 'react-native';
import {CustomButton, Typography} from '..';
import content from '../../Assets/Languages/english.json';
import {colors} from '../../DesignTokens/Colors';
import {type HomeScreenType} from '../../Assets/Languages/englishTypes';
import {Tick} from '../../Assets/Images';
import {horizontalScale, verticalScale} from '../../Functions/StyleScale';

const homeScreenContent: HomeScreenType = content.homeScreen;

type CustomCardProps = {
  onPress: () => void;
  onPressReadMore?: () => void;
  title: string;
  imageSource?: ImageSourcePropType;
  variant: 'small' | 'medium' | 'large';
  data?: Array<{label: string; icon: string}>;
  courseFee?: string;
  courseDuration?: string;
  courseType?: string;
};

const getCardStyles = (variant: CustomCardProps['variant']) => {
  switch (variant) {
    case 'small':
      return `
        width: 175px;
        height: 236px;
        border-radius: 15px;
        elevation: 5;
        background-color: ${colors.black};
      `;
    case 'medium':
      return `
        width: 120px;
        height: 120px;
        border-radius: 240px;
      `;
    case 'large':
      return `
        background-color: ${colors.white};
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
        padding: 5px;
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
  margin: 15px 5px 15px 5px;
  ${({variant}) => getCardStyles(variant)};
`;

const StyledCardCover = styled(Card.Cover)<{
  variant: CustomCardProps['variant'];
}>`
  ${({variant}) => getCardCoverStyles(variant)};
`;

const StyledView = styled.View`
  padding-top: 10px;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const TitleView = styled.View`
  align-items: center;
  padding-top: 15px;
`;

const DetailsView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FeeContainer = styled.View`
  padding: 10px 0 10px 0;
`;

const ButtonView = styled(View)`
  z-index: 1000;
  align-items: center;
  margin-top: 5px;
`;

export const CustomCard: React.FC<CustomCardProps> = ({
  variant,
  onPress,
  title,
  imageSource,
  courseFee = '',
  courseDuration = '',
  courseType = '',
}) => (
  <StyledCard onPress={onPress} variant={variant}>
    {variant === 'small' ? (
      <View>
        <View style={styles.zIndex1}>
          <StyledCardCover variant={variant} source={imageSource} />
          <TitleView>
            <Typography
              numberOfLines={1}
              bgColor={colors.white}
              size="medium"
              fontWeight="700"
              textStyle={{maxWidth: horizontalScale(155)}}>
              {title}
            </Typography>
          </TitleView>
          <StyledView>
            <DetailsView>
              <Tick
                width={horizontalScale(15)}
                height={verticalScale(15)}
                style={styles.imageContainer}
              />
              <Typography
                numberOfLines={1}
                textStyle={{maxWidth: horizontalScale(75)}}
                bgColor={colors.white}
                size="small"
                fontWeight="400">
                {' ' + courseDuration}
              </Typography>
            </DetailsView>
            <DetailsView>
              <Tick
                width={horizontalScale(15)}
                height={verticalScale(15)}
                style={styles.imageContainer}
              />
              <Typography
                numberOfLines={1}
                textStyle={{maxWidth: horizontalScale(75)}}
                bgColor={colors.white}
                size="small"
                fontWeight="400">
                {' ' + courseType}
              </Typography>
            </DetailsView>
          </StyledView>
          {courseFee && (
            <FeeContainer>
              <Typography bgColor={colors.white} size="small" fontWeight="400">
                {'Fees : ' + courseFee}
              </Typography>
            </FeeContainer>
          )}
        </View>
        <ButtonView>
          <CustomButton
            onPress={onPress}
            label={homeScreenContent.viewAll}
            variant={'typeC'}
          />
        </ButtonView>
      </View>
    ) : (
      <StyledCardCover variant={variant} source={imageSource} />
    )}
  </StyledCard>
);

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 4,
  },
  zIndex1: {
    zIndex: 1,
  },
});
