import React,{useState} from 'react';
import Nav from '../common/UserPageNav'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../common/Footer';
import SexCheckBok from '../common/SexCheckBok'
import SexCheckBox from '../common/SexCheckBok';
import { Checkbox } from 'antd';
import Button from '@material-ui/core/Button'
import {useSelector} from 'react-redux';
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
const ProfileUserPage = () => {
    const classes = useStyles();
    const [checked,setChecked] = useState(false);
    const onChangeChecked = (e)=>{
        setChecked(e.target.checked);
        console.log(checked);
    }
    const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
    const [name,setName] =useState(userData && userData.fullName ?userData.fullName:'');
    const [phone,setPhone] = useState(userData && userData.phone ?userData.phone:'')
    const [city, setCity] = useState(userData && userData.city ?userData.city:'');
    const [district, setDistrict] = useState(userData && userData.district ?userData.district:'');
    const [ward, setWard] = useState(userData && userData.ward ?userData.ward:'');
    const [address, setAddress] = useState(userData && userData.specificAddress ?userData.specificAddress:'');
    const [birthday, setBirthday] = useState(userData && userData.birthDay ?userData.birthDay:'');
    const [email, setEmail] = useState(userData && userData.email ? userData.email:'');
    const [sex, setSex] = useState(userData && userData.sex ?userData.sex:'');
  const handleCityInputChange = e => {
    setCity(e.target.value);
  };

  const handleDistrictInputChange = e => {
    setDistrict(e.target.value);
  };
  const handleWardInputChange = e => {
    setWard(e.target.value);
  };

  const handleAddressInputChange = e => {
    setAddress(e.target.value);
  };
  const handleNameInputChange = e => {
    setName(e.target.value);
  };
  const handlePhoneInputChange = e => {
    setPhone(e.target.value);
  };

    return (
        <div>
            <div>
            <Header/>
            <div  className = {`${classes.container}`} >
                <div className = "row">
                    <Nav className={classes.nav} name={name}/>
                    <div className="col-xs-7 col-sm-8 " style={{borderStyle:'solid',borderColor:'#5995fd'}}>
                        <div className="profile-content">
                            <p style={{fontSize:'25px',fontWeight:500}}>Thông tin tài khoản</p>
                            <div className="input-field-userpage">
                                <i className="fas fa-user"></i>
                                <input value={name} type="text" placeholder="Họ và tên" />
                            </div>
                            <div className="sex">
                               <SexCheckBox value={sex}/>
                            </div>
                            <div  className="input-field-userpage">
                                <i className="fas fa-envelope"></i>
                                <input value={email} type="email" placeholder="Email" />
                            </div>
                         
                            <div  className="input-field-userpage">
                                <i className="fas fa-phone"></i>
                                <input value={phone} type="text" placeholder="Số điện thoại" />
                            </div>
                            <div  className="input-field-userpage">
                                <i className="fas fa-calendar-alt"></i>
                                <input value={birthday} type="date" placeholder="Ngày sinh" />
                            </div>
                            <div  className="sex">
                                <Checkbox checked={checked} onChange={onChangeChecked}><span style={{paddingLeft:'8px'}}>Thay đổi mật khẩu</span></Checkbox>
                            </div>
                            {checked ? <div>
                                <div className="input-field-userpage">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" placeholder="Mật khẩu cũ" />
                                </div>
                                <div className="input-field-userpage">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" placeholder="Mật khẩu mới" />
                                </div>
                                <div className="input-field-userpage">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" placeholder="Xác nhận lại mật khẩu" />
                                </div>
                            </div> : null
                            }
                            <div  className="sex">
                                <Button variant="contained" color="primary" size='small'>Cập nhật</Button>
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

export default ProfileUserPage;