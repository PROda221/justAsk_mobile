import { Typography } from "../../../Components";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LogBox } from 'react-native';
import { useStartChat } from "./CustomHook/useStartChat";
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from "../../../useContexts/Theme/ThemeContext";
import { getChatScreenStyles } from "./styles";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

type Props = {
    navigation: NativeStackNavigationProp<ParamListBase>;
    route: RouteProp<ParamListBase>;
}

const ChatScreen = ({navigation, route}: Props) => {
    const {username, skills, status, image, socket} = route.params
    const temp = useStartChat(socket, username, image)

    const {colors} = useTheme()
    const styles = getChatScreenStyles(colors)

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://placekitten.com/50/50' }}
                    style={styles.profileImage}
                />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Martina Wolna</Text>
                    <Text style={styles.headerText}>Maciej Kowalski</Text>
                </View>
            </View>
            <ScrollView style={styles.chatContainer}>
                <Text style={styles.dateText}>1 FEB 12:00</Text>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>
                        I commented on Figma, I want to add some fancy icons. Do you have any icon set?
                    </Text>
                </View>
                <View style={[styles.messageContainer, styles.messageContainerRight]}>
                    <Text style={styles.messageText}>
                        I am in a process of designing some. When do you need them?
                    </Text>
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>Next month?</Text>
                </View>
                <Text style={styles.timeText}>08:12</Text>
                <View style={[styles.messageContainer, styles.messageContainerRight]}>
                    <Text style={styles.messageText}>
                        I am almost finish. Please give me your email, I will ZIP them and send you as soon as I'm finish.
                    </Text>
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>?</Text>
                </View>
                <Text style={styles.timeText}>08:43</Text>
                <View style={styles.messageContainer}>
                    <Text style={styles.emailText}>maciej.kowalski@email.com</Text>
                </View>
                <Icon name="thumbs-up" size={24} color="#f1c40f" style={styles.thumbIcon} />
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Write" placeholderTextColor="#888" />
                <Icon name="search" size={24} color="#888" style={styles.icon} />
                <Icon name="camera" size={24} color="#888" style={styles.icon} />
            </View>
        </View>
    );
};



export default ChatScreen