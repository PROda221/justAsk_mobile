import React, {useState} from 'react';
import {Image} from 'expo-image';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Typography} from '../../../Components';
import {ProgressBar} from '../../../Components/ProgressBar';
import {ChatScreenStyles} from './styles';
import {DarkColors} from '../../../useContexts/Theme/ThemeType';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../../Functions/StyleScale';

type ImageStatus = {
  loading: boolean;
  error: boolean;
  retryKey: number;
};

type PropsType = {
  text: string;
  styles: ChatScreenStyles;
  colors: DarkColors;
  id: string;
  errorText: string;
  uploadProgress: number;
  blurhash: string;
  uploadingImage?: boolean;
  openImage?: (imageUrl: string) => void;
  cachePolicy: 'memory-disk' | 'memory' | 'disk' | 'none';
  retry?: boolean;
};

const ImageComponent = ({
  text,
  styles,
  colors,
  id,
  errorText,
  uploadProgress,
  blurhash,
  uploadingImage,
  openImage,
  cachePolicy,
  retry,
}: PropsType) => {
  const [imageStatus, setImageStatus] = useState<ImageStatus>({
    loading: false,
    error: false,
    retryKey: 0,
  });

  const handleRetry = () => {
    setImageStatus(prev => ({
      ...prev,
      error: false,
      retryKey: prev.retryKey + 1,
    }));
  };

  const renderErrorIcon = () => (
    <>
      <MaterialCommunityIcons
        onPress={handleRetry}
        name="reload-alert"
        size={moderateScale(30)}
        color={colors.iconPrimaryColor}
      />
      {renderErrorMessage()}
    </>
  );

  const renderErrorMessage = () => (
    <Typography
      textStyle={styles.imageErrorText}
      bgColor={colors.textPrimaryColor}
      fontWeight="400">
      {errorText}
    </Typography>
  );

  const renderLoadingIndicator = () => <ActivityIndicator size="large" />;

  const renderImageStatus = () => (
    <View style={styles.imageStatusView}>
      {imageStatus.error && (retry ? renderErrorIcon() : renderErrorMessage())}
      {imageStatus.loading && renderLoadingIndicator()}
    </View>
  );

  const HandlingImageStates = () => {
    return imageStatus.error || imageStatus.loading
      ? renderImageStatus()
      : null;
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={!imageStatus.error && !imageStatus.loading ? 0 : 1}
        onPress={() => {
          if (!imageStatus.error && !imageStatus.loading) {
            openImage?.(text);
          }
        }}>
        <Image
          key={imageStatus.retryKey}
          onError={() => {
            setImageStatus(prev => ({...prev, loading: false, error: true}));
          }}
          onLoadStart={() => {
            setImageStatus(prev => ({...prev, loading: true, error: false}));
          }}
          onLoadEnd={() => {
            setImageStatus(prev => ({...prev, loading: false}));
          }}
          contentFit="cover"
          cachePolicy={cachePolicy}
          source={{uri: `${text}`}}
          style={styles.imageChat}
          placeholder={{blurhash: blurhash}}
          recyclingKey={id}
        />
        {HandlingImageStates()}
      </TouchableOpacity>

      <View>{uploadingImage && <ProgressBar progress={uploadProgress} />}</View>
    </View>
  );
};

export default ImageComponent;
