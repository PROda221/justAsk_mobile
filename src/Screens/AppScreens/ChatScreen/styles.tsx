import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';

export type ChatScreenStyles = {
  container: ViewStyle;
  profilePicContainer: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
  searchContainer: ViewStyle;
  addButton: ViewStyle;
  searchButtonTextStyle: TextStyle;
  searchButtonContainer: ViewStyle;
  messageContainer: ViewStyle;
  avatar: ImageStyle;
  messageName: TextStyle;
  messageText: TextStyle;
  messageTime: TextStyle;
  messagesList: ViewStyle
  img: ImageStyle;
  messageTextContainer: ViewStyle
};

export const getChatScreenStyles = (colors): ChatScreenStyles =>
  StyleSheet.create<ChatScreenStyles>({
    container: {
        flex: 1,
        backgroundColor: colors.appScreenPrimaryBackground,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#23272A',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    chatContainer: {
        flex: 1,
        padding: 16,
    },
    dateText: {
        alignSelf: 'center',
        color: '#888',
        marginBottom: 8,
    },
    timeText: {
        alignSelf: 'center',
        color: '#888',
        marginTop: 8,
        marginBottom: 8,
    },
    messageContainer: {
        backgroundColor: '#40444B',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    messageContainerRight: {
        alignSelf: 'flex-end',
        backgroundColor: '#7289DA',
    },
    messageText: {
        color: '#FFF',
        fontSize: 14,
    },
    emailText: {
        color: '#00AFF4',
        fontSize: 14,
    },
    thumbIcon: {
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#23272A',
    },
    input: {
        flex: 1,
        color: '#FFF',
        paddingHorizontal: 12,
        backgroundColor: '#40444B',
        borderRadius: 20,
        marginRight: 8,
    },
    icon: {
        marginHorizontal: 4,
    },
  });





StyleSheet.create({
    
});