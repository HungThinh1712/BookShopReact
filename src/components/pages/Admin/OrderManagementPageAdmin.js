import React, { useEffect, useState } from 'react';
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import SideBarAdminPage from '../../common/SideBarAdminPage'
import { useDispatch, useSelector } from 'react-redux';
import * as bookActions from '../../../actions/booksAction';
import { withRouter } from 'react-router-dom';
import OrderManagementAdmin from './../../common/OrderMangementAdmin'
import { Radio} from 'antd';
import * as orderActions from '../../../actions/orderAction'



const CheckBox = () => {
   const dispatch = useDispatch();
  const radioStyle = {
    display: 'block',
    height: '30px',
   
    padding:'10px',
    fontWeight:'600'
  };
  const [value,setValue] = useState(0);
  const handleChange = (e) =>{
      setValue(e.target.value)
      dispatch(orderActions.getAllOrdersRequest(1,10,e.target.value))
  }

  return (
    <Radio.Group style={{flexDirection:'row',display:'flex'}} onChange={handleChange} value={value}>
        <Radio style={radioStyle}  value={0}>
           {`  Tất cả`}
      </Radio>
      <Radio style={radioStyle}  value={1}>
           {`  Đã xác nhận`}
      </Radio>
      <Radio style={radioStyle} value={2}>
        {` Chưa xác nhận`}
      </Radio>
    </Radio.Group>
  );
};


const OrderManagementPageAdmin = (props) => {

   
    return (
        <div>
            <div id="wrapper">
                <Header notShow="notShow" />

                <SideBarAdminPage />
                <div id="content-wrapper" style={{ marginTop: '100px' }}>

                    <div className="container-fluid">
                        <div className="card mb-3">

                            <div className="card-body">
                                <div className="table-wrapper">
                                    <div className="table-title">
                                        <div className="row">
                                            <div className="col-sm-8"><h2>Quản lý đơn hàng</h2></div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                            {CheckBox()}
                                        </div>
                                        <div className="row">
                                            <OrderManagementAdmin />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: '180px' }}><Footer /></div>
        </div>
    );
};

export default withRouter(OrderManagementPageAdmin);