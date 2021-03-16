import React from 'react';
import {withRouter} from 'react-router-dom'
const SideBarAdminPage = (props) => {
    return (
        <div style={{marginTop:'85px'}}>
           <ul style={{cursor:'pointer'}} className="sidebar navbar-nav">
                    <li className="nav-item active" onClick={()=>props.history.push('/admin')}>
                        <div className="nav-link" >
                            <i className="fas fa-home"></i>
                            <span>Trang chủ</span>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" onClick={()=>props.history.push('/admin/books')}>
                            <i className="fas fa-book"></i>
                            <span>Quản lý sách</span></a>
                    </li>
                    <li className="nav-item">
                        <a onClick={()=>props.history.push('/admin/ordermanagement_page')} className="nav-link" >
                            <i className="fas fa-shopping-cart"></i>
                            <span>Quản lý đơn hàng</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={()=>props.history.push('/admin/customer_page')}>
                            <i className="fas fa-users"></i>
                            <span>Quản lý khách hàng</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={()=>props.history.push('/admin/usermanagement_page')}>
                            <i className="fas fa-user-circle"></i>
                            <span>Quản lý tài khoản</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={()=>props.history.push('/admin/authormanagement_page')}>
                            <i className="fas fa-users"></i>
                            <span>Quản lý tác giả</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={()=>props.history.push('/admin/typemanagement_page')}>
                            <i className="fas fa-book-open"></i>
                            <span>Quản lý loại sách</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={()=>props.history.push('/admin/pulishinghousemanagement_page')}>
                            <i className="fas fa-laptop-house"></i>
                            <span>Quản lý nhà xuất bản</span></a>
                    </li>
                </ul> 
        </div>
    );
};

export default withRouter(SideBarAdminPage);