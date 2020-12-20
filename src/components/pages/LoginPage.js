import React, { useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import * as authActions from './../../actions/authAction'
import { withRouter } from "react-router-dom";
import Logo from './../Images/logo_hcmute.png'

const  SignIn= (props) => {
  const dispatch = useDispatch();

  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const cartItems = useSelector(state => state.cart.items ? state.cart : []);
  const cartItemData = Object.values(cartItems.items)
  const handleEmailInputChange = e => {
    setEmailState(e.target.value);
  };

  const handlePasswordInputChange = e => {
    setPasswordState(e.target.value);
  };

  const handleSubmit = async e => {
    const text = { email, password };
    await dispatch(
        authActions.loginUser(text, props.history,cartItemData)
    );
  };
  return (
      <div className="signin-signup">
          <form  className="sign-in-form">
            <img  style={{width:'70px',height:'80px'}} src={Logo} alt=""/>
            <h2 className="title">Đăng nhập</h2>
            <div className="input-field-login">
              <i className="fas fa-envelope"></i>
              <input type="text" onChange={handleEmailInputChange} placeholder="Email" />
            </div>
            <div className="input-field-login">
              <i className="fas fa-lock"></i>
              <input type="password" onChange={handlePasswordInputChange} placeholder="Mật khẩu" />
            </div>
            <div style={{alignItems:'center',display:'flex',justifyContent:'center'}} className="btn-loginpage solid" onClick={handleSubmit} >Đăng nhập</div>
            <div style={{color:'blueviolet',cursor:'pointer'}}>Quên mật khẩu</div>
            <div style={{color:'blueviolet',cursor:'pointer'}} onClick={()=>props.history.push('/register')}>Chưa có tài khoản? Đăng ký</div>
            <div className="social-media" style={{marginTop:'10px'}}>
              <div className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </div>
              <div className="social-icon">
                <i className="fab fa-google"></i>
              </div>
            </div>
          </form>
         
        </div>


  );
}
export default withRouter(SignIn)