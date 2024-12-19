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
import {FeedbackScreenStyles} from '../../Screens/AppScreens/FeedbackScreen/styles';
import Entypo from 'react-native-vector-icons/Entypo';
import {getProfilePic} from '../../Functions/GetProfilePic';
import {Image} from 'expo-image';
import {formatTimestamp} from '../../Functions/FormatTime';
import {moderateScale} from '../../Functions/StyleScale';
import {MyFeedbackStyles} from '../../Screens/AppScreens/MyFeedbackScreen/styles';

type CommentProps = {
  numberOfLines: number;
  bgColor: string;
  textStyle: TextStyle;
  content: string;
  feedbackStyles: FeedbackScreenStyles | MyFeedbackStyles;
  commentUserPic: string;
  commentUserId: string;
  rating: number;
  updatedAt: string;
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
    <View style={props.feedbackStyles.commentCard}>
      <View style={props.feedbackStyles.mainHeader}>
        <View style={props.feedbackStyles.feedbackImgContainer}>
          <Image
            source={{
              uri: getProfilePic(props.commentUserPic),
            }}
            style={props.feedbackStyles.commentUserAvatar}
            transition={500}
          />
        </View>

        <View style={props.feedbackStyles.commentHeaderContainer}>
          <View style={props.feedbackStyles.userDetailsHeader}>
            <Typography
              bgColor={colors.textPrimaryColor}
              fontWeight="400"
              textStyle={props.feedbackStyles.usernameText}>
              {props.commentUserId}
            </Typography>
            <Typography
              bgColor={colors.textInputPlaceholderColor}
              fontWeight="400"
              textStyle={props.feedbackStyles.timeText}>
              {formatTimestamp(props.updatedAt)}
            </Typography>
          </View>

          <View style={props.feedbackStyles.commentStarContainer}>
            <Typography
              bgColor={colors.textPrimaryColor}
              fontWeight="400"
              textStyle={props.feedbackStyles.starText}>
              {`x${props.rating}`}
            </Typography>
            <Entypo
              name="star"
              size={moderateScale(12)}
              color={colors.starColor}
            />
          </View>
        </View>
      </View>
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
    </View>
  );
};
