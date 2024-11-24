import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import ImageComponent from './ImageComponent';
import {ChatScreenStyles} from './styles';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';
import {moderateScale} from '../../../Functions/StyleScale';
import {Typography} from '../../../Components';

type PropsType = {
  images: string[] | string;
  styles: ChatScreenStyles;
  colors: DarkColors;
  id: string;
  errorText: string;
  uploadProgress: number;
  blurhash: string;
  uploadingImage?: boolean;
  openImage: (imageUrl: string[] | string) => void;
  cachePolicy: 'memory-disk' | 'memory' | 'disk' | 'none';
  retry?: boolean;
};

const MultiImageBox = ({
  images,
  colors,
  id,
  errorText,
  uploadProgress,
  blurhash,
  uploadingImage,
  openImage,
  cachePolicy,
  retry,
  ...props
}: PropsType) => {
  return (
    <TouchableOpacity onPress={() => openImage(images)}>
      <ImageComponent
        text={images[0]}
        styles={props.styles}
        colors={colors}
        id={id}
        errorText={errorText}
        uploadingImage={uploadingImage}
        uploadProgress={uploadProgress}
        cachePolicy="memory-disk"
        blurhash={blurhash}
        openImage={openImage}
      />
      {images.length > 1 && (
        <View style={styles.overlay}>
          <Typography
            textStyle={styles.moreText}
            bgColor={colors.textPrimaryColor}
            fontWeight={'400'}>
            +{images.length}
          </Typography>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
  },
  moreText: {
    fontSize: moderateScale(18),
  },
});

export default MultiImageBox;
