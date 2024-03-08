 
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {colors} from '../../DesignTokens/Colors';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import {Hamburger, HeaderBackArrow} from '../../Assets/Images';
import {horizontalScale, verticalScale} from '../../Functions/StyleScale';

type HeaderProps = {
  title: string;
  drawer?: boolean;
  center?: boolean;
};

const Container = styled(View)<{drawer?: boolean}>`
  flex-direction: row;
  padding: 16px 0 16px 16px;
  align-items: center;
  border-bottom-width: ${props => (props.drawer ? 0 : '1px')};
  border-color: ${props => (props.drawer ? colors.white : colors.headerBottom)};
`;

const Title = styled(Text)<{drawer?: boolean, textCenter?: boolean}>`
  color: ${({drawer}) => (drawer ? colors.homeTitle : colors.black)};
  margin-left: 10px;
  font-size: 16px;
  flex: 1;
  text-align: ${({textCenter})=> textCenter ? "center" : "left"};
  padding-right: 30px;
`;

const leftFeatureHandler = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  drawer?: boolean,
): void => {
  if (drawer) {
    navigation.dispatch(DrawerActions.openDrawer());
  } else {
    navigation.goBack();
  }
};

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <Container drawer={props.drawer}>
      <TouchableOpacity
        onPress={() => {
          leftFeatureHandler(navigation, props.drawer);
        }}>
        {props.drawer ? (
          <Hamburger width={horizontalScale(23)} height={verticalScale(16)} />
        ) : (
          <HeaderBackArrow
            width={horizontalScale(9.26)}
            height={verticalScale(16)}
          />
        )}
      </TouchableOpacity>
      <Title textCenter={props.center} drawer={props.drawer}>{props.title}</Title>
    </Container>
  );
};

export default Header;
