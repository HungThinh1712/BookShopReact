import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {useSelector} from 'react-redux'
import Button from '@material-ui/core/Button'

const ItemCartInPayment = (props) => {
    const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
    return (
        <div style={{ display: 'flex' ,justifyContent:'space-between'}} >
            <div style={{display:'flex'}}>
             <div style={{ fontWeight: '500', fontSize: '14px', padding: '10px' }}>{props.amount} x </div>
             <div style={{ fontWeight: '500', fontSize: '14px', padding: '10px',color:'blueviolet' }}>{props.title}</div>
            </div>
            <div style={{ padding: '10px', marginLeft: '200px' }}>
                <div style={{ fontWeight: '500', fontSize: '14px'}} >{props.price} đ</div>
            </div>
        </div> 
    );
};

export default ItemCartInPayment;