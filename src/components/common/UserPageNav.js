import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


    
  

const UserPageNav = (props) => {
    return (
        <div className="col-xs-5 col-sm-4 col-md-3" >
                        <div className="profile-sidebar">
                            <div className="profile-userpic">
                                <img src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/54405747_351583202134051_4921112646595379200_n.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_ohc=IfamBAL5mFoAX93Edqd&_nc_ht=scontent.fvca1-1.fna&oh=af65469f8b11c333aab27cf0edd86baf&oe=5FD9329B" className="img-responsive" alt="Thông tin cá nhân" />
                            </div>
                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name">{props.name}</div>
                            </div>
                            <div className="profile-userbuttons">
                                <button type="button" className="btn btn-success btn-sm">Trang chủ</button>
                                <button type="button" className="btn btn-danger btn-sm">Đăng xuất</button>
                            </div>
                            <div className="profile-usermenu">
                                <div className="nav flex-column nav-pills" aria-orientation="vertical" >
                                <a className="nav-link active" style={{backgroundColor:"white",color:'blueviolet'}} ><i className="fas fa-user"></i> Thông tin tài khoản</a>
                                        <a className="nav-link" ><i className="fas fa-shopping-cart" ></i> Quản lý đơn hàng</a>
                                        <a className="nav-link" ><i className="fas fa-tag"></i> Địa chỉ đã gán</a>
                                        <a className="nav-link" ><i className="fas fa-bell"></i> Thông báo của tôi</a>
                                </div>
                            </div>
                        </div>
                    </div>
    );
};

export default UserPageNav;