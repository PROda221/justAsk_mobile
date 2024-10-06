import React from 'react';
import {TextStyle, View} from 'react-native';
import {Typography} from '../../../Components';
import {Comment as CommentComponent} from '../../../Components/Comment';
import {YourCommentSuccess} from '../../../Redux/Slices/FeedbackSlice';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getFeedbackScreenStyles} from './styles';
import {Skeleton} from 'moti/skeleton';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../Functions/StyleScale';

type PropsType = {
  title: string;
  titleColor: string;
  titleStyle: TextStyle;
  commentColor: string;
  commentStyle: TextStyle;
  yourComment?: YourCommentSuccess;
  yourCommentLoading: boolean;
};

const YourComment = ({
  titleColor,
  titleStyle,
  title,
  yourComment,
  commentColor,
  commentStyle,
  yourCommentLoading,
}: PropsType) => {
  const {colors} = useTheme();
  const styles = getFeedbackScreenStyles(colors);
  return (
    <View>
      {yourComment?.success ? (
        <>
          <Typography
            fontWeight="400"
            bgColor={titleColor}
            textStyle={titleStyle}>
            {title}
          </Typography>

          <CommentComponent
            content={yourComment?.yourComment.content}
            bgColor={commentColor}
            numberOfLines={3}
            textStyle={commentStyle}
            feedbackStyles={styles}
            commentUserPic={yourComment?.yourComment.commentUserPic}
            commentUserId={yourComment?.yourComment.commentUserId}
            rating={yourComment?.yourComment.rating}
            updatedAt={yourComment?.yourComment.updatedAt}
          />
        </>
      ) : yourCommentLoading ? (
        <Skeleton.Group show={yourCommentLoading}>
          <View style={styles.commentCard}>
            <View style={styles.mainHeader}>
              <View style={styles.skeletonProfileContainer}>
                <Skeleton
                  colorMode="light"
                  width={horizontalScale(35)}
                  height={verticalScale(35)}
                  radius={moderateScale(18)}></Skeleton>
              </View>

              <View style={styles.commentHeaderContainer}>
                <Skeleton
                  colorMode="light"
                  height={verticalScale(20)}
                  width={'70%'}></Skeleton>

                <View style={styles.skeletonStarsContainer}>
                  <Skeleton
                    colorMode="light"
                    height={verticalScale(20)}
                    width={'35%'}></Skeleton>
                </View>
              </View>
            </View>

            <View style={styles.skeletonUserCommentContainer}>
              <Skeleton
                colorMode="light"
                height={verticalScale(50)}
                width={'100%'}></Skeleton>
            </View>
          </View>
        </Skeleton.Group>
      ) : null}
    </View>
  );
};

export default YourComment;
