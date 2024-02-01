export type DrawerParamList = {
  HomePage: undefined;
  'Online Courses': undefined;
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
  'Program Page': undefined;
  'Online Courses': undefined;
  'Level 4 Qualifications': undefined;
};

export type StackScreens = keyof StackParamList;

export type BottomSheetParamList = {
  Main: undefined;
  BottomSheet: undefined;
};
