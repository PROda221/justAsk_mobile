import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {Image} from 'expo-image';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getMyFeedbackStyles} from './styles';
import {CustomButton, Typography} from '../../../Components';
import LinearGradient from 'react-native-linear-gradient';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import Header from '../../../Components/Header';

import {Comment} from '../../../Redux/Slices/FeedbackSlice';
import {EmptyState} from '../../../Assets/Images';

import {Skeleton} from 'moti/skeleton';
import {useAllComments} from '../../../CustomHooks/AppHooks/useAllComments.';
import {useProfile} from '../../../CustomHooks/AppHooks/useProfile';
import {getProfilePic} from '../../../Functions/GetProfilePic';
import content from '../../../Assets/Languages/english.json';
import {formatTimestamp} from '../../../Functions/FormatTime';

const MyFeedbackPage = () => {
  const [loading, setLoading] = useState(true);
  const {colors} = useTheme();
  const {profileSuccess, profileLoading} = useProfile();

  const {
    callAllCommentsApi,
    allCommentsSuccess,
    resetAllCommentsReducer,
    allCommentsLoading,
  } = useAllComments(profileSuccess?.username);

  const [commentList, setCommentList] = useState(
    allCommentsSuccess?.data || [],
  );

  const getAllComments = () => {
    callAllCommentsApi(
      10,
      allCommentsSuccess?.lastId || '',
      profileSuccess?.username,
    );
  };

  useEffect(() => {
    setLoading(false);
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

  const styles = getMyFeedbackStyles(colors);

  const resetFeedbackReducers = () => {
    resetAllCommentsReducer();
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
      <Skeleton colorMode="light" show={profileLoading || loading}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: getProfilePic(profileSuccess?.profilePic),
            }}
            style={styles.profileImage}
            transition={500}
            cachePolicy={'none'}
          />
          <View style={styles.profileNameStatusContainer}>
            <Typography
              fontWeight="400"
              bgColor={colors.textPrimaryColor}
              textStyle={styles.nameText}>
              {profileSuccess?.username}
            </Typography>
            <Typography
              fontWeight="400"
              bgColor={colors.textPrimaryColor}
              textStyle={styles.statusText}>
              {profileSuccess?.status}
            </Typography>
            <View style={styles.skillContainer}>
              <FlatList
                data={profileSuccess?.adviceGenre}
                renderItem={renderSkills}
                // estimatedItemSize={153}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </Skeleton>
    );
  }, [profileLoading, loading, allCommentsLoading]);

  const noCommentComponent = () => {
    return (
      <>
        {loading || allCommentsLoading ? (
          <Skeleton.Group show={allCommentsLoading || loading}>
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
              {`${profileSuccess?.username} ${content.MyFeedback.noComments}`}
            </Typography>
          </View>
        )}
      </>
    );
  };

  const listHeaderComponent = () => (
    <>
      {profileInfo()}

      <Typography
        fontWeight="400"
        bgColor={colors.textPrimaryColor}
        textStyle={styles.commentsHeading}>
        {content.MyFeedback.commentsTitle}
      </Typography>
    </>
  );

  const loadMoreComponent = () => {
    return (
      <View style={styles.loadMoreContainer}>
        {allCommentsSuccess?.data && allCommentsSuccess?.data.length > 10 ? (
          <CustomButton
            onPress={handleLoadMore}
            label={content.MyFeedback.loadMore}
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
      <View style={styles.commentCard}>
        <View style={styles.mainHeader}>
          <View style={styles.feedbackImgContainer}>
            <Image
              source={{
                uri: getProfilePic(item.commentUserPic),
              }}
              transition={500}
              cachePolicy={'none'}
              style={styles.commentUserAvatar}
            />
          </View>

          <View style={styles.commentHeaderContainer}>
            <View style={styles.userDetailsHeader}>
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
                {formatTimestamp(item.updatedAt)}
              </Typography>
            </View>

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
          </View>
        </View>

        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.commentText}>
          {item.content}
        </Typography>
      </View>
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

export default MyFeedbackPage;
