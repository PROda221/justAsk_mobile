import React from 'react';
import {View} from 'react-native';
import {
  GiphyContent,
  GiphyGridView,
  GiphyMediaType,
  GiphySDK,
} from '@giphy/react-native-sdk';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {TextInput} from '../../TextInput';
import {useForm} from 'react-hook-form';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getGiphyPopupStyles} from './styles';
import {Image} from 'expo-image';
import {GiphyTrademark} from '../../../Assets/Images';

// Configure API keys
GiphySDK.configure({apiKey: 'GMHTsoA3C2Kl3FxvhM2Lw0rw0lA9YBFw'});

export default function App() {
  const {control, watch} = useForm();
  const {colors} = useTheme();
  const styles = getGiphyPopupStyles(colors);
  const allFields = watch('search');

  return (
    <ActionSheet
      closeOnTouchBackdrop={true}
      closeOnPressBack={true}
      containerStyle={styles.actionSheet}>
      <View style={styles.container}>
        <TextInput
          viewStyle={styles.textInput}
          name="search"
          secureTextEntry={false}
          control={control}
          label="Search"
          placeholder="Search..."
          leftIcon="search"
        />
      </View>
      <GiphyGridView
        content={GiphyContent.search({
          searchQuery: allFields,
          mediaType: GiphyMediaType.Gif,
        })}
        cellPadding={3}
        style={styles.giphyGridStyle}
        onMediaSelect={e => {
          SheetManager.hide('GiphyPopup-sheet', {
            payload: e.nativeEvent.media.data.images.downsized_medium.url,
          });
        }}
      />
      <View style={styles.trademarkContainer}>
        <Image
          source={GiphyTrademark}
          style={styles.giphyTrademarkImg}
          contentFit="contain"
          transition={500}
        />
      </View>
    </ActionSheet>
  );
}
