import React  from 'react';
import { Radio} from 'antd';
import {useTranslation} from 'react-i18next'

const SexCheckBox = (props) => {
  

  return (
    <Radio.Group onChange={props.onChange} value={props.value} >
      <Radio  value={1}>
           {`  Nam`}
      </Radio>
      <Radio style={{marginLeft:'20px'}} value={2}>
        {` Nữ`}
      </Radio>
    </Radio.Group>
  );
};

export default SexCheckBox;