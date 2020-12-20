import React,{useState} from 'react';
import Nav from '../common/UserPageNav'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../common/Footer';
import SexCheckBox from '../common/SexCheckBok';
import { Checkbox } from 'antd';
import Button from '@material-ui/core/Button'
import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as authActions from './../../actions/authAction'
import {toastMessage} from './../common/ToastHelper'
const useStyles = makeStyles((theme) => ({

    
    container: {
        [theme.breakpoints.up('sm')]: {
          marginLeft:'0px',
          marginTop:'80px'
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft:'87px',
            marginTop:'120px'
          },
        [theme.breakpoints.down('xs')]: {
          marginLeft:'0px',
          marginTop:'80px'
        },
      },
     
     
     
}));
const ProfileUserPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [checked,setChecked] = useState(false);
    const onChangeChecked = (e)=>{
        setChecked(e.target.checked);
    }
    const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
    const id = userData ? userData.id : null;
    const [name,setName] =useState(userData && userData.fullName ?userData.fullName:'');
    const [phone,setPhone] = useState(userData && userData.phone ?userData.phone:'')
    const [birthday, setBirthday] = useState(userData && userData.birthDay ?userData.birthDay:'');
    const [email, setEmail] = useState(userData && userData.email ? userData.email:'');
    const [sex, setSex] = useState(userData && userData.sex ?userData.sex:1);
    const [oldPassword, setOldPassWord] = useState("");
    const [newPassword, setNewPassWord] = useState("");
    const [confirmPassword, setConfirmPassWord] = useState("");
  
   
  const handleButtonClick = async ()=>{
    if(checked===false){
        const userData = {id, name,phone,birthday,sex};
        await dispatch(authActions.updateProfileUser(userData))
        toastMessage("Cập nhật thành công")
    }else{
        if(oldPassword ==="" || newPassword==="" || confirmPassword==="")
            toastMessage("Thông tin không được để trống")
        else if(newPassword !==confirmPassword)
            toastMessage("Mật khẩu không trùng nhau")
        else{
            const userData = {id, name,phone,birthday,sex,oldPassword,newPassword};
            await dispatch(authActions.updateProfileUserWithPassWord(userData))
            
            setChecked(false);
        }
    }
  }
  const handleBirthdayInputChange = e => {
    setBirthday(e.target.value);
  };
  const handleNameInputChange = e => {
    setName(e.target.value);
  };
  const handlePhoneInputChange = e => {
    setPhone(e.target.value);
  };
  const handleSexInputChange = (e) => {
    setSex(e.target.value);

  };
  const handleOldPassWordInputChange = (e) => {
    setOldPassWord(e.target.value);

  };
  const handleNewPassWordInputChange = (e) => {
    setNewPassWord(e.target.value);

  };
  const handleConfirmPassWordInputChange = (e) => {
    setConfirmPassWord(e.target.value);

  };

 
    return (
        <div>
            <div>
            <Header/>
            <div  className = {`${classes.container}`} >
                <div className = "row">
                    <Nav className={classes.nav} name={name} props={props}/>
                    <div className="col-xs-7 col-sm-8 " style={{borderStyle:'solid',borderColor:'#5995fd'}}>
                        <div className="profile-content">
                            <p style={{fontSize:'25px',fontWeight:500}}>Thông tin tài khoản</p>
                            <div className="input-field-userpage">
                                <i className="fas fa-user"></i>
                                <input value={name} onChange={handleNameInputChange} type="text" placeholder="Họ và tên" />
                            </div>
                            <div className="sex">
                               <SexCheckBox value={sex} onChange={handleSexInputChange}/>
                            </div>
                            <div  className="input-field-userpage">
                                <i className="fas fa-envelope"></i>
                                <input value={email} disabled type="email" placeholder="Email" />
                            </div>
                         
                            <div  className="input-field-userpage">
                                <i className="fas fa-phone"></i>
                                <input value={phone} onChange={handlePhoneInputChange} type="text" placeholder="Số điện thoại" />
                            </div>
                            <div  className="input-field-userpage">
                                <i className="fas fa-calendar-alt"></i>
                                <input value={birthday} onChange={handleBirthdayInputChange} type="date" placeholder="Ngày sinh" />
                            </div>
                            <div  className="sex">
                                <Checkbox checked={checked} onChange={onChangeChecked}><span style={{paddingLeft:'8px'}}>Thay đổi mật khẩu</span></Checkbox>
                            </div>
                            {checked ? <div>
                                <div className="input-field-userpage">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" onChange={handleOldPassWordInputChange} placeholder="Mật khẩu cũ" />
                                </div>
                                <div className="input-field-userpage">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" onChange={handleNewPassWordInputChange} placeholder="Mật khẩu mới" />
                                </div>
                                <div className="input-field-userpage">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" onChange={handleConfirmPassWordInputChange} placeholder="Xác nhận lại mật khẩu" />
                                </div>
                            </div> : null
                            }
                            <div  className="sex">
                                <Button onClick={handleButtonClick} variant="contained" color="primary" size='small'>Cập nhật</Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div style={{paddingTop:'200px'}}><Footer/></div>
        </div>
    );
};

export default withRouter(ProfileUserPage);