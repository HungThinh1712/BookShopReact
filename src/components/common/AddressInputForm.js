import React, {useState} from 'react';
import { Input } from 'antd';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import * as authActions from './../../actions/authAction'
import {useDispatch,useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({

    
    input: {
        width:'300px',
        fontSize:'15px',fontWeight:'400',
      [theme.breakpoints.down('xs')]: {
        width:'200px'
      },
     
    }
  }));

const AddressInputForm = (props) => {
  
    const dispatch = useDispatch();
    const id = props.id;
    const classes = useStyles();
    const [city, setCity] = useState(props.city);
    const [district, setDistrict] = useState(props.district);
    const [ward, setWard] = useState(props.ward);
    const [address, setAddress] = useState(props.address);
    const handleCityInputChange = e => {
    setCity(e.target.value);
  };

  const handleDistrictInputChange = e => {
    setDistrict(e.target.value);
  };
  const handleWardInputChange = e => {
    setWard(e.target.value);
  };

  const handleAddressInputChange = e => {
    setAddress(e.target.value);
  };

  const handleSubmit = async e => {
    

    const userAddress = { id, city, district,ward,address };
    await dispatch(
        authActions.updateAddressOfCurrentUser(userAddress,props.props.history)
        
    );
  };
    return (
           <div  style={{display:'flex',justifyContent:'center'}}>
            <div style={{display:'inline-block' ,marginTop:'50px',padding:'20px',borderStyle: 'solid',borderWidth: '2px'}}>
            <table >
                <tbody>
                  <tr style={{marginBottom:'20px',padding:'20px'}}>
                      <th className={classes.title}>Họ tên</th>
                  
                      <th><Input  defaultValue={props.name} className={classes.input}   ></Input></th>
                  </tr>
                </tbody>
                <tbody><tr style={{height:'15px'}}></tr></tbody>
                <tbody>
                  <tr >
                      <th>Điện thoại</th>
                      <th><Input  defaultValue={props.phone} className={classes.input} ></Input></th>
                  </tr>
                </tbody>
               <tbody><tr style={{height:'15px'}}></tr></tbody>
                <tbody>
                  <tr>
                      <th>Tỉnh/Thành phố</th>
                      <th><Input defaultValue={props.city} className={classes.input}  onChange={handleCityInputChange}></Input></th>
                  </tr>
                </tbody>
                <tbody><tr style={{height:'15px'}}></tr></tbody>
                <tbody>
                  <tr>
                      <th>Quận/Huyện</th>
                      <th><Input defaultValue={props.district} className={classes.input}  onChange={handleDistrictInputChange}></Input></th>
                  </tr>
                </tbody>
                <tbody><tr style={{height:'15px'}}></tr></tbody>
                <tbody>
                  <tr>
                      <th>Phường/Xã</th>
                      <th><Input defaultValue={props.ward} className={classes.input}  onChange={handleWardInputChange}></Input></th>
                  </tr>
                </tbody>
                <tbody><tr style={{height:'15px'}}></tr></tbody>
                <tbody>
                  <tr>
                      <th>Địa chỉ</th>
                      <th><Input defaultValue={props.specificAddress} className={classes.input}  onChange={handleAddressInputChange}></Input></th>
                  </tr>
                </tbody>
               <tbody><tr style={{height:'15px'}}></tr></tbody>
               <tbody>
                <tr>
                      <th></th>
                      <th >
                          <Button variant="contained" size='small' onClick={() => props.onClick()}>Hủy bỏ</Button>
                          <Button variant="contained" size='small' color='primary' onClick={handleSubmit}>Cập nhật</Button>
                      </th>
                      
                  </tr>
               </tbody>
                
               
            </table>
        </div>
       </div>
    );
};

export default AddressInputForm;