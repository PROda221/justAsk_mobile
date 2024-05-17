import React, {FunctionComponent} from 'react';
import {SvgProps} from 'react-native-svg';

type RenderSvgProps = {
  Icon: FunctionComponent<SvgProps>;
  width: number;
  height: number;
};

export const RenderSvg = ({Icon, width, height}: RenderSvgProps): JSX.Element => <Icon width={width} height={height} />;
