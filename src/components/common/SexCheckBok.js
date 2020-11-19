import React, { useState } from 'react';
import { Radio, Input } from 'antd';

const SexCheckBox = (props) => {
  
  const [value,setValue] = useState(props.value ==="Nam" ? 1: 2)
  const onChange = e => {
    setValue(e.target.value)
    };
  return (
    <Radio.Group onChange={onChange} value={value} >
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