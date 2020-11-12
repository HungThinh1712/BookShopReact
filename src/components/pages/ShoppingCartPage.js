 import React from 'react';
import IteminCart from '../common/IteminCart';
import Header from '../common/Header'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider';
import {useDispatch} from 'react-redux'
import * as cartActions from '../../actions/cartAction'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {useSelector} from "react-redux";
const useStyles = makeStyles((theme) => ({


  container: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '120px',
      width: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '87px',
      marginTop: '120px',
      width: '72%'
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '80px',
      width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '80px',
      width: '100%'
    },
  },


  total: {
    display: 'flex', flexDirection: 'column', marginTop: '120px', marginLeft: '10px', width: '250px', height: '130px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '5px',
      marginLeft: '0px',
      width: '100%'
    },
  },
  flex_div: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column'
    },
  },
  button_order: {
   marginLeft: '10px',marginTop:'5px',width:'250px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '2px',
      marginLeft: '0px',
      width: '100%'
    },
  },


}));

const ShoppingCartPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items ? state.cart : []);

  const showCartItems = Object.values(cartItems.items).map((cartItem)=>

    <div >
      <IteminCart
      key={cartItem.bookId }
      title = {cartItem.name}
      price = {cartItem.price}
      coverPrice = {cartItem.coverPrice}
      discount = {cartItem.discount}
      amount = {cartItem.amount}
      image ={cartItem.image}
      bookId ={cartItem.bookId}
      authorName = {cartItem.authorName}
      deleteItem={() => {
        dispatch(cartActions.deleteFromCart(cartItem.bookId))
    }}
    />
    { Object.values(cartItems.items).length > 1 ? <Divider/>:null}
    </div>
  )
  const GetTotalMoney = Object.values(cartItems.items).reduce((totalMoney, cartItem) => totalMoney + cartItem.amount*cartItem.price, 0);

  return (
    <div>
      <Header></Header>
      {Object.values(cartItems.items).length > 0 ?  <div className={classes.flex_div} >
        <Paper className={classes.container} style={{ display: 'flex', flexDirection: 'column' }}>
          {showCartItems}
        </Paper>
        <div>
          <Paper className={classes.total}>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row' }}>
              <h6>Tạm tính: </h6>
              <div style={{ flexGrow: '1' }} />
              <h6>{GetTotalMoney.toFixed(3)}đ</h6>
            </div>
            <Divider />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'row' }}>
              <h6>Thành tiền: </h6>
              <div style={{ flexGrow: '1' }} />
              <h6>{GetTotalMoney.toFixed(3)}đ</h6>
            </div>

          </Paper>
          <Button className={classes.button_order} variant="contained" color="primary" onClick={() => props.history.push("/address_shipping")}>
            Tiến hành đặt hàng
      </Button>
        </div>

      </div>:<h1 style={{marginTop:"200px"}}>Hiện tại không có sản phẩm trong giỏ hàng</h1>}

    </div>
  );
};

export default ShoppingCartPage;