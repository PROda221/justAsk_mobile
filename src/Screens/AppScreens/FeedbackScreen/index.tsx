import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {Image} from 'expo-image';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getFeedbackScreenStyles} from './styles';
import {CustomButton, Typography} from '../../../Components';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../Components/Header';
import {useUserProfile} from '../../../CustomHooks/AppHooks/useUserProfile';
import {GiveFeedback} from './GiveFeedback';
import {Skeleton} from 'moti/skeleton';
import {useYourComment} from '../../../CustomHooks/AppHooks/useYourComment';
import {useAddComments} from '../../../CustomHooks/AppHooks/useAddComment';
import content from '../../../Assets/Languages/english.json';
import {withObservables} from '@nozbe/watermelondb/react';
import {getCurrentChatObservable} from '../../../DB/DBFunctions';
import {PropsType} from './types';
import YourComment from './YourComment';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {useAllComments} from '../../../CustomHooks/AppHooks/useAllComments.';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {Comment as CommentComponent} from '../../../Components/Comment';
import {EmptyState} from '../../../Assets/Images';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {type Comment} from '../../../Redux/Slices/FeedbackSlice';

const enhance = withObservables(['route'], ({route}) => ({
  chatDetails: getCurrentChatObservable(
    route.params?.accountName,
    route.params?.username,
  ),
}));

const FeedbackPage = ({route, chatDetails}: PropsType) => {
  const [loading, setLoading] = useState(true);
  const {colors} = useTheme();
  const {userProfileSuccess, userProfileLoading} = useUserProfile();

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const {resetaddCommenetReducer} = useAddComments();

  const {
    callGetYourCommentApi,
    resetYourCommenReducer,
    getYourCommentLoading,
    getYourCommentSuccess,
  } = useYourComment(userProfileSuccess?.username);

  const {
    callAllCommentsApi,
    allCommentsSuccess,
    allCommentsLoading,
    resetAllCommentsReducer,
  } = useAllComments(userProfileSuccess?.username);

  const [commentList, setCommentList] = useState(
    allCommentsSuccess?.data || [],
  );

  const getAllComments = () => {
    callAllCommentsApi(
      10,
      allCommentsSuccess?.lastId || '',
      userProfileSuccess?.username,
    );
  };

  useEffect(() => {
    if (allCommentsSuccess?.data.length) {
      const conctinatedCommentedList = [
        ...commentList,
        ...allCommentsSuccess.data,
      ];
      setCommentList(conctinatedCommentedList);
    }
  }, [allCommentsSuccess?.lastId]);

  useEffect(() => {
    getAllComments();
    setLoading(false);
    callGetYourCommentApi();
  }, []);

  const styles = getFeedbackScreenStyles(colors);

  const resetFeedbackReducers = () => {
    resetYourCommenReducer();
    resetAllCommentsReducer();
    resetaddCommenetReducer();
  };

  const handleLoadMore = () => {
    getAllComments();
  };

  const renderSkills = ({item}) => (
    <Typography
      bgColor={colors.textPrimaryColor}
      fontWeight="300"
      textStyle={styles.skill}>
      {item}
    </Typography>
  );

  const profileInfo = useCallback(
    () => (
      <Skeleton
        colorMode="light"
        show={userProfileLoading || loading || getYourCommentLoading}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: chatDetails[0]._raw?.['profile_pic'],
            }}
            style={styles.profileImage}
            transition={500}
          />
          <View style={styles.profileNameStatusContainer}>
            <Typography
              fontWeight="400"
              bgColor={colors.textPrimaryColor}
              textStyle={styles.nameText}>
              {chatDetails[0]._raw?.['username']}
            </Typography>
            <Typography
              fontWeight="400"
              elipses="tail"
              numberOfLines={1}
              bgColor={colors.textPrimaryColor}
              textStyle={styles.statusText}>
              {chatDetails[0]._raw?.['status']}
            </Typography>
            <View style={styles.skillContainer}>
              <FlatList
                data={userProfileSuccess?.adviceGenre}
                renderItem={renderSkills}
                // estimatedItemSize={153}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </Skeleton>
    ),
    [userProfileLoading, getYourCommentLoading, loading],
  );

  const listHeaderComponent = () => (
    <>
      {profileInfo()}
      <View style={styles.giveFeedbackContainer}>
        <Skeleton colorMode="light" show={getYourCommentLoading || loading}>
          <GiveFeedback
            styles={styles}
            colors={colors}
            username={userProfileSuccess?.username}
          />
        </Skeleton>
      </View>
    </>
  );

  const loadMoreComponent = () => (
    <View style={styles.loadMoreContainer}>
      {allCommentsSuccess?.data && allCommentsSuccess?.data.length > 10 ? (
        <CustomButton
          onPress={handleLoadMore}
          label={content.UserFeedback.loadMore}
          radius={95}
          loading={allCommentsLoading}
          viewStyle={styles.submitButtonStyle}
        />
      ) : null}
    </View>
  );

  const noCommentComponent = () => (
    <>
      {allCommentsLoading ? (
        <Skeleton.Group show={allCommentsLoading}>
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
      ) : (
        <View style={styles.noFeedbacksContainer}>
          <Image
            source={EmptyState}
            style={styles.emptyStateImageStyle}
            transition={500}
          />
          <Typography
            bgColor="white"
            fontWeight="400"
            textStyle={styles.noCommentsText}>
            {`${userProfileSuccess?.username} ${content.UserFeedback.noComments}`}
          </Typography>
        </View>
      )}
    </>
  );

  const renderItem: ListRenderItem<Comment> = ({item}) => {
    return (
      <CommentComponent
        content={item.content}
        bgColor={colors.textPrimaryColor}
        numberOfLines={3}
        textStyle={styles.commentText}
        feedbackStyles={styles}
        commentUserPic={item.commentUserPic}
        commentUserId={item.commentUserId}
        rating={item.rating}
        updatedAt={item.updatedAt}
      />
    );
  };

  return (
    <LinearGradient
      colors={['#868F96', '#596164']}
      style={styles.gradientContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.backButtonContainer}>
          <Header onPress={resetFeedbackReducers} />
        </View>
        {listHeaderComponent()}
        <YourComment
          title={content.UserFeedback.yourComment}
          titleColor={colors.textPrimaryColor}
          titleStyle={styles.commentsHeading}
          commentStyle={styles.commentText}
          commentColor={colors.textPrimaryColor}
          yourComment={getYourCommentSuccess}
          yourCommentLoading={getYourCommentLoading || loading}
        />
        <CustomButton
          label="View Comments"
          radius={14}
          viewStyle={styles.viewCommentsButton}
          onPress={() => actionSheetRef.current?.show()}
        />
        <ActionSheet
          gestureEnabled
          ref={actionSheetRef}
          containerStyle={styles.commentActionSheet}
          closeOnTouchBackdrop={true}
          closeOnPressBack={true}>
          <View style={{height: '100%'}}>
            <FlashList
              ListEmptyComponent={noCommentComponent}
              ListFooterComponent={loadMoreComponent}
              estimatedItemSize={150}
              data={commentList}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ActionSheet>
      </ScrollView>
    </LinearGradient>
  );
};

export default enhance(FeedbackPage);
