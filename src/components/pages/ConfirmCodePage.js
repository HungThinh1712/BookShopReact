import React , {useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import * as authActions from '../../actions/authAction'

const ConfirmCodePage = (props) => {
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
  const handleResent =()=>{
    dispatch(authActions.sendCodeActive(email))
  }
    return (
        <div className="confirm-code" >
        <form  className="sign-in-form">
          <h2 className="title">Xác nhận Email</h2>
          <div className="input-field-login">
            <i className="fas fa-envelope"></i>
            <input type="text"  placeholder="Email" value={email} readOnly ></input>
          </div>
          <div className="input-field-login">
            <i className="fas fa-check"></i>
            <input type="text" onChange={handleCodeInputChange}  placeholder="Mã xác nhận" />
          </div>
          <div style={{alignItems:'center',display:'flex',justifyContent:'center'}} className="btn-loginpage solid" onClick={handleSubmit} >Xác nhận</div>
          <div onClick={handleResent} style={{color:'blueviolet',cursor:'pointer'}}>Gửi lại mã xác nhận</div>      
        </form>    
      </div>
    );
};

export default ConfirmCodePage;