import { SheetManager } from "react-native-actions-sheet";

export const showAlertBox = (
    title: string,
    description: string,
    onPressOk: () => void,
    onPressCancel?: () => void
  ) => {
    SheetManager.show('AlertBox-sheet', {
      payload: {
        title,
        description,
        onPressOk,
        ...(onPressCancel && { onPressCancel }),
      },
    });
  };
  
  export const hideAlertBox = () => {
    SheetManager.hide('AlertBox-sheet');
  };