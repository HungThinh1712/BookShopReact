import React, {useState} from 'react';
import Logo from './../Images/logo_hcmute.png'
import SexCheckBox from './../common/SexCheckBok'
import {useDispatch} from 'react-redux'
import { toastMessage } from '../common/ToastHelper'
import * as authActions from '../../actions/authAction'
import {useTranslation} from 'react-i18next'
const RegisterPage = (props) => {
  const { t } =  useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay,setBirthDay] = useState("");
  const [sex,setSex] = useState(1);
  const handleEmailInputChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = e => {
    setPassword(e.target.value);
  };
  const handleNameInputChange = e => {
    setFullName(e.target.value);
  };

  const handlePhoneInputChange = e => {
    setPhone(e.target.value);
  };
  const handleBirthDayInputChange = e => {
    setBirthDay(e.target.value);
  };

  const handleConfirmPasswordInputChange = e => {
    setConfirmPassword(e.target.value);
  };
  const handleSexInputChange = (e) => {
    setSex(e.target.value);

  };

  const handleSubmit = async e => {
    if(confirmPassword !==password )
      toastMessage("Mật khẩu không trùng nhau")
    else if(birthDay ==="")
     toastMessage("Vui lòng chọn ngày sinh")
    else{
      const userData = { email, password,fullName,phone, birthDay,sex};
      await dispatch(authActions.registerUser(userData,props.history))
    }
    
  };
  return (
    <div className="signin-signup">
      <form className="sign-up-form">
        <img style={{ width: '70px', height: '80px' }} src={Logo} alt="" />
        <h2 className="title">Đăng ký</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input type="text" onChange={handleNameInputChange} placeholder={t('Customer_Management.25')} />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input type="text" onChange ={handleEmailInputChange} placeholder="Email" />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input type="password" onChange={handlePasswordInputChange} placeholder={t('Customer_Management.42')} />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input type="password" onChange ={handleConfirmPasswordInputChange} placeholder={t('Customer_Management.30')} />
        </div>
        <div className="input-field">
          <i className="fas fa-phone-alt"></i>
          <input type="text" onChange={handlePhoneInputChange} placeholder={t('Customer_Management.26')} />
        </div>
        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input type="date" onChange ={handleBirthDayInputChange} placeholder={t('Customer_Management.27')} />
        </div>
        <SexCheckBox value={sex} onChange={handleSexInputChange} />
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }} onClick ={handleSubmit} className="btn_register solid" >{t('Customer_Management.43')}</div>
        <div style={{ color: 'blueviolet', cursor: 'pointer' }} onClick={() => props.history.push('/user_page')}>{t('Customer_Management.44')}</div>

      </form>


    </div>


  );
};

export default RegisterPage;