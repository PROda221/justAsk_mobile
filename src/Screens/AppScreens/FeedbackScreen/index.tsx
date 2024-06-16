import React, {useState} from 'react';
import {View, TextInput, Image, FlatList} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import {getFeedbackScreenStyles} from './styles';
import {CustomButton, Typography} from '../../../Components';
import LinearGradient from 'react-native-linear-gradient';
import {FlashList} from '@shopify/flash-list';
import {baseURL} from '../../../Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {horizontalScale, moderateScale} from '../../../Functions/StyleScale';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);

  const {colors} = useTheme();
  const styles = getFeedbackScreenStyles(colors);

  const submitFeedback = () => {
    console.log('handle here');
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

  const profileInfo = () => {
    return (
      <>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: `${baseURL}/PROda221-.png`,
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileNameStatusContainer}>
            <Typography
              fontWeight="400"
              bgColor={colors.textPrimaryColor}
              textStyle={styles.nameText}>
              {'PROda221'}
            </Typography>
            <Typography
              fontWeight="400"
              bgColor={colors.textPrimaryColor}
              textStyle={styles.statusText}>
              {'THERE IS NO TOMORROW'}
            </Typography>
            <View style={styles.skillContainer}>
              <FlatList
                data={[
                  'Health',
                  'Wealth',
                  'Family Health Health Health Health Health',
                ]}
                renderItem={renderSkills}
                // estimatedItemSize={153}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
        {giveFeedback()}
        <Typography
          fontWeight="400"
          bgColor={colors.textPrimaryColor}
          textStyle={styles.commentsHeading}>
          {'Comments'}
        </Typography>
      </>
    );
  };

  const giveFeedback = () => {
    return (
      <View style={styles.card}>
        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.giveFeedbackText}>
          Give your feedback
        </Typography>
        <StarRating
          rating={rating}
          onChange={setRating}
          enableHalfStar={false}
          style={styles.giveFeedbackStarsStyle}
        />
        <Typography
          bgColor={colors.textPrimaryColor}
          fontWeight="400"
          textStyle={styles.giveFeedbackText}>
          Add a comment
        </Typography>
        <View style={styles.commentContainer}>
          <TextInput
            style={styles.commentBox}
            placeholder="If you have any additional feedback, please type it in here..."
            multiline
            placeholderTextColor={colors.textInputPlaceholderColor}
            numberOfLines={4}
          />
        </View>
        <CustomButton
          onPress={submitFeedback}
          label="Give Feedback"
          radius={95}
          viewStyle={styles.submitButtonStyle}
        />
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.commentCard}>
        <View style={styles.mainHeader}>
          <Image
            source={{
              uri: `${baseURL}/PROda221-.png`,
            }}
            style={styles.commentUserAvatar}
          />

          <View style={styles.commentHeaderContainer}>
            <View style={{flexDirection: 'row'}}>
              <Typography
                bgColor={colors.textPrimaryColor}
                fontWeight="400"
                textStyle={styles.usernameText}>
                PROda221
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
                x4
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
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
      </View>
    );
  };

  const renderComments = () => {
    return (
      <FlashList
        ListHeaderComponent={profileInfo}
        estimatedItemSize={300}
        data={[1, 2, 3, 4]}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <LinearGradient
      colors={['#868F96', '#596164']}
      style={styles.gradientContainer}>
      {renderComments()}
    </LinearGradient>
  );
};

export default FeedbackPage;
