import React, { useState } from 'react';
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import SideBarAdminPage from '../../common/SideBarAdminPage'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import OrderManagementAdmin from './../../common/OrderMangementAdmin'
import { Radio} from 'antd';
import * as orderActions from '../../../actions/orderAction'
import BreadCrumb from "../../common/Breadcrumbs";
import {useTranslation} from "react-i18next"

const CheckBox = () => {
    const { t } = useTranslation();
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
            {t('Admin_Other.1')}
        </Radio>
        <Radio style={radioStyle}  value={1}>
            {t('Admin_Other.2')}
        </Radio>
        <Radio style={radioStyle} value={2}>
            {t('Admin_Other.3')}
        </Radio>
    </Radio.Group>
  );
};


const OrderManagementPageAdmin = (props) => {
    const { t } = useTranslation();
    return (
        <div>
            <div id="wrapper">
                <Header notShow="notShow" />

                <SideBarAdminPage />
                <div id="content-wrapper" style={{ marginTop: '100px', marginLeft: '250px' }}>
                    <div className="container-fluid">
                    <BreadCrumb 
                        breadcrumb={t('Admin_Home_BreadCrumbs.19')} onClick={()=>props.history.push("/admin")} onClick2={()=>props.history.push("/admin/ordermanagement_page")}>
                    </BreadCrumb>
                        <div className="card mb-3">

                            <div className="card-body">
                                <div className="table-wrapper">
                                    <div className="table-title">
                                        <div className="row">
                                            <div className="col-sm-8"><h2>{t('Admin_Home_BreadCrumbs.19')}</h2></div>
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
        </div>
    );
};

export default withRouter(OrderManagementPageAdmin);