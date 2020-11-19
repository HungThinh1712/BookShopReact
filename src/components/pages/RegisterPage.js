import React from 'react';
import Logo from './../Images/logo_hcmute.png'
import SexCheckBox from './../common/SexCheckBok'
const RegisterPage = (props) => {
  return (
    <div className="signin-signup">
    <form  className="sign-up-form">
    <img  style={{width:'70px',height:'80px'}} src={Logo} alt=""/>
      <h2 className="title">Đăng ký</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input type="text" placeholder="Họ và tên" />
      </div>
        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input type="text" placeholder="Email" />
        </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Mật khẩu" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Xác nhận lại mật khẩu" />
      </div>
      <div className="input-field">
        <i className="fas fa-phone-alt"></i>
        <input type="text" placeholder="Số điện thoại" />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input type="date" placeholder="Ngày sinh" />
      </div>
      <SexCheckBox/>
      <div style={{alignItems:'center',display:'flex',justifyContent:'center'}} className="btn_register solid" >Đăng ký</div>
      <div style={{color:'blueviolet',cursor:'pointer'}} onClick={()=>props.history.push('/user_page')}>Đã có tài khoản? Đăng nhập</div>

    </form>


</div>

        
  );
};

export default RegisterPage;