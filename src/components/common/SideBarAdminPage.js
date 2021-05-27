import React from "react";
import { withRouter } from "react-router-dom";
import {useTranslation} from "react-i18next"
const SideBarAdminPage = (props) => {
    const { t } = useTranslation();
    return (
        <div style={{marginTop:'85px'}}>
            <div className="profile-sidebar" style={{width: '270px'}}>
                <div className="profile-usermenu">
                    <div className="nav flex-column nav-pills" aria-orientation="vertical" >
                        <div onClick={()=>props.history.push('/admin')} className="nav-link" ><i className="fas fa-user"></i> {t('Admin_Home_BreadCrumbs.1')}</div>
                        <div onClick={()=>props.history.push('/admin/books')} className="nav-link" ><i className="fas fa-book" ></i> {t('Admin_Home_BreadCrumbs.4')}</div>
                        <div onClick={()=>props.history.push('/admin/ordermanagement_page')} className="nav-link" ><i className="fas fa-shopping-cart"></i> {t('Admin_Home_BreadCrumbs.19')}</div>
                        <div onClick={()=>props.history.push('/admin/customer_page')} className="nav-link" ><i className="fas fa-users"></i> {t('Admin_Home_BreadCrumbs.3')}</div>
                        <div onClick={()=>props.history.push('/admin/usermanagement_page')} className="nav-link" ><i className="fas fa-user-circle"></i> {t('Admin_Home_BreadCrumbs.5')}</div>
                        <div onClick={()=>props.history.push('/admin/authormanagement_page')} className="nav-link" ><i className="fas fa-users"></i> {t('Admin_Home_BreadCrumbs.9')}</div>
                        <div onClick={()=>props.history.push('/admin/typemanagement_page')} className="nav-link" ><i className="fas fa-book-open"></i> {t('Admin_Home_BreadCrumbs.6')}</div>
                        <div onClick={()=>props.history.push('/admin/pulishinghousemanagement_page')} className="nav-link" ><i className="fas fa-laptop-house"></i> {t('Admin_Home_BreadCrumbs.7')}</div>    
                        <div onClick={()=>props.history.push('/admin/report_page')} className="nav-link" ><i className="fas fa-signal"></i> {t('Admin_Home_BreadCrumbs.10')}</div>
                    </div>
                </div>
            </div>
      </div>
  );
};

export default withRouter(SideBarAdminPage);
