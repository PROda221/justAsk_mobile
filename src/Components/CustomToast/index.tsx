import React from 'react';
import SuccessBox from './SuccessToast';
import ErrorBox from './ErrorToast';
import InfoBox from './InfoToast';

export const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: ({text1 = '', text2 = ''}) => (
    <SuccessBox title={text1} text={text2} />
  ),

  error: ({text1 = '', text2 = ''}) => <ErrorBox title={text1} text={text2} />,

  info: ({text1 = '', text2 = ''}) => <InfoBox title={text1} text={text2} />,
};
