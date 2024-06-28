// ThemeContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type FC,
} from 'react';
import {type DarkColors} from './ThemeType';

type ThemeContextType = {
  theme: string;
  colors: DarkColors;
  toggleTheme: () => void;
};

const lightColors = {
  buttonBackground: 'FFFFFF',
  background: '#FFFFFF',
  text: '#000000',
  primary: '#3498db',
  secondary: '#f39c12',
};

const darkColors: DarkColors = {
  primaryBackgroundColor: '#000000',
  secondaryBackgroundColor: '#232627',
  appScreenPrimaryBackground: '#292F3F',
  searchContainer: 'rgba(0, 0, 0, 0.25)',
  textPrimaryColor: '#FFFFFF',
  iconPrimaryColor: '#FFFFFF',
  textInputBackgroundColor: '#232627',
  textInputPlaceholderColor: '#C2C3CB',
  buttonTextColor: '#FFFFFF',
  loginOptionsTextColor: '#ACADB9',
  googleButtonColor: 'rgba(212, 70, 56, 0.25)',
  googleButtonTextColor: 'rgba(212, 70, 56, 0.50)',
  backButtonContainerColor: '#232627',
  seperatorColor: '#C2C3CB',
  otpPrimaryColor: '#FFFFFF',
  otpSecondaryColor: '#C2C3CB',
  background: '#1E1E1E',
  errorTextPrimary: 'rgba(212, 70, 56, 1)',
  errorTextSecondary: '#FFCB45',
  errorBoundary: '#FFCB45',
  selectedGenre: '#FFCB45',
  cellSelectedColor: '#00c853',
  cellSelectedBorderColor: '#000000',
  cellUnSelectedColor: '#232627',
  cellUnSelectedBorderColor: '#FFFFFF',
  cardBackgroundColor: '#232627',
  cardShadowColor: '#000000',
  cardGenreCellBgColor: '#f0f0f0',
  cardGenreCellTextColor: '#292F3F',
  cardUserStatusStyle: '#B0B0B0',
  sentMsgColor: '#272A35',
  receivedMsgColor: '#373E4E',
  profileRing: '#242760',
  blockIconColor: '#fff',
  commentBoxColor: '#fff',
  starColor: '#ffe234',
  buttonLoader: '#FFCB45',
  settingsIcons: '#f0f0f0',
  settingsSeperator: '#333',
  settingsIconColor: '#FFFFFF',
  settingsLogoutColor: 'rgba(212, 70, 56, 1)',
  settingsDeleteColor: 'rgba(212, 70, 56, 1)',
  editProfileButtonBgColor: '#FFFFFF',
  toastSuccessBgColor: '#6FCF97',
  toastSuccessTitleColor: '#0F552C',
  toastSuccessTextColor: '#135E32',
  toastSuccessIconColor: '#0F552C',
  toastErrorBgColor: '#EB5757',
  toastErrorTitleColor: '#530C0C',
  toastErrorTextColor: '#7C2424',
  toastErrorIconColor: '#530C0C',
  toastInfoBgColor: '#F2C94C',
  toastInfoTitleColor: '#6E5404',
  toastInfoTextColor: '#866912',
  toastInfoIconColor: '#6E5404',
  infoBoxBgColor: '#F2C94C',
  infoBoxBorderColor: '#F2C94C',
  infoBoxTextColor: '#333',
  infoBoxIconColor: '#6E5404',
  errorBoxBgColor: '#EB5757',
  errorBoxBorderColor: '#EB5757',
  errorBoxTextColor: '#333',
  errorBoxIconColor: '#530C0C',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: darkColors,
  toggleTheme() {},
});

export const ThemeProvider: FC<{children: ReactNode}> = ({
  children,
}): JSX.Element => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? darkColors : darkColors;

  return (
    <ThemeContext.Provider value={{theme, colors, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
