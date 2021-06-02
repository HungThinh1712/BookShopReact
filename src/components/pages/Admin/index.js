import React from 'react';
import SideBarAdminPage from '../../common/SideBarAdminPage'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import HomeAdmin from '../../common/HomeAdmin'
import {withRouter} from 'react-router-dom'

const index = (props) => {
    return (
        <div>
            <div id="wrapper">
                <Header notShow="notShow"/>
                <SideBarAdminPage/>
                <div id="content-wrapper"  style={{with:'100%',marginTop:'93px', marginRight:'20px', marginLeft:'250px'}}>
                    <HomeAdmin></HomeAdmin>
                </div>
            </div>
            
        </div>
    );
};

export default withRouter(index);