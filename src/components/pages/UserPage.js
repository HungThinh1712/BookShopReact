import React from 'react';
import SideBarAdmin from '../common/SideBarAdminPage'
import Header from '../common/Header'
import { Paper } from '@material-ui/core';
const UserPage = () => {
    return (
        <div>
            <Header/>
            <div style={{display:'flex'}}>
                <SideBarAdmin />
   
            </div>
        </div>
    );
};

export default UserPage;