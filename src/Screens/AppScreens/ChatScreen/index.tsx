import React from "react";
import { View } from "react-native";
import { Typography } from "../../../Components";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LogBox } from 'react-native';
import { useStartChat } from "./CustomHook/useStartChat";

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

    return(
        <View>
            <Typography bgColor="black" fontWeight="300">{"CHAT SCREEN MOTHAFUCKERS"}</Typography>
        </View>
    )
}

export default ChatScreen