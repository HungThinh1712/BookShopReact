import React from "react";
import { withRouter } from "react-router-dom";
const SideBarAdminPage = (props) => {
    return (
        <div style={{marginTop:'85px'}}>
            <div className="profile-sidebar" style={{width: '270px'}}>
                <div className="profile-usermenu">
                    <div className="nav flex-column nav-pills" aria-orientation="vertical" >
                        <div onClick={()=>props.history.push('/admin')} className="nav-link" ><i className="fas fa-user"></i> Trang chủ</div>
                        <div onClick={()=>props.history.push('/admin/books')} className="nav-link" ><i className="fas fa-book" ></i> Quản lý sách</div>
                        <div onClick={()=>props.history.push('/admin/ordermanagement_page')} className="nav-link" ><i className="fas fa-shopping-cart"></i> Quản lý đơn hàng</div>
                        <div onClick={()=>props.history.push('/admin/customer_page')} className="nav-link" ><i className="fas fa-users"></i> Quản lý khách hàng</div>
                        <div onClick={()=>props.history.push('/admin/usermanagement_page')} className="nav-link" ><i className="fas fa-user-circle"></i> Quản lý tài khoản</div>
                        <div onClick={()=>props.history.push('/admin/authormanagement_page')} className="nav-link" ><i className="fas fa-users"></i> Quản lý tác giả</div>
                        <div onClick={()=>props.history.push('/admin/typemanagement_page')} className="nav-link" ><i className="fas fa-book-open"></i> Quản lý loại sách</div>
                        <div onClick={()=>props.history.push('/admin/pulishinghousemanagement_page')} className="nav-link" ><i className="fas fa-laptop-house"></i> Quản lý NXB</div>    
                        <div onClick={()=>props.history.push('/admin/report_page')} className="nav-link" ><i className="fas fa-signal"></i> Thống kê</div>                        
                    
                    </div>
                </div>
            </div>
      </div>
  );
};

export default withRouter(SideBarAdminPage);
