import React from 'react';
import AddressZone from '../common/AddressZone'
import HeaderInPayment from '../common/HeaderInPayment'

const AddressPage = () => {
    return (
        <div>
            <HeaderInPayment step ={1}/>
            <AddressZone/>
        </div>
    );
};

export default AddressPage;