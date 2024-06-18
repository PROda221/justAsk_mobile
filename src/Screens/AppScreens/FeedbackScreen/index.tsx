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
import {moderateScale} from '../../../Functions/StyleScale';
import Header from '../../../Components/Header';
import {useUserProfile} from '../ProfileScreen/CustomHooks/useUserProfile';
import {useYourComment} from './CustomHook/useYourComment';
import {useAllComments} from './CustomHook/useAllComments.';
import {Comment} from '../../../Redux/Slices/FeedbackSlice';
import {EmptyState} from '../../../Assets/Images';
import {useAddComments} from './CustomHook/useAddComment';
import { GiveFeedback } from './GiveFeedback';


const FeedbackPage = () => {
  const {colors} = useTheme();
  const {userProfileSuccess} = useUserProfile();

  const {callGetYourCommentApi, resetYourCommenReducer} =
    useYourComment(userProfileSuccess?.username);

  const {callAllCommentsApi, allCommentsSuccess, resetAllCommentsReducer} =
    useAllComments(userProfileSuccess?.username);

  const {resetaddCommenetReducer} = useAddComments();

  useEffect(() => {
    callGetYourCommentApi();
    callAllCommentsApi();
  }, []);

  const styles = getFeedbackScreenStyles(colors);

  const resetFeedbackReducers = () => {
    resetYourCommenReducer();
    resetAllCommentsReducer();
    resetaddCommenetReducer();
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
      <>
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
      </>
    );
  }, []);

  const noCommentComponent = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={EmptyState} style={styles.emptyStateImageStyle} />
        <Typography
          bgColor="white"
          fontWeight="400"
          textStyle={styles.noCommentsText}>
          {`${userProfileSuccess?.username} has no comments yet...`}
        </Typography>
      </View>
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

  const renderItem: ListRenderItem<Comment> = ({item}) => {
    return (
      <View style={styles.commentCard}>
        <View style={styles.mainHeader}>
          <Image
            source={{
              uri: `${baseURL}/${item.commentUserId}-.png`,
            }}
            style={styles.commentUserAvatar}
          />

          <View style={styles.commentHeaderContainer}>
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
        ListHeaderComponent={listHeaderComponent}
        estimatedItemSize={300}
        data={allCommentsSuccess?.data}
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
      {renderComments()}
    </LinearGradient>
  );
};

export default FeedbackPage;
