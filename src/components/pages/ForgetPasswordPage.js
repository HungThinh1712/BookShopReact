import React, { useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import * as authActions from './../../actions/authAction'
import { withRouter } from "react-router-dom";
import Logo from './../Images/logo_hcmute.png'
import Dialog from './../common/DialogResetPassWord'

const  ForgetPasswordPage= (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
    const handleClickOpen = (value) => {
		  setOpen(true);
	  };

    const handleClose = () => {
      setOpen(false);
	};
  const [flag,setFlag] = useState(false);
  const [email, setEmailState] = useState("");
  const [code, setCode] = useState("");
  const handleEmailInputChange = e => {
    setEmailState(e.target.value);
  };

 const changeFlag = (value) =>{
   setFlag(value)
 }
  const handleSubmitSend = async e => {
    dispatch(authActions.sendCodeResetPassWord(email,changeFlag))

    
  };
  const handleSubmitConfirm = async e => {
    const userData = { email, code };
 
    await dispatch(
        authActions.confirmCodeReset(userData,props.history,handleClickOpen)
    );
  };
  const handleCodeInputChange = e => {
    setCode(e.target.value);
  };
  return (
      <div style={{marginTop:"120px"}} className="ForgetPasswordPage-signup">
        <Dialog email={email} open={open}  onClose={handleClose}  ></Dialog>
          <form  className="sign-in-form">
            <img  style={{width:'70px',height:'80px'}} src={Logo} alt=""/>
            <h2 className="title">Quên mật khẩu?</h2>
            <div className="input-field-login">
              <i className="fas fa-envelope"></i>
              <input type="text" onChange={handleEmailInputChange} placeholder="Nhập email đăng ký tài khoản" />
            </div>
            {
              flag===true? <div className="input-field-login">
              <i className="fas fa-check"></i>
              <input type="text" onChange={handleCodeInputChange}  placeholder="Mã xác nhận" />
            </div>:null
            }
            {flag===false ? <div style={{alignItems:'center',display:'flex',justifyContent:'center'}} className="btn-loginpage solid" onClick={handleSubmitSend} >Gửi</div>:
            <div style={{alignItems:'center',display:'flex',justifyContent:'center'}} className="btn-loginpage solid" onClick={handleSubmitConfirm} >Xác nhận</div>}
            <div style={{color:'blueviolet',cursor:'pointer'}} onClick={()=>props.history.push('/user_page')}>Quay lại đăng nhập</div>          
          </form>
         
        </div>

  );
}
export default withRouter(ForgetPasswordPage)