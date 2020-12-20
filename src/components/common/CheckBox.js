import React, { useState } from 'react';
import { Radio} from 'antd';


const CheckBox = (props) => {
  const radioStyle = {
    display: 'block',
    height: '30px',
   
    padding:'10px',
    fontWeight:'600'
  };
  const [value,setValue] = useState(1)
  const onChange = e => {
    setValue(e.target.value)
    };
  return (
    <Radio.Group onChange={onChange} value={value} >
      <Radio style={radioStyle}  value={1}>
           {`  Thanh toán tiền mặt khi nhận hàng`}
      </Radio>
      <Radio style={radioStyle} value={2}>
        {` Thanh toán thông qua VNPAY`}
      </Radio>
    </Radio.Group>
  );
};

export default CheckBox;