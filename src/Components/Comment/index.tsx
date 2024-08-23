import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  TextStyle,
  LayoutChangeEvent,
} from 'react-native';
import {Typography} from '../Typography'; // Adjust the import path as needed
import {useTheme} from '../../useContexts/Theme/ThemeContext';
import {getCommentStyles} from './styles';
import content from '../../Assets/Languages/english.json';

type CommentProps = {
  numberOfLines: number;
  bgColor: string;
  textStyle: TextStyle;
  content: string;
};

export const Comment = (props: CommentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const fullTextHeight = useRef(0);
  const limitedTextHeight = useRef(0);

  const {colors} = useTheme();
  const styles = getCommentStyles(colors);

  const onFullTextLayout = (e: LayoutChangeEvent) => {
    fullTextHeight.current = e.nativeEvent.layout.height;
    checkShouldShowButton();
  };

  const onLimitedTextLayout = (e: LayoutChangeEvent) => {
    limitedTextHeight.current = e.nativeEvent.layout.height;
    checkShouldShowButton();
  };

  const checkShouldShowButton = () => {
    if (fullTextHeight.current > 0 && limitedTextHeight.current > 0) {
      setShouldShowButton(fullTextHeight.current > limitedTextHeight.current);
    }
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <Typography
        numberOfLines={isExpanded ? undefined : props.numberOfLines}
        textStyle={props.textStyle}
        bgColor={props.bgColor}
        fontWeight="400"
        onTextLayout={isExpanded ? onFullTextLayout : onLimitedTextLayout}>
        {props.content}
      </Typography>

      {!isExpanded && (
        <Typography
          textStyle={[props.textStyle, styles.textStyle]}
          bgColor={props.bgColor}
          fontWeight="400"
          onTextLayout={onFullTextLayout}>
          {props.content}
        </Typography>
      )}

      {shouldShowButton && (
        <TouchableOpacity onPress={toggleReadMore}>
          <Typography
            textStyle={[props.textStyle, styles.readMoreText]}
            bgColor={props.bgColor}
            fontWeight="400">
            {isExpanded
              ? content.CommentComponent.showLess
              : content.CommentComponent.showMore}
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};
