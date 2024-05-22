import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../../useContexts/Theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {getHomeScreenStyles} from './styles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../Functions/StyleScale';
import {Typography} from '../../../Components';
import {useForm} from 'react-hook-form';
import {SheetManager} from 'react-native-actions-sheet';


const messages = [
  {
    id: '1',
    name: 'Maciej Kowalski',
    message: 'maciej.kowalski@email.com',
    time: '08:43',
    image: 'https://placekitten.com/100/100',
  },
  {
    id: '2',
    name: 'Odeusz Piotrowski',
    message: 'Will do, super, thank you 😊❤️',
    time: 'Tue',
    image: 'https://placekitten.com/101/101',
  },
  {
    id: '3',
    name: 'Bożenka Malina',
    message: 'Uploaded file.',
    time: 'Sun',
    image: 'https://placekitten.com/102/102',
  },
  {
    id: '4',
    name: 'Maciej Orłowski',
    message: 'Here is another tutorial, if you...',
    time: '23 Mar',
    image: 'https://placekitten.com/103/103',
  },
  {
    id: '5',
    name: 'Krysia Eurydyka',
    message: '😆',
    time: '18 Mar',
    image: 'https://placekitten.com/104/104',
  },
  {
    id: '6',
    name: 'MC Bastek',
    message: '...z domu przez 5 ...',
    time: '01 Feb',
    image: 'https://placekitten.com/105/105',
  },
];

const HomeScreen = () => {
  const {control, handleSubmit} = useForm();

  const {colors} = useTheme();
  const styles1 = getHomeScreenStyles(colors);

  const renderChatroom = ({item}) => (
    <View style={[styles.chatroomContainer, {backgroundColor: item.color}]}>
      <Text style={styles.chatroomText}>{item.name}</Text>
    </View>
  );

  const renderMessage = ({item}) => (
    <View style={styles.messageContainer}>
      <Image source={{uri: item.image}} style={styles.avatar} />
      <View style={styles.messageTextContainer}>
        <Text style={styles.messageName}>{item.name}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  const searchBar = () => (
    <TouchableOpacity
      style={styles1.searchButtonContainer}
      onPress={() => SheetManager.show('SearchFeature-sheet')}>
      <View style={styles1.searchContainer}>
        <Typography
          fontWeight="400"
          bgColor={colors.textPrimaryColor}
          textStyle={styles1.searchButtonTextStyle}>
          {'Search....'}
        </Typography>
      </View>
      <View style={styles1.addButton}>
        <Icon name="add" size={20} color={colors.iconPrimaryColor} />
      </View>
    </TouchableOpacity>
  );

  const header = () => (
    <View style={styles1.header}>
      <View style={styles1.profilePicContainer}></View>
      <Typography
        bgColor="white"
        fontWeight="400"
        textStyle={styles1.headerText}>
        {'Martina Wolna'}
      </Typography>
    </View>
  );

  return (
    <View style={styles1.container}>
      {header()}
      {searchBar()}
      
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 25,
    height: 50,
    marginRight: 10,
    width: 50,
  },
  chatroomContainer: {
    alignItems: 'center',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    marginRight: 10,
    width: 120,
  },
  chatroomText: {
    color: '#fff',
  },
  chatroomsList: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  container: {
    backgroundColor: '#2C2C2E',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    padding: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
  },
  messageName: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageText: {
    color: '#fff',
  },
  messageTextContainer: {
    flex: 1,
  },
  messageTime: {
    color: '#aaa',
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    marginLeft: 8,
    padding: 10,
  },

  searchInput: {
    backgroundColor: '#444',
    borderRadius: 8,
    color: '#fff',
    flex: 1,
    paddingHorizontal: 12,
  },
});

export default HomeScreen;
