import {ScrollView, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton, Typography} from '../../../Components';
import styled from 'styled-components';
import {
  type SelectGenresScreenStyles,
  getSelectGenresScreenStyles,
} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Header from '../../../Components/Header';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {type ParamListBase, type RouteProp} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {allGenres} from '../../../Constants';
import GenreSelector from './GenreSelector';
import {useSignIn} from '../../../CustomHooks/AuthHooks/useSIgnIn';
import {type DarkColors} from '../../../useContexts/Theme/ThemeType';
import content from '../../../Assets/Languages/english.json';

type Params = {
  params: {
    data: {
      emailId: string;
      password: string;
      username: string;
    };
  };
};
type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<Params>;
};

let adviceGenre: string[] = ['', '', ''];

const RenderTitle = ({
  styles,
  colors,
}: {
  styles: SelectGenresScreenStyles;
  colors: DarkColors;
}) => (
  <>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {content.SelectGenres.title1}
    </Typography>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.title}>
      {content.SelectGenres.title2}
    </Typography>
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="400"
      textStyle={styles.subTitle}>
      {content.SelectGenres.subtitle}
    </Typography>
  </>
);

const SelectGenres = ({navigation, route}: Props): JSX.Element => {
  const {emailId, password, username} = route.params.data;
  const {callSignUpApi, signUpError, signUpLoading} = useSignIn(
    navigation,
    'LandingScreen',
    'Login',
  );
  const Scroll = styled(ScrollView)`
    flex-grow: 1;
  `;

  const {colors} = useTheme();

  const styles = getSelectGenresScreenStyles(colors);

  const handleSignUp = () => {
    callSignUpApi({emailId, password, username, adviceGenre});
  };

  const handleSelectedValues = (value: string[]) => {
    adviceGenre = value;
  };

  const renderError = () => (
    <View>
      <Typography
        bgColor={colors.errorTextPrimary}
        size="medium"
        fontWeight="400"
        textStyle={styles.errorStyle}>
        {signUpError?.message}
      </Typography>
    </View>
  );

  const renderList = () => (
    <>
      <GenreSelector
        getSelectedValues={handleSelectedValues}
        genres={allGenres}
      />
      {signUpError && renderError()}
      <View style={styles.buttonContainer}>
        <CustomButton
          loading={signUpLoading}
          label="Sign Up"
          radius={14}
          onPress={handleSignUp}
        />
      </View>
    </>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Animated.View
          entering={FadeInUp.duration(1000)}
          style={styles.mainContainer}>
          <Header />
          <Scroll>
            <View style={styles.titleContainer}>
              <RenderTitle styles={styles} colors={colors} />
            </View>
            <View style={styles.formContainer}>{renderList()}</View>
          </Scroll>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SelectGenres;
