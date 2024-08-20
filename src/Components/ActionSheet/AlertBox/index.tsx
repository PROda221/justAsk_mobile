import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Typography} from '../../Typography';
import {Feather} from '@expo/vector-icons';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getAlertBoxStyles} from './styles';

const AlertBox = ({payload}: SheetProps<'AlertBox-sheet'>) => {
  const {colors} = useTheme();
  const styles = getAlertBoxStyles(colors);

  return (
    <ActionSheet
      containerStyle={styles.actionSheet}
      closeOnTouchBackdrop={false}
      closeOnPressBack={false}>
      <View style={styles.container}>
        <View style={styles.center}>
          <Feather name="alert-triangle" size={100} color={colors.alertIcon} />
          <Typography
            fontWeight="400"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.title}>
            {payload?.title}
          </Typography>
          <Typography
            fontWeight="400"
            bgColor={colors.textInputPlaceholderColor}
            textStyle={styles.subtitle}>
            {payload?.description}
          </Typography>
        </View>
        {payload?.onPressCancel ? (
          <View style={styles.cancelOkContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={payload?.onPressCancel}>
              <Typography
                fontWeight="400"
                bgColor={colors.noInternetRetryButton}
                textStyle={styles.buttonText}>
                {payload?.cancelCustomName ?? 'Cancel'}
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={payload?.onPressOk}>
              <Typography
                fontWeight="400"
                bgColor={colors.noInternetRetryButton}
                textStyle={styles.buttonText}>
                {payload?.confirmCustomName ?? 'Yes'}
              </Typography>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={payload?.onPressOk}>
            <Typography
              fontWeight="400"
              bgColor={colors.noInternetRetryButton}
              textStyle={styles.buttonText}>
              {'Ok'}
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    </ActionSheet>
  );
};

export default AlertBox;
