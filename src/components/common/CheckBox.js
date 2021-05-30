import React from 'react';
import { Radio} from 'antd';
import {useTranslation} from 'react-i18next'


const CheckBox = (props) => {
  const { t } = useTranslation();
  const radioStyle = {
    display: 'block',
    height: '30px',
   
    padding:'10px',
    fontWeight:'600'
  };
  
  return (
    <Radio.Group onChange={props.onChange} value={props.value}>
      <Radio style={radioStyle}  value={1}>
        {t('Customer_Shopping_Payment.13')}
      </Radio>
      <Radio style={radioStyle} value={2}>
        {t('Customer_Shopping_Payment.14')}
      </Radio>
    </Radio.Group>
  );
};

export default CheckBox;