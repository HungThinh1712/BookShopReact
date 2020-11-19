import React, {useState} from 'react';
import CheckBox from './../common/CheckBox'
import {makeStyles} from '@material-ui/core/styles'
import ListItemInPayment from './ListItemInPayment'
import Button from '@material-ui/core/Button'
const useStyles = makeStyles((theme) => ({
    payment_method_zone: {
      display:'inline-block'
    }
  }));

const PaymentMethod = () => {
    const classes = useStyles();
    const [checked,setChecked] =  useState(true)
  
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
                <CheckBox />
            </div>
            <ListItemInPayment style={{ marginTop: '40px' }} />
            <Button variant="contained" style={{ width: '100%', marginTop: '10px' }} color="primary">Đặt mua</Button>
        </div>
    );
};

export default PaymentMethod;