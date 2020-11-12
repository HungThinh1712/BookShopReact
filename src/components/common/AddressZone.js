import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button'
import AddressInputForm from './AddressInputForm'
import {useSelector} from 'react-redux'
import Zoom from 'react-reveal/Zoom'



const useStyles = makeStyles((theme) => ({

  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'white',

  },
  toolBar: {

    [theme.breakpoints.up('sm')]: {
      marginRight: '0px',
      marginLeft: '0px',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '220px',
      marginRight: '50px'
    },

    [theme.breakpoints.down('xs')]: {
      marginRight: '0px',
      marginLeft: '0px',
    },

  },
  title: {
    display: 'none',
    color: '#8470FF',
    textTransform: 'uppercase',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontSize: '40px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'Righteous'
  },
  address_zone: {
    display:'inline-block',
    [theme.breakpoints.up('lg')]: {
      marginTop: '20px', marginLeft: '250px'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '20px', marginLeft: '250px'
    },
 
  
  }
}));

const HeaderinPayment = (props) => {
  const classes = useStyles();

  const [hideAddressForm,setHideAdressForm] = useState('none');
  const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
  const specificAddress = useSelector(state => state.auth.userData && state.auth.userData.specificAddress ? state.auth.userData.specificAddress : null)
  const id = useSelector(state => state.auth.userData && state.auth.userData.id ? state.auth.userData.id : null)
  
  const handleOpenAddressFormClick = (value) =>{
    if(value==='' || value===undefined){
      setHideAdressForm('none')
    }else{
      setHideAdressForm('')
    }
    console.log(value);
  }

  return (
    <div  >
      {specificAddress ? <div className={classes.address_zone} >
        <div >
          <div style={{ fontWeight: '800'}}  >2. Địa chỉ giao hàng</div>
          <div style={{ display: 'flex', flexDirection: 'column', borderStyle: 'solid',borderWidth: '2px', padding: '10px',marginTop:'20px'}}>
              <div style={{ fontWeight: '800' }}>{userData.fullName}</div>
              <div style={{fontSize:'13px',fontWeight:'500'}} >Địa chỉ: {userData.specificAddress}, {userData.ward}, {userData.district}, {userData.city}</div>
              <div style={{fontSize:'13px',fontWeight:'500'}}>Điện thoại: {userData.phone}</div>
              <div style={{ display: 'flex', flexDirection: 'row',marginTop:'10px' }} >
                <Button variant="contained" color="primary" size='small' style={{marginRight:'10px'}}>Giao đến địa chỉ này</Button>
                <Button variant="contained" size='small'  onClick={(hideAddressForm)=>handleOpenAddressFormClick(hideAddressForm)} >Sửa</Button>
              </div>
          </div>
        </div>

      </div> :<div className={classes.address_zone} >
        <div >
          <h8 style={{ fontWeight: '800'}}  >2. Địa chỉ giao hàng</h8>
          <div style={{ display: 'flex', flexDirection: 'column', borderStyle: 'solid',borderWidth: '2px', padding: '10px',marginTop:'20px'}}>
              <div style={{fontSize:'20px',fontWeight:'500'}} >Hiện tại bạn chưa cập nhật địa chỉ giao hàng !</div>
              <div style={{ display: 'flex', flexDirection: 'row',marginTop:'10px' }} >
                <Button variant="contained" color="primary" size='small' style={{marginRight:'10px'}} onClick={handleOpenAddressFormClick}>Cập nhật địa chỉ giao hàng</Button>
              </div>
          </div>
        </div>

      </div>}
      <div style={{display : `${hideAddressForm}`}}>
        <Zoom >
          <AddressInputForm 
          display={hideAddressForm} 
          onClick={(hideAddressForm)=>handleOpenAddressFormClick(hideAddressForm)}
          name = {specificAddress ? userData.fullName: ''} 
          phone = {specificAddress ? userData.phone: ''}
          city = {specificAddress ? userData.city: ''}
          district = {specificAddress ? userData.district: ''}
          ward ={specificAddress ? userData.ward: ''}
          specificAddress = {specificAddress ? userData.specificAddress: ''} 
          id ={id} 
          props={props}/>
        </Zoom>
      </div>
    </div>
  );
}
export default withRouter(HeaderinPayment);