import React, {useEffect} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import ItemInPayment from './ItemCartInPayment'
import {useSelector,useDispatch} from "react-redux";
import * as cartAction from './../../actions/cartAction'


const ListItemIPayment = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items ? state.cart : []);
  const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).id : null
  useEffect(()=>{
    if(userId !=null){
      dispatch(cartAction.getCartByUserIdRequest(userId))
    }
  },[userId])
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

    const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderWidth: '2px', marginTop:'20px',borderColor:'blueviolet',borderRadius:'5px'  }}>
                <div style={{ display: 'flex',justifyContent:'space-between' }} >
                    <div style={{ fontWeight: '700', fontSize: '17px', padding: '10px' }}>Đơn hàng</div>
                    <div style={{ padding: '10px', marginLeft: '200px' }}>
                        <Button variant="contained" size="small">Sửa</Button>
                    </div>
                </div>
                <div style={{backgroundColor:'blueviolet',height:'1px'}}></div> 
                {showCartItems}
                <div style={{backgroundColor:'blueviolet',height:'1px'}}></div>
                <div style={{ display: 'flex',justifyContent:'space-between' }} >
                    <div style={{ fontWeight: '600', fontSize: '17px', padding: '10px' }}>Thành tiền</div>
                    <div style={{ padding: '10px', marginLeft: '200px' }}>
                        <div style={{color:'red',fontSize:'20px',fontWeight:'500'}}>1.000.000 đ</div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ListItemIPayment;