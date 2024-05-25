// ThemeContext.tsx
import React, { createContext, useState, useContext, type ReactNode, type FC  } from 'react';

type ThemeContextType = {
  theme: string;
  colors: Record<string, string>;
  toggleTheme: () => void;
}

const lightColors = {
  buttonBackground: 'FFFFFF',
  background: '#FFFFFF',
  text: '#000000',
  primary: '#3498db',
  secondary: '#f39c12',
};


const darkColors = {
  primaryBackgroundColor: '#000000',
  secondaryBackgroundColor: '#232627',
  appScreenPrimaryBackground: "#292F3F",
  searchContainer: "rgba(0, 0, 0, 0.25)",
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
  cellSelectedBorderColor: "#000000",
  cellUnSelectedColor: '#232627',
  cellUnSelectedBorderColor: "#FFFFFF",
  cardBackgroundColor: '#232627',
  cardShadowColor: '#000000',
  cardGenreCellBgColor: '#f0f0f0',
  cardGenreCellTextColor: '#292F3F',
  cardUserStatusStyle: '#B0B0B0'

};

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    colors: lightColors,
    toggleTheme() {},
});

export const ThemeProvider:  FC<{ children: ReactNode }> = ({ children  }): JSX.Element => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
