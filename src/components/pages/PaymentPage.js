import React from 'react';
import HeaderInPayment from '../common/HeaderInPayment'
import PaymentMethod from '../common/PaymentMethod'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router-dom'
import BreadCrumb from "../common/Breadcrumbs";
import {useTranslation} from 'react-i18next'

const useStyles = makeStyles((theme) => ({
    address_zone: {
      display:'inline-block',
      [theme.breakpoints.up('lg')]: {
        marginLeft: '40px'
      },
      [theme.breakpoints.up('md')]: {
         marginLeft: '40px'
      },
      [theme.breakpoints.down('sm')]: {
        display:'none'
     },  
    
    },
    wraper: {
        display:'inline-block',
        [theme.breakpoints.up('sm')]: {
            marginRight: '0px',
            display: 'flex',marginLeft:'20px',marginTop:'20px'
          },
          [theme.breakpoints.up('lg')]: {
            display: 'flex',marginLeft:'250px',marginTop:'20px'
          },
      
          [theme.breakpoints.down('xs')]: {
            marginRight: '0px',
            display: 'flex',marginLeft:'0px',marginTop:'20px'
          },
       
       
      
      },
      title: {
        display:'inline-block',
        [theme.breakpoints.up('sm')]: {
            marginRight: '0px',
            marginLeft: '20px',
            fontWeight: '700',marginTop:'20px' ,
            fontSize:'30px',color:'red'
          },
          [theme.breakpoints.up('lg')]: {
            fontWeight: '700',marginLeft:'250px',marginTop:'20px' , fontSize:'30px',color:'red'
          },
      
          [theme.breakpoints.down('xs')]: {
            marginRight: '0px',
            marginLeft: '0px',
            fontWeight: '700',marginTop:'20px' , fontSize:'30px',color:'red'
          },
       
      
      }
  }));

const PaymentPage = (props) => {
    const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
    const classes = useStyles();
    const { t } =  useTranslation();
    return (
        <div>
            <HeaderInPayment step={2} />
            <div className={classes.title}  >3. Thanh toán và đặt hàng</div>
            <div className={classes.wraper}>
                <PaymentMethod />
                <div className={classes.address_zone}>
                    <div style={{ display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderWidth: '2px',borderColor:'blueviolet',borderRadius:'5px' }}>
                        <div  style={{ display: 'flex',justifyContent:'space-between'}} >
                            <div style={{ fontWeight: '700',fontSize:'17px', padding: '10px' }}>Địa chỉ giao hàng</div>
                            <div style={{padding:'10px',marginLeft:'120px'}}>
                                <Button onClick={() => props.history.push("/address_shipping")} variant="contained" size="small">Sửa</Button>
                            </div>
                        </div>
                        <div style={{backgroundColor:'blueviolet',height:'1px'}}></div>
                        <div style={{padding:'0 10px 10px 10px'}}>
                            <div style={{ fontWeight: '900',color:'red',fontFamily: 'Roboto'}}>{userData.fullName}</div>
                            <div style={{ fontSize: '13px', fontWeight: '500' }} >Địa chỉ: {userData.specificAddress}, {userData.wardName}, {userData.districtName}, {userData.provinceName}</div>
                            <div style={{display:'flex'}}>
                              <div style={{ fontSize: '13px', fontWeight: '500',paddingRight:'5px' }}>Điện thoại: </div>
                              <div style={{ fontSize: '13px', fontWeight: '500',color:'red' }}>{userData.phone}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
};

export default withRouter(PaymentPage);