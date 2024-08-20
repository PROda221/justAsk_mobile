import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type Params = {
    params: {
      username: string;
      status: string;
      image: string;
      skills: string[] | string;
    };
  };
  
  export type UserProfileProps = {
    navigation: NativeStackNavigationProp<ParamListBase>;
    route: RouteProp<Params>;
  };
  
  export type NewProfileType = {
    profileImg: string | null;
    status: string | null;
  };