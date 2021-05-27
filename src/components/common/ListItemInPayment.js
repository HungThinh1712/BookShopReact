import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button'
import ItemInPayment from './ItemCartInPayment'
import {useSelector,useDispatch} from "react-redux";
import * as cartAction from './../../actions/cartAction'
import { withRouter } from "react-router-dom";
import {useTranslation} from 'react-i18next'

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
            <div style={{ display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderWidth: '2px', marginTop:'20px',borderColor:'blueviolet',borderRadius:'5px'  }}>
                <div style={{ display: 'flex',justifyContent:'space-between' }} >
                    <div style={{ fontWeight: '700', fontSize: '17px', padding: '10px' }}>{t('Customer_Shopping_Payment.23')}</div>
                    <div style={{ padding: '10px', marginLeft: '200px' }}>
                        <Button onClick={() => props.history.push("/cart")} variant="contained" size="small">{t('Customer_Shopping_Payment.10')}</Button>
                    </div>
                </div>
                <div style={{backgroundColor:'blueviolet',height:'1px'}}></div> 
                {showCartItems}
                <div style={{backgroundColor:'blueviolet',height:'1px'}}></div>
                <div style={{ display: 'flex',justifyContent:'space-between' }} >
                    <div style={{ fontWeight: '600', fontSize: '17px', padding: '10px' }}>{t('Customer_Shopping_Payment.4')}</div>
                    <div style={{ padding: '10px', marginLeft: '200px' }}>
                        <div style={{color:'red',fontSize:'20px',fontWeight:'500'}}>{GetTotalMoney.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ</div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default withRouter(ListItemIPayment);