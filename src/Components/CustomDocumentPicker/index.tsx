 
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image, type TextStyle} from 'react-native';
import DocumentPicker, { type DocumentPickerResponse } from 'react-native-document-picker';
import {Typography} from '..';
import {colors} from '../../DesignTokens/Colors';
import {moderateScale} from '../../Functions/StyleScale';
import { type ViewStyle } from 'react-native';

// Define the type for the props
type DocumentPickerProps = {
  buttonStyles?: ViewStyle;
  buttonTextStyles?: TextStyle;
  containerStyles?: ViewStyle;
  onDocumentPick: (result: unknown) => void;
};

export const CustomDocumentPicker = ({
  buttonStyles,
  buttonTextStyles,
  containerStyles,
  onDocumentPick,
}: DocumentPickerProps) => {
  const [selectedDocument, setSelectedDocument] = useState<DocumentPickerResponse>();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedDocument(result[0]);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Document picker cancelled');
      } else {
        console.error('Error picking document:', error);
      }
    }
  };

  useEffect(() => {
    if(selectedDocument){
      onDocumentPick(selectedDocument);
    }
   
  }, [selectedDocument])

  const removeDocument = () => {
    setSelectedDocument(undefined);
  };  

  return (
    <View style={[styles.container, containerStyles]}>
      <TouchableOpacity
        onPress={pickDocument}
        style={[styles.button, buttonStyles]}
        disabled={typeof selectedDocument !== "undefined"} // Disable button if a document is already selected
      >
        <Typography
          bgColor={colors.black}
          size={'medium'}
          fontWeight="400"
          textStyle={[styles.buttonText, buttonTextStyles]}>
          {selectedDocument ? 'Document Selected' : 'Pick Document'}
        </Typography>
      </TouchableOpacity>

      {selectedDocument && (
        <View style={styles.selectedDocumentContainer}>
          {selectedDocument.type?.includes('image') && (
            <Image
              source={{uri: selectedDocument?.uri}}
              style={styles.selectedImage}
              resizeMode="contain"
            />
          )}
          {selectedDocument.type?.includes('pdf') && (
            <Text>PDF: {selectedDocument?.name}</Text>
          )}

          <TouchableOpacity
            onPress={removeDocument}
            style={styles.removeButton}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(10),
  },
  buttonText: {
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  removeButton: {
    borderRadius: moderateScale(5),
    marginLeft: moderateScale(10),
    padding: moderateScale(5),
  },

  selectedDocumentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: moderateScale(30),
  },

  selectedImage: {
    borderRadius: moderateScale(5),
    height: moderateScale(50),
    marginRight: moderateScale(10),
    width: moderateScale(50),
  },
});
