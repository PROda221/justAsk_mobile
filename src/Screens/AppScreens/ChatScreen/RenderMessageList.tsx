import React, {useEffect, useState, useRef, MutableRefObject} from 'react';
import {InteractionManager} from 'react-native';
import {ChatScreenStyles, getChatScreenStyles} from './styles';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {uploadImage} from '../../../Functions/UploadImg';
import {
  getCurrentMsgObservable,
  updateImageUploadStatus,
} from '../../../DB/DBFunctions';
import {withObservables} from '@nozbe/watermelondb/react';
import {Model} from '@nozbe/watermelondb';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Message from './Message';
import {forwardMsgType} from './types';

type PropTypes = {
  activeMsg: Model[] | undefined;
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

const enhance = withObservables(['id'], ({id}) => ({
  activeMsg: getCurrentMsgObservable(id),
}));

const LeftAction = ({drag, styles, forwardIconColor}: LeftActionProps) => {
  // Animation to control the visibility of the left action
  const styleAnimation = useAnimatedStyle(() => {
    let dragVal = drag.value - 25;
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
  const styles = getChatScreenStyles(colors);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const {
    activeMsg,
    username,
    account,
    id,
    text,
    type,
    forwardMsg,
    sendMessages,
    received,
  } = props;

  const swipeableRef = useRef<any>(null);

  useEffect(() => {
    if (type === 'image' && activeMsg?.[0]?._raw['uploading_image']) {
      uploadAndShareImage();
    }
  }, [text]);

  const currentProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const uploadAndShareImage = async () => {
    try {
      const uploadedUrl = await uploadImage(text, currentProgress);
      if (uploadedUrl) {
        await updateImageUploadStatus(username, account, id, false);
        sendMessages(uploadedUrl, username, 'image', id);
      }
    } catch (err) {
      console.log('err at image upload :', err);
    }
  };

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
        onSwipeableOpen={() => {
          swipeableRef.current?.close();
          InteractionManager.runAfterInteractions(() => {
            forwardMsg?.({
              message: text,
              type,
              received,
              username: received ? username : account ?? '',
              id: activeMsg?.[0]?._raw['msg_id'],
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
          {...props}
        />
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

export default enhance(React.memo(RenderMessageList));
