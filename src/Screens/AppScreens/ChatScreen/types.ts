import { Model } from "@nozbe/watermelondb";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MessageType = {
    item: {
      id: string;
      text: string;
      type: 'image' | 'message';
      received: boolean;
      uploadingImage: boolean;
      createdAt: number;
      msgCreatedAt?: Date;
    };
  };
  export type Params = {
    params: {
      username: string;
      status: string;
      image: string;
      skills: string[];
      accountName: string;
    };
  };
  
  export type Props = {
    navigation: NativeStackNavigationProp<ParamListBase>;
    route: RouteProp<Params>;
    activeChat: Model[];
  };