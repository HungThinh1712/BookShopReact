import React from 'react';
import { useDispatch } from 'react-redux'
import * as authActions from './../../actions/authAction'
import * as cartActions from './../../actions/cartAction'
import { withRouter } from 'react-router-dom'





const UserPageNav = (props) => {

    const dispatch = useDispatch();
    const handleLogoutClick = () => {
        dispatch(authActions.logOut());
        dispatch(cartActions.clearStateCart())
        props.props.history.push('/')
    }
    const handleOrderHistoryClick = () => {

        props.history.push('/order_history')
    }
    const handleUserPageClick = () => {

        props.history.push('/user_page')
    }
    const handleUpdateAddressClick = () => {

        props.history.push('/update_address_page')
    }
    return (
        <div className="col-xs-5 col-sm-4 col-md-3" >
            <div className="profile-sidebar">
                <div className="profile-userpic" style={{ backgroundColor: 'white', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                </div>
                <div className="profile-usertitle">
                    <div className="profile-usertitle-name">{props.name}</div>
                </div>
                <div className="profile-userbuttons">
                    <button type="button" className="btn btn-success btn-sm">Trang chủ</button>
                    <button className="btn btn-danger btn-sm" onClick={handleLogoutClick}>Đăng xuất</button>
                </div>
                <div className="profile-usermenu">
                    <div className="nav flex-column nav-pills" aria-orientation="vertical" >
                        <a onClick={handleUserPageClick} className="nav-link " ><i className="fas fa-user"></i> Thông tin tài khoản</a>
                        <a onClick={handleOrderHistoryClick} className="nav-link" ><i className="fas fa-shopping-cart" ></i> Quản lý đơn hàng</a>
                        <a onClick={handleUpdateAddressClick} className="nav-link" ><i className="fas fa-tag"></i> Địa chỉ đã gán</a>
                        <a className="nav-link" ><i className="fas fa-bell"></i> Thông báo của tôi</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(UserPageNav);