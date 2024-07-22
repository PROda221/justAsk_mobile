import React, {useEffect} from 'react';
import {ImageColorsResult, getColors} from 'react-native-image-colors';

type ColorType = {
  primary: string;
  secondary: string;
};

export const useImageColors = (
  imageUrl: string,
  dependency?: string | null,
) => {
  const [imageColors, setImageColors] = React.useState<ColorType | null>(null);

  React.useEffect(() => {
    const url = dependency ?? imageUrl;

    console.log('image inside get colors :', imageUrl);

    getColors(url, {
      fallback: '#228B22',
      cache: true,
      key: url,
    }).then(res => getDominentColor(res));
  }, [dependency]);

  const getDominentColor = (res: ImageColorsResult) => {
    switch (res?.platform) {
      case 'android':
        setImageColors(prev => {
          return {...prev, primary: res.average, secondary: res.darkMuted};
        });
        break;
      case 'ios':
        setImageColors(prev => {
          return {...prev, primary: res.primary, secondary: res.secondary};
        });
        break;
    }
  };

  return {imageColors};
};
