import React from 'react';
import SideBarAdminPage from '../../common/SideBarAdminPage'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import HomeAdmin from '../../common/HomeAdmin'
import {withRouter} from 'react-router-dom'

const index = (props) => {
    return (
        <div style={{backgroundColor:"#EDECE7"}}>
            <div style={{backgroundColor:"#EDECE7"}} id="wrapper">
                <Header notShow="notShow"/>
                <SideBarAdminPage/>
                <div id="content-wrapper"  style={{width:'100%',paddingBottom:'90px',height:"100%" ,marginTop:'93px', marginRight:'20px', marginLeft:'250px'}}>
                    <HomeAdmin></HomeAdmin>
                </div>
            </div>
            
        </div>
    );
};

export default withRouter(index);