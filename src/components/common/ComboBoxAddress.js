/* eslint-disable no-use-before-define */
import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useSelector,useDispatch} from 'react-redux';
import * as typeActions from '../../actions/typesAction'
import * as bookActions from '../../actions/booksAction'

export default function ComboBox(props) {

  // const dispatch = useDispatch()

  // const types = useSelector(state=>state.type.types)

  // useEffect(() => {
  //     dispatch(typeActions.getTypesRequest())
  // }, [dispatch])
  // const handleChange = (event, values) =>{
  //   dispatch(bookActions.getBookByTypeIdRequest(values.id));
  // }

  return (
    <div  style={{ width: '300px',marginLeft:'6px'}}>
      <Autocomplete
      options={top100Films}
      size ="medium"
      getOptionLabel={(option) => option.name}   
      renderInput={(params) => <TextField {...params}  style={{maxHeight:'10px',borderColor:'#f2f2f2'}} variant="outlined" />}
      getOptionSelected={(option, value) => option.id === value.id}
    
    />
    </div>
  );
}

const top100Films = [
  { name: 'Kinh dị'},
  { name: 'Văn học hiện đại'},
  { name: 'Sách giáo khoa'},
  { name: 'Tiểu thuyết'},
  { name: 'Truyện tranh'},
];
