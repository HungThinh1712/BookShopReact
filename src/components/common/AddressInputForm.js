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
    const [name,setName] =useState(props.name);
    const [phone,setPhone] = useState(props.phone)
    const [city, setCity] = useState(props.city);
    const [district, setDistrict] = useState(props.district);
    const [ward, setWard] = useState(props.ward);
    const [address, setAddress] = useState(props.specificAddress);
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
  const handleNameInputChange = e => {
    setName(e.target.value);
  };
  const handlePhoneInputChange = e => {
    setPhone(e.target.value);
  };

  const handleSubmit = async e => {
    const userAddress = { id,name,phone, city, district,ward,address };
    await dispatch(
        authActions.updateAddressOfCurrentUser(userAddress,props.props.history)
        
    );
    props.onClick();
  };
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'inline-block', marginTop: '20px', padding: '10px' }}>

          <div className="input-field" style={{ width: '1000px' }}>
            <i className="fas fa-user"></i>
            <input type="text" value={name} onChange={handleNameInputChange} placeholder="Họ và tên" />
          </div>
          <div className="input-field" >
            <i className="fas fa-phone"></i>
            <input type="text" value={phone} onChange={handlePhoneInputChange} placeholder="Số điện thoại" />
          </div>
          <div className="input-field">
            <i className="fas fa-city"></i>
            <input value={city} onChange={handleCityInputChange} placeholder="Thành phố" />
          </div>
          <div className="input-field" >
            <i className="fas fa-archway"></i>
            <input value={district} onChange={handleDistrictInputChange} placeholder="Quận / Huyện" />
          </div>
          <div className="input-field" >
            <i className="fas fa-bullseye"></i>
            <input type="text" onChange ={handleWardInputChange} value={ward} placeholder="Xã / Phường" />
          </div>
          <div className="input-field" >
            <i className="fas fa-map-marker"></i>
            <input type="text" onChange={handleAddressInputChange} value={address} placeholder="Địa chỉ" />
          </div>
          <Button onClick={handleSubmit}>
            Cập nhật
          </Button>
          <Button onClick={()=>props.onClick()}>
            Hủy
          </Button>
        </div>
      </div>
    );
};

export default AddressInputForm;