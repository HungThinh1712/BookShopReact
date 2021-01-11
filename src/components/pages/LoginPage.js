import React, { useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import * as authActions from './../../actions/authAction'
import { withRouter } from "react-router-dom";
import Logo from './../Images/logo_hcmute.png'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'

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

  const responseFacebook =(response)=>{

    if(response.accessToken){
      fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + response.accessToken)
      .then((response) => response.json())
  .then((json) => {
    // Some user object has been set up somewhere, build that user here
    console.log(json)
    dispatch(authActions.loginUserFacebook(json.email,json.name,cartItemData,props.history))
  })
    }
    else{
      
    }
}
const responseGoogle =(response)=>{

  dispatch(authActions.loginUserFacebook(response.profileObj.email,response.profileObj.name,cartItemData,props.history))
}
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
            <div onClick={()=>props.history.push('/forget_password')} style={{color:'blueviolet',cursor:'pointer'}}>Quên mật khẩu</div>
            <div style={{color:'blueviolet',cursor:'pointer'}} onClick={()=>props.history.push('/register')}>Chưa có tài khoản? Đăng ký</div>
            <div className="social-media" style={{marginTop:'10px'}}>
              <div style={{cursor:'pointer'}} className="social-icon">
              <FacebookLogin
              appId="910279679509473"
              callback={responseFacebook}
              render={renderProps => (
                <i className="fab fa-facebook-f"  onClick={renderProps.onClick}></i>
              )}
              icon="fa-facebook" />
              </div>
              <div style={{cursor:'pointer'}}  className="social-icon">
              <GoogleLogin
              clientId="466677084136-vkvki5nla0hgf9b0058j09fsn7uh6jvc.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              render={renderProps => (
                <i className="fab fa-google"  onClick={renderProps.onClick}></i>
                
              )}
              cookiePolicy={'single_host_origin'}
               />
              </div>
            </div>
          </form>
         
        </div>


  );
}
export default withRouter(SignIn)