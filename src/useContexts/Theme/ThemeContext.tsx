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
  textPrimaryColor: '#FFFFFF',
  textInputBackgroundColor: '#232627',
  textInputPlaceholderColor: '#C2C3CB',
  buttonTextColor: '#FFFFFF',
  loginOptionsTextColor: '#ACADB9',
  googleButtonColor: 'rgba(212, 70, 56, 0.25)',
  googleButtonTextColor: 'rgba(212, 70, 56, 0.50)',
  backButtonContainerColor: '#232627',
  seperatorColor: '#C2C3CB',
  background: '#1E1E1E',
  text: '#FFFFFF',
  primary: '#3498db',
  secondary: '#f39c12',
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