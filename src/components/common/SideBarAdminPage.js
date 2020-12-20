import React from 'react';
import {withRouter} from 'react-router-dom'
const SideBarAdminPage = (props) => {
    return (
        <div style={{marginTop:'85px'}}>
           <ul className="sidebar navbar-nav">
                    <li className="nav-item active" onClick={()=>props.history.push('/admin')}>
                        <div className="nav-link" >
                            <i className="fas fa-home"></i>
                            <span>Trang chủ</span>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="books.html">
                            <i className="fas fa-book"></i>
                            <span>Quản lý sách</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="orders.html">
                            <i className="fas fa-shopping-cart"></i>
                            <span>Quản lý đơn hàng</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="types.html">
                            <i className="fas fa-list"></i>
                            <span>Quản lý loại sách</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="customers.html">
                            <i className="fas fa-users"></i>
                            <span>Quản lý khách hàng</span></a>
                    </li>
                </ul> 
        </div>
    );
};

export default withRouter(SideBarAdminPage);