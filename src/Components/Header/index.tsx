 
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {HeaderBackArrow} from '../../Assets/Images';
import {horizontalScale, verticalScale} from '../../Functions/StyleScale';
import { useTheme } from '../../useContexts/Theme/ThemeContext';
import { getHeaderStyles } from './styles';

const Container = styled(View)<{drawer?: boolean}>`
  padding: 20px 0 0 0;
  align-items: flex-start;
`;

const leftFeatureHandler = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
): void => {
    navigation.goBack();
  }

const Header = () => {
  const navigation = useNavigation();
  const {colors} = useTheme()
  const styles = getHeaderStyles(colors)

  return (
    <Container>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => {
          leftFeatureHandler(navigation);
        }}>
          <HeaderBackArrow
            width={horizontalScale(9.26)}
            height={verticalScale(16)}
          />
      </TouchableOpacity>
      </Container>
  );
};

export default Header;
