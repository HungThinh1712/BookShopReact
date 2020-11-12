import React from 'react';
import Header from './../../common/Header'
import SideBarAdminPage from '../../common/SideBarAdminPage'

const index = () => {
    return (
        <div>
            <div id="wrapper">
                <SideBarAdminPage/>
                <div id="content-wrapper">

                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Trang chủ</li>
                        </ol>
                        <div className='row'>
                            <div className="col-xl-5 col-sm-6 mb-5">
                                <div className="card text-white bg-primary o-hidden h-100">
                                    <div className="card-body">
                                        <div className="card-body-icon">
                                            <i className="fas fa-fw fa-book"></i>
                                        </div>
                                        <div className="mr-5">
                                            <a>Quản lý sách</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

         
                            <div className="col-xl-5 col-sm-6 mb-5">
                                <div className="card text-white bg-warning o-hidden h-100">
                                    <div className="card-body">
                                        <div className="card-body-icon">
                                            <i className="fas fa-fw fa-shopping-cart"></i>
                                        </div>
                                        <div className="mr-5">
                                            <a>Quản lý đơn hàng</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
 
                        </div>
                        <div className='row'>
                            <div className="col-xl-5 col-sm-6 mb-5 ">
                                <div className="card text-white bg-success o-hidden h-100">
                                    <div className="card-body">
                                        <div className="card-body-icon">
                                            <i className="fas fa-fw fa-list"></i>
                                        </div>
                                        <div className="mr-5">
                                            <a>Quản lý loại sách</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-sm-6 mb-5">
                                <div className="card text-white bg-danger o-hidden h-100">
                                    <div className="card-body">
                                        <div className="card-body-icon">
                                            <i className="fas fa-users"></i>
                                        </div>
                                        <div className="mr-5">
                                            <a>Quản lý khách hàng</a>
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

export default index;