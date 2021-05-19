import React from 'react';

import SideBarAdminPage from '../../common/SideBarAdminPage'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import {withRouter} from 'react-router-dom'
import BreadCrumb from "../../common/Breadcrumbs";

const index = (props) => {
    return (
        <div>
            <div id="wrapper">
                <Header notShow="notShow"/>
                <SideBarAdminPage/>
                {/* <div id="content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <a href="books.html" className="card-link">
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
                            </a>

                            <a href="orders.html" className="card-link">
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
                            </a>
                        </div>

                        <div className="row">
                            <a href="types.html" className="card-link">
                            <div className="col-xl-5 col-sm-6 mb-3">
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
                            </a>

                            <a href="customers.html" className="card-link">
                            <div className="col-xl-5 col-sm-6 mb-3">
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
                            </a>
                        </div>
                    </div>
                </div> */}

                <div id="content-wrapper"  style={{with:'100%',marginTop:'93px'}}>
                    <div className="container-fluid">
                    <BreadCrumb breadcrumb="" link_root="/admin"></BreadCrumb>
                        <a style={{cursor:'pointer'}} onClick={()=>props.history.push('/admin/books')}  className="card-link" >
                            <div >
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
                        </a>
                        <a style={{cursor:'pointer'}} onClick={()=>props.history.push('/admin/ordermanagement_page')} className="card-link">
                            <div >
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
                        </a>
                        <a style={{cursor:'pointer'}} onClick={()=>props.history.push('/admin/customer_page')} className="card-link">
                            <div>
                                <div className="card text-white bg-success o-hidden h-100">
                                    <div className="card-body">
                                        <div className="card-body-icon">
                                            <i className="fas fa-fw fa-list"></i>
                                        </div>
                                        <div className="mr-5">
                                            <a>Quản lý khách hàng</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: '180px' }}><Footer /></div>
        </div>
    );
};

export default withRouter(index);