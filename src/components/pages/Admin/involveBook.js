import React, { useState, useEffect } from 'react';
import SideBarAdminPage from '../../common/SideBarAdminPage'
import Header from './../../common/Header'
import Footer from './../../common/Footer'
import { useSelector, useDispatch } from 'react-redux'
import InvolveBook from './../../common/involveBook'


const OrderManage = (props) => {


    return (
        <div>
        <div id="wrapper">
            <Header notShow="notShow" />
            <SideBarAdminPage />
            <div id="content-wrapper" style={{ marginTop: '100px', marginLeft: '250px' }}>

                <div className="container-fluid">
                    <div className="card mb-3">

                        <div className="card-body">
                            <div className="table-wrapper">
                                <div className="table-title">
                                    <div className="row">
                                        <div className="col-sm-8"><h2>Quản lý danh mục liên quan đến sách</h2></div>
                                    </div>
                                </div>
                                <div className="container">
                                    
                                    <div className="row">
                                        <InvolveBook />
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

export default OrderManage;