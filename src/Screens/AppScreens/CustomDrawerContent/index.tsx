import React from 'react';
import { DrawerContentScrollView, type DrawerNavigationProp } from '@react-navigation/drawer';
import styled from 'styled-components/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { type DrawerParamList, type DrawerScreens } from '../../../Navigation/types';

type CustomDrawerContentProps = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

type CustomDrawerItemProps = {
  label: string;
  onPress: () => void;
  icon: string;
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
  border-radius: 5px;
`;
const CustomDrawerItemLabel = styled.Text`
  margin-left: 16px;
  font-size: 16px;
`;

const IconContainer = styled.View`
  width: 24px;
  align-items: center;
`;

const Line = styled.View`
  height: 1px;
  background-color: #ccc;
  margin-top: 20px;
`;
const CustomDrawerItemContainer = styled.TouchableOpacity`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  margin-top: -40px;
  margin-bottom: 40px;
`;
const CustomDrawerItemLabelContainer = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const DrawerContentScrollViewContainer = styled(DrawerContentScrollView)`
  margin: 0;
`;

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ navigation }) => {
  const handleDrawerItemClick = (screen: DrawerScreens, params = undefined) => {
    navigation.navigate(screen, params);
    navigation.closeDrawer();
  };

  const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({ label, onPress, icon }) => (
    <CustomDrawerItemContainer onPress={onPress}>
      <IconContainer>
        <Icon name={icon} size={24} color="black" />
      </IconContainer>
      <CustomDrawerItemLabelContainer>
        <CustomDrawerItemLabel>{label}</CustomDrawerItemLabel>
        <Line />
      </CustomDrawerItemLabelContainer>
    </CustomDrawerItemContainer>
  );

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentContainer>
        <DrawerHeader>
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
            }}
          >
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        </DrawerHeader>
        <DrawerContentInnerContainer>
          <DrawerContentScrollViewContainer>
            <CustomDrawerItem
              label="Home Drawer"
              onPress={() => {
                handleDrawerItemClick('HomeDrawer');
              }}
              icon="home"
            />
            <CustomDrawerItem
              label="Home Drawer"
              onPress={() => {
                handleDrawerItemClick('HomeDrawer');
              }}
              icon="home"
            />
          </DrawerContentScrollViewContainer>
        </DrawerContentInnerContainer>
      </DrawerContentContainer>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
