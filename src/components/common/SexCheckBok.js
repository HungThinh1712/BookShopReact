import React  from 'react';
import { Radio} from 'antd';
import {useTranslation} from 'react-i18next'

const SexCheckBox = (props) => {
  const { t } = useTranslation();
  return (
    <Radio.Group onChange={props.onChange} value={props.value} >
      <Radio  value={1}>
        {t('Customer_Management.4')}
      </Radio>
      <Radio style={{marginLeft:'20px'}} value={2}>
        {t('Customer_Management.5')}
      </Radio>
    </Radio.Group>
  );
};

export default SexCheckBox;