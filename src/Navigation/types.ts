import { type CampusCoursesTypes } from "../Redux/Slices/CampusCoursesSlice";
import { type Level4CoursesTypes } from "../Redux/Slices/Level4CoursesSlice";
import { type OnlineCoursesType, type Record } from "../Redux/Slices/OnlineCoursesSlice";

export type DrawerParamList = {
  HomePage: undefined;
  'Online Courses': {item: CampusCoursesTypes | Level4CoursesTypes | OnlineCoursesType | undefined} | undefined;
  'Level 4 Qualifications': undefined;
  'Campus Courses': undefined;
  'LST-Teen': undefined;
  Fees: undefined;
  'About Us': undefined;
  'Contact Us': undefined;
  Login: undefined;
};

export type DrawerScreens = keyof DrawerParamList;

export type StackParamList = {
  HomePage: undefined;
  'Program Page': {item: Record, list: CampusCoursesTypes | Level4CoursesTypes | OnlineCoursesType | undefined};
  'Online Courses': {item: CampusCoursesTypes | Level4CoursesTypes | OnlineCoursesType | undefined} | undefined;
  'Level 4 Qualifications': undefined;
};

export type StackScreens = keyof StackParamList;

export type BottomSheetParamList = {
  Main: undefined;
  BottomSheet: undefined;
};
