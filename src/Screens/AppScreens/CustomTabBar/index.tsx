import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Import your preferred icon library

const TabBarContainer = styled.View`
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
`;

const TabBarButton = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TabBarLabel = styled.Text<{ isFocused: boolean }>`
  color: ${(props) => (props.isFocused ? '#007AFF' : '#000')};
  margin-top: 5px; /* Adjust the spacing between icon and label */
`;

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => (
  <TabBarContainer>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      // Define icons for each route (adjust as needed)
      const getIconName = (routeName: string) => {
        switch (routeName) {
          case 'Home Bottom Screen':
            return 'home';
          case 'Settings':
            return 'settings';
          default:
            return 'ios-help'; // Default icon
        }
      };

      return (
        <TabBarButton
          key={index}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <Icon name={getIconName(route.name)} size={24} color={isFocused ? '#007AFF' : '#000'} />
          <TabBarLabel isFocused={isFocused}>{route.name}</TabBarLabel>
        </TabBarButton>
      );
    })}
  </TabBarContainer>
);

export default CustomTabBar;
