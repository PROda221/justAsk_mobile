import React, {FunctionComponent} from 'react';
import {SvgProps} from 'react-native-svg';

type RenderSvgProps = {
  Icon: FunctionComponent<SvgProps>;
  width: number;
  height: number;
  onPress?: ()=>void
};

export const RenderSvg = ({Icon, width, height, onPress}: RenderSvgProps): JSX.Element => <Icon onPress={onPress} width={width} height={height} />;
