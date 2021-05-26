import React,{useState} from 'react';
import Nav from '../common/UserPageNav'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../common/Footer';
import SexCheckBox from '../common/SexCheckBok';
import { Checkbox } from 'antd';
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import * as authActions from './../../actions/authAction'
import {toastMessage} from './../common/ToastHelper'
import MessengerChat from '../common/MessengerCustomerChat';
import BreadCrumb from "../common/Breadcrumbs";
import {useTranslation} from 'react-i18next'

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
    const { t } =  useTranslation();
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
            <MessengerChat/>
            <Header/>
            <div style={{ marginTop: "100px", marginLeft: "85px", marginBottom:"-100px"}}>
              <BreadCrumb
                breadcrumb={t('Customer_Management.1')} onClick={()=>props.history.push("/")} onClick2={()=>props.history.push("/user_page")}>
              </BreadCrumb>
            </div>
            <div className = {`${classes.container}`} >
                <div className = "row">
                    <Nav imgSrc={userData ? userData.imgSrc : ''} className={classes.nav} name={name} props={props}/>
                    <div className="col-xs-7 col-sm-8 " style={{borderStyle:'solid',borderColor:'#5995fd'}}>
                        <div className="profile-content">
                            <p style={{fontSize:'25px',fontWeight:500}}>{t('Customer_Management.1')}</p>
                            <div className="input-field-userpage">
                                <i className="fas fa-user"></i>
                                <input value={name} onChange={handleNameInputChange} type="text" placeholder={t('Customer_Management.25')} />
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
                                <input value={phone} onChange={handlePhoneInputChange} type="text" placeholder={t('Customer_Management.26')} />
                            </div>
                            <div  className="input-field-userpage">
                                <i className="fas fa-calendar-alt"></i>
                                <input value={birthday} onChange={handleBirthdayInputChange} type="date" placeholder={t('Customer_Management.27')} />
                            </div>
                            <div  className="sex">
                                <Checkbox checked={checked} onChange={onChangeChecked}><span style={{paddingLeft:'8px'}}>{t('Customer_Management.6')}</span></Checkbox>
                            </div>
                            {checked ? <div>
                                <div className="input-field-userpage">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" onChange={handleOldPassWordInputChange} placeholder={t('Customer_Management.28')} />
                                </div>
                                <div className="input-field-userpage">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" onChange={handleNewPassWordInputChange} placeholder={t('Customer_Management.29')} />
                                </div>
                                <div className="input-field-userpage">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" onChange={handleConfirmPassWordInputChange} placeholder={t('Customer_Management.30')} />
                                </div>
                            </div> : null
                            }
                            <div className="sex">
                                <Button onClick={handleButtonClick} variant="contained" color="primary" size='small'>{t('Customer_Management.7')}</Button>
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