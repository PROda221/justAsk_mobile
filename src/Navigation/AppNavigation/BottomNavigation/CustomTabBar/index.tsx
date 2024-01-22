import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {
  type BottomTabNavigationEventMap,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  type NavigationHelpers,
  type ParamListBase,
} from '@react-navigation/native';
import {
  Account,
  Courses,
  Hearts,
  HomeButtonTab,
  Monetization,
} from '../../../../Assets/Images';
import {colors} from '../../../../DesignTokens/Colors';

const TabBarContainer = styled.View<{bgColor: string}>`
  flex-direction: row;
  background-color: ${props => props.bgColor};
`;

const TabBarButton = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 81px;
`;

const TabBarLabel = styled.Text<{isFocused: boolean}>`
  color: ${props => (props.isFocused ? '#007AFF' : '#000')};
  font-size: 13px;
  font-weight: 700;
  font-family: 'Segoe UI';
`;

const CenterHome = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px 0 0 0;
`;

const onPress = (
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>,
  key: string,
  name: string,
  isFocused: boolean,
) => {
  const event = navigation.emit({
    type: 'tabPress',
    target: key,
    canPreventDefault: true,
  });

  if (!isFocused && !event.defaultPrevented) {
    navigation.navigate(name);
  }
};

const renderIcon = (routeName: string) => {
  switch (routeName) {
    case 'Home Screen':
      return (
        <CenterHome>
          <HomeButtonTab width={58} height={58} />
        </CenterHome>
      );
    case 'Courses':
      return <Courses width={18} height={20} />;
    case 'Fees':
      return <Monetization width={20} height={20} />;
    case 'About Us':
      return <Hearts width={20} height={18} />;
    case 'Account':
      return <Account width={20} height={20} />;
    default:
      return <Hearts />;
  }
};

const renderTab = (routeName: string, isFocused: boolean): JSX.Element => (
  <>
    {renderIcon(routeName)}
    {
      <TabBarLabel isFocused={isFocused}>
        {routeName === 'Home Screen' ? '' : routeName}
      </TabBarLabel>
    }
  </>
);

const CustomTabBar: React.FC<BottomTabBarProps> = ({state, navigation}) => (
  <TabBarContainer bgColor={colors.tabBarBackground}>
    {state.routes.map((route, index) => {
      const isFocused = state.index === index;

      return (
        <TabBarButton
          key={index}
          onPress={() => {
            onPress(navigation, route.key, route.name, isFocused);
          }}>
          {renderTab(route.name, isFocused)}
        </TabBarButton>
      );
    })}
  </TabBarContainer>
);

export default CustomTabBar;
