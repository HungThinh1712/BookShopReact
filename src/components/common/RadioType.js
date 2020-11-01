import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl style={{marginTop:'108px',marginLeft:'87px',width:'300px'}} component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="female" control={<Radio />} label="Kinh dị" />
        <FormControlLabel value="male" control={<Radio />} label="Truyện tranh" />
        <FormControlLabel value="other" control={<Radio />} label="Sách giáo khoa" />
      </RadioGroup>
    </FormControl>
  );
}
