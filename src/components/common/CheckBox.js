import React, { useState } from 'react';
import { Radio} from 'antd';


const CheckBox = (props) => {
  const radioStyle = {
    display: 'block',
    height: '30px',
   
    padding:'10px',
    fontWeight:'600'
  };
  
  return (
    <Radio.Group onChange={props.onChange} value={props.value}>
      <Radio style={radioStyle}  value={1}>
           {`  Thanh toán tiền mặt khi nhận hàng`}
      </Radio>
      <Radio style={radioStyle} value={2}>
        {` Thanh toán thông qua MOMO`}
      </Radio>
    </Radio.Group>
  );
};

export default CheckBox;