import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {InteractionManager} from 'react-native';
import {ChatScreenStyles, getChatScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {uploadImages} from '../../../Functions/UploadImg';
import {updateImageUploadStatus} from '../../../DB/DBFunctions';
import Reanimated, {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Message from './Message';
import {forwardMsgType} from './types';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Model} from '@nozbe/watermelondb';

type PropTypes = {
  activeMsg: Model | undefined;
  username: string;
  account?: string;
  id: string;
  type: 'message' | 'image' | 'gif';
  text: string;
  received: boolean;
  uploadingImage: boolean;
  createdAt: number;
  msgCreatedAt?: Date;
  index: number;
  forwardMsg?: (msg: forwardMsgType) => void;
  toggleScroll: (scrollValue: boolean) => void;
  highlightedMessageId: null | number;
  sendMessages: (
    imagemessageInputUrl: string,
    username: string,
    type: string,
    id: string,
  ) => void;
};

type LeftActionProps = {
  drag: SharedValue<number>;
  styles: ChatScreenStyles;
  forwardIconColor: string;
};

const hepticFeedback = (giveHeptics: boolean) => {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  if (!giveHeptics) {
    // Trigger haptic feedback
    ReactNativeHapticFeedback.trigger('impactLight', options);
  }
};

const LeftAction = ({drag, styles, forwardIconColor}: LeftActionProps) => {
  const heptics = useRef(false);
  // Animation to control the visibility of the left action
  const styleAnimation = useAnimatedStyle(() => {
    let dragVal = drag.value - 25;
    if (dragVal > 20) {
      runOnJS(hepticFeedback)(heptics.current);
      heptics.current = true;
    } else {
      heptics.current = false;
    }

    return {
      transform: [{translateX: dragVal < 20 ? dragVal : 20}],
    };
  });

  return (
    <Reanimated.View
      style={[styleAnimation, styles.forwardLeftActionIconContainer]}>
      <Entypo name="forward" size={25} color={forwardIconColor} />
    </Reanimated.View>
  );
};

const RenderMessageList = (props: PropTypes): JSX.Element => {
  const {colors} = useTheme();
  const styles = useMemo(() => getChatScreenStyles(colors), []);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const {
    username,
    account,
    id,
    text,
    type,
    forwardMsg,
    sendMessages,
    received,
    toggleScroll,
    activeMsg,
  } = props;

  const swipeableRef = useRef<any>(null);

  useEffect(() => {
    if (type === 'image' && activeMsg?._raw['uploading_image']) {
      uploadAndShareImage();
    }
  }, [text]);

  const currentProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const uploadAndShareImage = useCallback(async () => {
    try {
      const uploadedUrl = await uploadImages(JSON.parse(text), currentProgress);
      if (uploadedUrl) {
        await updateImageUploadStatus(username, account, id, false);
        sendMessages(JSON.stringify(uploadedUrl), username, 'image', id);
      }
    } catch (err) {
      console.log('err at image upload :', err);
    }
  }, []);

  const renderLeftAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>,
  ) => (
    <LeftAction
      forwardIconColor={colors.forwardMessageIcon}
      styles={styles}
      drag={drag}
    />
  );
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={1}
        onSwipeableOpenStartDrag={direction => {
          if (direction === 'left') toggleScroll(false);
        }}
        onSwipeableWillClose={() => {
          toggleScroll(true);
        }}
        onSwipeableOpen={() => {
          swipeableRef.current?.close();
          InteractionManager.runAfterInteractions(() => {
            forwardMsg?.({
              message: text,
              type,
              received,
              username: received ? username : account ?? '',
              id: activeMsg?._raw['msg_id'],
            });
          });
        }} // Automatically close on swipe complete
        renderRightActions={() => null}
        overshootLeft={false}
        renderLeftActions={renderLeftAction}>
        <Message
          colors={colors}
          styles={styles}
          uploadProgress={uploadProgress}
          // activeMsg={activeMsg}
          {...props}
        />
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

export default React.memo(RenderMessageList);
