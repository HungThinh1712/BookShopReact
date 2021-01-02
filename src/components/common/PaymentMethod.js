import React, {useState} from 'react';
import CheckBox from './../common/CheckBox'
import {makeStyles} from '@material-ui/core/styles'
import ListItemInPayment from './ListItemInPayment'
import Button from '@material-ui/core/Button'
import {useDispatch,useSelector} from 'react-redux';
import * as cartActions from '../../actions/cartAction';
import {withRouter, Redirect} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    payment_method_zone: {
      display:'inline-block'
    }
  }));

const PaymentMethod = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items ? state.cart : []);
    const GetTotalMoney =  Object.values(cartItems.items).reduce((totalMoney, cartItem) => totalMoney + cartItem.amount * cartItem.price, 0);
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [checked,setChecked] =  useState(true)
    const handleClick = () => {
        if(paymentMethod===1){
            dispatch(cartActions.payForCart());
            props.history.push('/order_success_page')
        }
        else{
            dispatch(cartActions.payWithMomo(GetTotalMoney.toFixed(3).toString().replace(".","")))
        }
    }
    const handlePaymentMethodInputChange = (e) => {
        
        setPaymentMethod(e.target.value);
    
      };
    const onChange = e => {
        setChecked(!checked)
    }
    return (
        <div className={classes.payment_method_zone}>

            <div style={{ display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderWidth: '2px', borderColor: 'blueviolet',borderRadius:'5px' }}>
                <div style={{ display: 'flex' }} >
                    <div style={{ fontWeight: '700', fontSize: '17px', padding: '10px' }}>Phương thức thanh toán</div>
                </div>
                <div style={{ backgroundColor: 'blueviolet', height: '1px' }}></div>
                <CheckBox value={paymentMethod} onChange={handlePaymentMethodInputChange} />
            </div>
            <ListItemInPayment style={{ marginTop: '40px' }} />
            <Button onClick={handleClick} variant="contained" style={{ width: '100%', marginTop: '10px' }} color="primary">Đặt mua</Button>
        </div>
    );
};

export default withRouter(PaymentMethod);