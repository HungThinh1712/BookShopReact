import React,{useState} from 'react';
import Nav from '../common/UserPageNav'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../common/Footer';
import Button from '@material-ui/core/Button'
import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import AddressInputForm from '../common/AddressInputForm'
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
const UpdateAddressPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
    const id = userData ? userData.id : null;
    const fullName = useSelector(state => state.auth.userData && state.auth.userData.fullName ? state.auth.userData.fullName : null)
    const specificAddress = useSelector(state => state.auth.userData && state.auth.userData.specificAddress ? state.auth.userData.specificAddress : null)
    return (
        <div>
            <div>
            <Header/>
            <div  className = {`${classes.container}`} >
                <div className = "row">
                    <Nav imgSrc={userData.imgSrc} className={classes.nav} name={userData.fullName}  props={props}/>
                    <div className="col-xs-7 col-sm-8 " style={{borderStyle:'solid',borderColor:'#5995fd'}}>
                        <div className="profile-content">
                            <p style={{fontSize:'25px',fontWeight:500}}>Địa chỉ giao hàng</p>
                            <AddressInputForm
                             name = {fullName ? userData.fullName: fullName }
                             phone = {fullName ? userData.phone: ''}
                             provinceId = {fullName ? userData.provinceId: '0'}
                             districtId = {fullName ? userData.districtId: '0'}
                             wardId ={fullName ? userData.wardId: '0'}
                             specificAddress = {fullName ? userData.specificAddress: ''} 
                             id ={id} 
                             props={props}/>                       
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div style={{paddingTop:'200px'}}><Footer/></div>
        </div>
    );
};

export default withRouter(UpdateAddressPage);