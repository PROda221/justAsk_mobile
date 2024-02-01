import React, {type FunctionComponent} from 'react';
import {type DrawerNavigationProp} from '@react-navigation/drawer';
import styled from 'styled-components/native';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {type DrawerParamList, type DrawerScreens} from '../../../types';
import {
  HomeIcon,
  Bag,
  AboutUs,
  CampusCourses,
  ContactUs,
  Fees,
  Login,
  LstTeen,
  Shield,
} from '../../../../Assets/Images';
import {type SvgProps} from 'react-native-svg';
import content from '../../../../Assets/Languages/english.json';
import {type NavigationType} from '../../../../Assets/Languages/englishTypes';
import {colors} from '../../../../DesignTokens/Colors';
import {BackButton} from '../../../../Assets/Images';
import {horizontalScale, verticalScale} from '../../../../Functions/StyleScale';

const navigationContent: NavigationType = content.navigation as NavigationType;

type CustomDrawerContentProps = {
  navigation: DrawerNavigationProp<DrawerParamList, DrawerScreens>;
};

type CustomDrawerItemProps = {
  label: string;
  onPress: () => void;
  Icon: FunctionComponent<SvgProps>;
  width: number;
  height: number;
  last?: boolean;
};

const DrawerContentContainer = styled.View`
  flex: 1;
  background-color: #ffffff; /* Customize background color */
`;
const DrawerHeader = styled.View`
  padding: 4px;
`;

const DrawerContentInnerContainer = styled.View`
  flex: 1;
  margin: 15px;
  border-width: 1px;
  border-color: #d9c9c9;
  border-radius: 10px;
`;
const CustomDrawerItemLabel = styled.Text<{fontColor: string}>`
  font-size: 14px;
  font-family: 'Inter-Medium';
  color: ${props => props.fontColor};
  font-weight: 500;
  text-align: center;
  padding-left: 15px;
`;

const IconContainer = styled.View`
  width: 24px;
  align-items: center;
`;

const Line = styled.View`
  height: 1px;
  background-color: black;
  opacity: 0.2;
  flex: 1;
  margin-left: 38px;
`;
const CustomDrawerItemContainer = styled.TouchableOpacity`
  padding: 16px 0 16px 16px;
`;
const CustomDrawerItemLabelContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-bottom: 15px;
`;

const DrawerContentScrollViewContainer = styled(ScrollView)`
  flex-grow: 1;
`;

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  navigation,
}) => {
  const handleDrawerItemClick = (screen: DrawerScreens) => {
    navigation.navigate(screen);
    navigation.closeDrawer();
  };

  const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({
    label,
    onPress,
    Icon,
    width,
    height,
    last,
  }) => (
    <CustomDrawerItemContainer onPress={onPress}>
      <CustomDrawerItemLabelContainer>
        <IconContainer>
          <Icon width={width} height={height} />
        </IconContainer>
        <CustomDrawerItemLabel fontColor={colors.black}>
          {label}
        </CustomDrawerItemLabel>
      </CustomDrawerItemLabelContainer>
      {!last && <Line />}
    </CustomDrawerItemContainer>
  );

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentContainer>
        <DrawerHeader>
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
            }}>
            <BackButton
              width={horizontalScale(25)}
              height={verticalScale(25)}
            />
          </TouchableOpacity>
        </DrawerHeader>
        <DrawerContentInnerContainer>
          <DrawerContentScrollViewContainer>
            <CustomDrawerItem
              label={navigationContent.homePage}
              onPress={() => {
                handleDrawerItemClick('HomePage');
              }}
              Icon={HomeIcon}
              width={32}
              height={26}
            />
            <CustomDrawerItem
              label={navigationContent.onlineCourses}
              onPress={() => {
                handleDrawerItemClick('Online Courses');
              }}
              Icon={Bag}
              width={32}
              height={26}
            />
            <CustomDrawerItem
              label={navigationContent.levelQualifications}
              onPress={() => {
                handleDrawerItemClick('Level 4 Qualifications');
              }}
              Icon={Shield}
              width={32}
              height={26}
            />
            <CustomDrawerItem
              label={navigationContent.campusCourses}
              onPress={() => {
                handleDrawerItemClick('Campus Courses');
              }}
              Icon={CampusCourses}
              width={32}
              height={26}
            />
            <CustomDrawerItem
              label={navigationContent.lstTeen}
              onPress={() => {
                handleDrawerItemClick('LST-Teen');
              }}
              Icon={LstTeen}
              width={32}
              height={26}
            />
            <CustomDrawerItem
              label={navigationContent.Fees}
              onPress={() => {
                handleDrawerItemClick('Fees');
              }}
              Icon={Fees}
              width={32}
              height={26}
            />
            <CustomDrawerItem
              label={navigationContent.aboutUs}
              onPress={() => {
                handleDrawerItemClick('About Us');
              }}
              Icon={AboutUs}
              width={32}
              height={26}
            />
            <CustomDrawerItem
              label={navigationContent.contactUs}
              onPress={() => {
                handleDrawerItemClick('Contact Us');
              }}
              Icon={ContactUs}
              width={32}
              height={26}
            />
            <CustomDrawerItem
              label={navigationContent.Login}
              onPress={() => {
                handleDrawerItemClick('Login');
              }}
              Icon={Login}
              width={32}
              height={26}
              last={true}
            />
          </DrawerContentScrollViewContainer>
        </DrawerContentInnerContainer>
      </DrawerContentContainer>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {flex: 1},
});
