import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ItemInOrder from './ItemInOrderDetails'
import Divider from '@material-ui/core/Divider';

export default function FormDialog(props) {

    
    const itemsInOrder =props.items;
    console.log(itemsInOrder);
    const showItemsInOrder = itemsInOrder.map((item) =>

    <div >
      <ItemInOrder
        key={item.bookId}
        title={item.name}
        price={item.price}
        coverPrice={item.coverPrice}
        discount={Math.ceil(((item.coverPrice - item.price) / item.coverPrice) * 100)}
        amount={item.amount}
        imageSrc={item.imageSrc}
        bookId={item.bookId}   
      />
      {itemsInOrder.length > 1 ? <Divider /> : null}
    </div>
  )
    
    return (
   
            <Dialog fullWidth={true}  open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogContent style={{with:'100%'}} >
                    <div  >
                    <p style={{ fontSize: '25px', fontWeight: 500, marginTop: "-7px" }}>Chi tiết đơn hàng</p>
                    {showItemsInOrder}
                </div>  

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Thoát
                    </Button>
                    
                </DialogActions>
            </Dialog> 
    );
}


