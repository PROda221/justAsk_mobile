import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';

type ChatItemProps = PropsWithChildren<{}>;

export function AnimatedChatItem({children}: ChatItemProps) {
  return (
    <Animated.View
      entering={FadeInDown.springify()
        .damping(80)
        .stiffness(200)
        .withInitialValues({
          transform: [
            {
              translateY: 100,
            },
          ],
        })}
      exiting={FadeOutUp.springify().damping(80).stiffness(200)}>
      <View>{children}</View>
    </Animated.View>
  );
}
