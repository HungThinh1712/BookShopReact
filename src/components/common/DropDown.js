/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox(props) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={top100Films}
      getOptionLabel={(option) => option.name}
      style={{ width: '250px'  }}
      renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" />}
    />
  );
}

const top100Films = [
  { name: 'Kinh dị'},
  { name: 'Văn học hiện đại'},
  { name: 'Sách giáo khoa'},
  { name: 'Tiểu thuyết'},
  { name: 'Truyện tranh'},
 
];
