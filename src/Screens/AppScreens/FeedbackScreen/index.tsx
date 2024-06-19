import React, {useCallback, useEffect, useState} from 'react';
import {View, TextInput, Image, FlatList} from 'react-native';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {FeedbackScreenStyles, getFeedbackScreenStyles} from './styles';
import {CustomButton, Typography} from '../../../Components';
import LinearGradient from 'react-native-linear-gradient';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {baseURL} from '../../../Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import Header from '../../../Components/Header';
import {useUserProfile} from '../ProfileScreen/CustomHooks/useUserProfile';
import {useYourComment} from './CustomHook/useYourComment';
import {useAllComments} from './CustomHook/useAllComments.';
import {Comment} from '../../../Redux/Slices/FeedbackSlice';
import {EmptyState} from '../../../Assets/Images';
import {useAddComments} from './CustomHook/useAddComment';
import {GiveFeedback} from './GiveFeedback';
import {Skeleton} from 'moti/skeleton';

const FeedbackPage = () => {
  const {colors} = useTheme();
  const {userProfileSuccess} = useUserProfile();

  const {
    callAllCommentsApi,
    allCommentsSuccess,
    resetAllCommentsReducer,
    allCommentsLoading,
  } = useAllComments(userProfileSuccess?.username);

  const {resetaddCommenetReducer} = useAddComments();

  const [commentList, setCommentList] = useState(
    allCommentsSuccess?.data || [],
  );

  const {callGetYourCommentApi, resetYourCommenReducer} = useYourComment(
    userProfileSuccess?.username,
  );

  const getAllComments = () => {
    callAllCommentsApi(
      10,
      allCommentsSuccess?.lastId || '',
      userProfileSuccess?.username,
    );
  };

  useEffect(() => {
    callGetYourCommentApi();
    getAllComments();
  }, []);

  useEffect(() => {
    if (allCommentsSuccess?.data.length) {
      const conctinatedCommentedList = [
        ...commentList,
        ...allCommentsSuccess.data,
      ];
      setCommentList(conctinatedCommentedList);
    }
  }, [allCommentsSuccess?.data]);

  const styles = getFeedbackScreenStyles(colors);

  const resetFeedbackReducers = () => {
    resetYourCommenReducer();
    resetAllCommentsReducer();
    resetaddCommenetReducer();
  };

  const handleLoadMore = () => {
    getAllComments();
  };

  const renderSkills = ({item}) => {
    return (
      <Typography
        bgColor={colors.textPrimaryColor}
        fontWeight="300"
        textStyle={styles.skill}>
        {item}
      </Typography>
    );
  };

  const profileInfo = useCallback(() => {
    return (
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: `${baseURL}/${userProfileSuccess?.profilePic || ''}`,
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileNameStatusContainer}>
          <Typography
            fontWeight="400"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.nameText}>
            {userProfileSuccess?.username}
          </Typography>
          <Typography
            fontWeight="400"
            bgColor={colors.textPrimaryColor}
            textStyle={styles.statusText}>
            {userProfileSuccess?.status}
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
    );
  }, []);

  const noCommentComponent = () => {
    return (
      <>
        {allCommentsLoading ? (
          <Skeleton.Group show={allCommentsLoading}>
            <View style={styles.commentCard}>
              <View style={styles.mainHeader}>
                <View style={{marginLeft: horizontalScale(10)}}>
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

                  <View style={{paddingLeft: horizontalScale(10)}}>
                    <Skeleton
                      colorMode="light"
                      height={verticalScale(20)}
                      width={'35%'}></Skeleton>
                  </View>
                </View>
              </View>

              <View style={{padding: moderateScale(10)}}>
                <Skeleton
                  colorMode="light"
                  height={verticalScale(50)}
                  width={'100%'}></Skeleton>
              </View>
            </View>
          </Skeleton.Group>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={EmptyState} style={styles.emptyStateImageStyle} />
            <Typography
              bgColor="white"
              fontWeight="400"
              textStyle={styles.noCommentsText}>
              {`${userProfileSuccess?.username} has no comments yet...`}
            </Typography>
          </View>
        )}
      </>
    );
  };

  const listHeaderComponent = () => (
    <>
      {profileInfo()}
      <GiveFeedback
        styles={styles}
        colors={colors}
        username={userProfileSuccess?.username}
      />

      <Typography
        fontWeight="400"
        bgColor={colors.textPrimaryColor}
        textStyle={styles.commentsHeading}>
        {'Comments'}
      </Typography>
    </>
  );

  const loadMoreComponent = () => {
    return (
      <View style={styles.loadMoreContainer}>
        {allCommentsSuccess?.data && allCommentsSuccess?.data.length > 10 ? (
          <CustomButton
            onPress={handleLoadMore}
            label={'Load More'}
            radius={95}
            loading={false}
            viewStyle={styles.submitButtonStyle}
          />
        ) : null}
      </View>
    );
  };

  const renderItem: ListRenderItem<Comment> = ({item}) => {
    return (
      <Skeleton.Group show={allCommentsLoading}>
        <View style={styles.commentCard}>
          <View style={styles.mainHeader}>
            <View style={{marginLeft: horizontalScale(10)}}>
              <Skeleton
                colorMode="light"
                width={horizontalScale(35)}
                height={verticalScale(35)}
                radius={moderateScale(18)}>
                <Image
                  source={{
                    uri: `${baseURL}/${item.commentUserId}-.png`,
                  }}
                  style={styles.commentUserAvatar}
                />
              </Skeleton>
            </View>

            <View style={styles.commentHeaderContainer}>
              <Skeleton
                colorMode="light"
                height={verticalScale(20)}
                width={'70%'}>
                <View style={{flexDirection: 'row'}}>
                  <Typography
                    bgColor={colors.textPrimaryColor}
                    fontWeight="400"
                    textStyle={styles.usernameText}>
                    {item.commentUserId}
                  </Typography>
                  <Typography
                    bgColor={colors.textInputPlaceholderColor}
                    fontWeight="400"
                    textStyle={styles.timeText}>
                    18 mins ago
                  </Typography>
                </View>
              </Skeleton>

              <View style={{paddingLeft: horizontalScale(10)}}>
                <Skeleton
                  colorMode="light"
                  height={verticalScale(20)}
                  width={'35%'}>
                  <View style={styles.commentStarContainer}>
                    <Typography
                      bgColor={colors.textPrimaryColor}
                      fontWeight="400"
                      textStyle={styles.starText}>
                      {`x${item.rating}`}
                    </Typography>
                    <Entypo
                      name="star"
                      size={moderateScale(12)}
                      color={colors.starColor}
                    />
                  </View>
                </Skeleton>
              </View>
            </View>
          </View>

          {allCommentsLoading ? (
            <View style={{padding: moderateScale(10)}}>
              <Skeleton
                colorMode="light"
                height={verticalScale(50)}
                width={'100%'}>
                <Typography
                  bgColor={colors.textPrimaryColor}
                  fontWeight="400"
                  textStyle={styles.commentText}>
                  {item.content}
                </Typography>
              </Skeleton>
            </View>
          ) : (
            <Typography
              bgColor={colors.textPrimaryColor}
              fontWeight="400"
              textStyle={styles.commentText}>
              {item.content}
            </Typography>
          )}
        </View>
      </Skeleton.Group>
    );
  };

  const renderComments = () => {
    return (
      <FlashList
        ListEmptyComponent={noCommentComponent}
        // ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={loadMoreComponent}
        estimatedItemSize={300}
        data={commentList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <LinearGradient
      colors={['#868F96', '#596164']}
      style={styles.gradientContainer}>
      <View style={styles.backButtonContainer}>
        <Header onPress={resetFeedbackReducers} />
      </View>
      {listHeaderComponent()}
      {renderComments()}
    </LinearGradient>
  );
};

export default FeedbackPage;
