import React, {useEffect,useState} from 'react';
import Button from '@material-ui/core/Button'
import ItemInPayment from './ItemCartInPayment'
import {useSelector,useDispatch} from "react-redux";
import * as cartAction from './../../actions/cartAction'
import { withRouter } from "react-router-dom";
import {useTranslation} from 'react-i18next'
import axios from "axios"
import * as CallApis from "../../constants/Apis"

const ListItemIPayment = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items ? state.cart : []);
  const GetTotalMoney =  Object.values(cartItems.items).reduce((totalMoney, cartItem) => totalMoney + cartItem.amount * cartItem.price, 0);
   
  const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).id : null
  useEffect(()=>{
    const fetchUser = () =>{
      if(userId !=null){
        dispatch(cartAction.getCartByUserIdRequest())
      }
    }
   fetchUser();
  },[userId,dispatch])
  const shippingFee = props.distanceAndFee ? props.distanceAndFee.shippingFee.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") :null
  const sumMoney = GetTotalMoney + shippingFee;
  
  const showCartItems = Object.values(cartItems.items).map((cartItem)=>

    <div >
      <ItemInPayment
      key={cartItem.bookId }
      title = {cartItem.name}
      price = {cartItem.price}
      amount = {cartItem.amount}
    />
    </div>
  )

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderWidth: '2px', marginTop:'20px',borderColor:'#253528',borderRadius:'5px'  }}>
                <div style={{ display: 'flex',justifyContent:'space-between' }} >
                    <div style={{ fontWeight: '700', fontSize: '17px', padding: '10px' }}>{t('Customer_Shopping_Payment.23')}</div>
                    <div style={{ padding: '10px', marginLeft: '200px' }}>
                        <Button onClick={() => props.history.push("/cart")} variant="contained" size="small">{t('Customer_Shopping_Payment.10')}</Button>
                    </div>
                </div>
                <div style={{backgroundColor:'#253528',height:'1px'}}></div> 
                {showCartItems}
                <div style={{backgroundColor:'#253528',height:'1px'}}></div>
                <div style={{ display: 'flex',justifyContent:'space-between' }} >
                    <div style={{ fontWeight: '600', fontSize: '13px', padding: '2px',marginLeft:'10px' }}>Phí vận chuyển</div>
                    <div style={{ padding: '2px',marginRight:'10px' }}>
                        <div style={{fontSize:'13px',fontWeight:'500'}}>{`${shippingFee}đ (${props.distanceAndFee ? props.distanceAndFee.distance:null })`}</div>
                    </div>
                </div>
                <div style={{backgroundColor:'#253528',height:'0.5px'}}></div>
                <div style={{ display: 'flex',justifyContent:'space-between' }} >
                    <div style={{ fontWeight: '600', fontSize: '17px', padding: '10px' }}>{t('Customer_Shopping_Payment.4')}</div>
                    <div style={{ padding: '10px', marginLeft: '200px' }}>
                        <div style={{color:'red',fontSize:'20px',fontWeight:'500'}}>{sumMoney.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ</div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default withRouter(ListItemIPayment);