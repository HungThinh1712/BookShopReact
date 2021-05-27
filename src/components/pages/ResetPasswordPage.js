import React , {useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import * as authActions from '../../actions/authAction'
import {useTranslation} from 'react-i18next'

const ResetPasswordPage = (props) => {
  const { t } =  useTranslation();
  const dispatch = useDispatch();
  const email = props.history.location.state.email;
  const [code, setCode] = useState("");
  const cartItems = useSelector(state => state.cart.items ? state.cart : []);
  const cartItemData = Object.values(cartItems.items)
  
  const handleCodeInputChange = e => {
    setCode(e.target.value);
  };

  const handleSubmit = async e => {
    const userData = { email, code };
 
    await dispatch(
        authActions.confirmCode(userData,cartItemData,props.history)
    );
  };
    return (
        <div className="confirm-code" >
        <form  className="sign-in-form">
          <h2 className="title">{t('Customer_Management.35')}</h2>
          <div className="input-field-login">
            <i className="fas fa-envelope"></i>
            <input type="text"  placeholder="Email" value={email} readOnly ></input>
          </div>
          <div className="input-field-login">
            <i className="fas fa-check"></i>
            <input type="text" onChange={handleCodeInputChange}  placeholder={t('Customer_Management.39')} />
          </div>
          <div style={{alignItems:'center',display:'flex',justifyContent:'center'}} className="btn-loginpage solid" onClick={handleSubmit} >{t('Customer_Management.36')}</div>
          <div style={{color:'blueviolet',cursor:'pointer'}}>{t('Customer_Management.37')}</div>      
        </form>    
      </div>
    );
};

export default ConfirmCodePage;