import React from 'react';

import SideBarAdminPage from '../../common/SideBarAdminPage'
import Header from '../../common/Header'
import Footer from '../../common/Footer'

const index = () => {
    return (
        <div>
            <div id="wrapper">
                <Header/>
                <SideBarAdminPage/>
                <div id="content-wrapper" style={{marginTop:'93px'}}>

                    <div className="container-fluid">
                        <div className='row'>
                            <div className="col-xl-5 col-sm-6 mb-5" style={{cursor:'pointer'}}>
                                <div className="card text-white bg-primary o-hidden h-100">
                                    <div className="card-body">
                                        <div className="card-body-icon" >
                                            <i className="fas fa-fw fa-book"></i>
                                        </div>
                                        <div className="mr-5">
                                            <a>Quản lý sách</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-5 col-sm-6 mb-5" style={{cursor:'pointer'}}>
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
                            <div className="col-xl-5 col-sm-6 mb-5 " style={{cursor:'pointer'}}>
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
                            <div className="col-xl-5 col-sm-6 mb-5" style={{cursor:'pointer'}}>
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
            <div style={{ paddingTop: '180px' }}><Footer /></div>
        </div>
    );
};

export default index;