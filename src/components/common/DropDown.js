/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


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
    <div  style={{ width: '276px',height:'5px !important'}}>
      <Autocomplete
      options={props.data}
      size ="medium"
      getOptionLabel={(option) => option.name}   
      renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" />}
      getOptionSelected={(option, value) => option.id === value.id}
      onChange ={props.handleChange}
    />
    </div>
  );
}

