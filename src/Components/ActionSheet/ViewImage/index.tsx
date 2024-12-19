import React from 'react';
import {View, StyleSheet} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Gallery from 'react-native-awesome-gallery';

const computeImages = (images?: string | string[]) => {
  if (typeof images === 'string') {
    return [images];
  }

  return images;
};

function ViewImage({payload}: SheetProps<'ViewProfileImage-sheet'>) {
  return (
    <ActionSheet containerStyle={styles.actionSheetContainer}>
      <View style={styles.fullScreen}>
        <Gallery
          onSwipeToClose={() => {
            SheetManager.hide('ViewProfileImage-sheet');
          }}
          style={{flex: 1}}
          data={computeImages(payload?.imageUrl) ?? []}
        />
      </View>
    </ActionSheet>
  );
}

export default ViewImage;

const styles = StyleSheet.create({
  fullScreen: {
    height: '100%',
    width: '100%',
  },
  actionSheetContainer: {
    backgroundColor: 'black',
  },
});
