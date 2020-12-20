import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button'
import AddressInputForm from './AddressInputForm'
import {useSelector,useDispatch} from 'react-redux'
import Zoom from 'react-reveal/Zoom'
import * as cartActions from '../../actions/cartAction';

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
  const dispatch = useDispatch();
  const [hideAddressForm,setHideAdressForm] = useState('none');
  const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
  const cartItems = useSelector(state => state.cart.items ? state.cart : []);
  const fullName = useSelector(state => state.auth.userData && state.auth.userData.fullName ? state.auth.userData.fullName : null)
  const specificAddress = useSelector(state => state.auth.userData && state.auth.userData.specificAddress ? state.auth.userData.specificAddress : null)
  const id = useSelector(state => state.auth.userData && state.auth.userData.id ? state.auth.userData.id : null)
  
  const handleOpenAddressFormClick = (value) =>{
    if(value==='' || value===undefined){
      setHideAdressForm('none')
    }else{
      setHideAdressForm('')
    }
    
  }

  const handlePaymentClick = ()=>{
    props.history.push('/payment')
    dispatch(cartActions.updateBookAmount(cartItems))
  }

  return (
    <div  >
      {specificAddress ? <div className={classes.address_zone} >
        <div >
          <div style={{ fontWeight: '700', fontSize:'30px',color:'red'}}  >2. Địa chỉ giao hàng</div>
          <div style={{ display: 'flex', flexDirection: 'column', borderStyle: 'solid',borderWidth: '2px', padding: '10px',marginTop:'20px',borderColor:'blueviolet',borderRadius:'5px'}}>
              <div style={{ fontWeight: '800',color:'red',fontFamily: 'Roboto ' }}>{userData.fullName}</div>
              <div style={{fontSize:'14px',fontWeight:'500'}} >Địa chỉ: {userData.specificAddress}, {userData.wardName}, {userData.districtName}, {userData.provinceName}</div>
              <div style={{display:'flex'}}>
                <div style={{fontSize:'14px',fontWeight:'500',paddingRight:'5px'}}>{`Điện thoại: `} </div>
                <div style={{fontSize:'14px',fontWeight:'500',color:'red'}}>{userData.phone}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row',marginTop:'10px' }} >
                <Button variant="contained" color="primary" size='small' style={{marginRight:'10px'}} onClick={handlePaymentClick}>Giao đến địa chỉ này</Button>
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
          name = {fullName ? userData.fullName: fullName }
          phone = {fullName ? userData.phone: ''}
          provinceId = {fullName ? userData.provinceId: '0'}
          districtId = {fullName ? userData.districtId: '0'}
          wardId ={fullName ? userData.wardId: '0'}
          specificAddress = {fullName ? userData.specificAddress: ''} 
          id ={id} 
          props={props}
          tag='1'/>
        </Zoom>
      </div>
    </div>
  );
}
export default withRouter(HeaderinPayment);