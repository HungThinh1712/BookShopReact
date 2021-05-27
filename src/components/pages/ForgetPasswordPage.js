import React, { useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import * as authActions from './../../actions/authAction'
import { withRouter } from "react-router-dom";
import Logo from './../Images/logo_hcmute.png'
import Dialog from './../common/DialogResetPassWord'
import {useTranslation} from "react-i18next"

const  ForgetPasswordPage= (props) => {
  const { t } = useTranslation();
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
            <h2 className="title">{t('Customer_Management.41')}</h2>
            <div className="input-field-login">
              <i className="fas fa-envelope"></i>
              <input type="text" onChange={handleEmailInputChange} placeholder={t('Customer_Management.38')} />
            </div>
            {
              flag===true? <div className="input-field-login">
              <i className="fas fa-check"></i>
              <input type="text" onChange={handleCodeInputChange}  placeholder={t('Customer_Management.39')} />
            </div>:null
            }
            {flag===false ? <div style={{alignItems:'center',display:'flex',justifyContent:'center'}} className="btn-loginpage solid" onClick={handleSubmitSend} >{t('Customer_Management.39')}</div>:
            <div style={{alignItems:'center',display:'flex',justifyContent:'center'}} className="btn-loginpage solid" onClick={handleSubmitConfirm} >{t('Customer_Management.36')}</div>}
            <div style={{color:'blueviolet',cursor:'pointer'}} onClick={()=>props.history.push('/user_page')}>{t('Customer_Management.40')}</div>          
          </form>
         
        </div>

  );
}
export default withRouter(ForgetPasswordPage)