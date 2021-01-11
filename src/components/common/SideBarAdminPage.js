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
                </ul> 
        </div>
    );
};

export default withRouter(SideBarAdminPage);