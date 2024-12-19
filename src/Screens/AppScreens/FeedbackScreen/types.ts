import { Model } from "@nozbe/watermelondb";
import { RouteProp } from "@react-navigation/native";

export type Params = {
    params: {
      username: string;
      accountName: string;
    };
  };
  
  export type PropsType = {
    route: RouteProp<Params>;
    chatDetails: Model[] | [];
  };