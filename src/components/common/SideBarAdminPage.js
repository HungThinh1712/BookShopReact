import React from "react";
import { withRouter } from "react-router-dom";
import {useTranslation} from "react-i18next"
import { Sidenav, Nav, Dropdown, Icon } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const styles = {
    width: 240,
    display: 'inline-table',
    marginRight: 10,
    marginTop: 78
};

const SideBarAdminPage = (props) => {
    const { t } = useTranslation();
    return (
        <div style={styles}>
            <Sidenav appearance="inverse" defaultOpenKeys={['3', '4']}>
                <Sidenav.Body>
                <Nav>
                    <Nav.Item eventKey="1" active icon={<Icon icon="home" /> } onClick={()=>props.history.push('/admin')}>
                    {t('Admin_Home_BreadCrumbs.1')}
                    </Nav.Item>
                    <Dropdown eventKey="3" title={t('Admin_Home_BreadCrumbs.2')} icon={<Icon icon="magic" />}>
                        <Dropdown.Item onClick={()=>props.history.push('/admin/books')} icon={<Icon icon="book2" />} eventKey="3-1">{t('Admin_Home_BreadCrumbs.20')}</Dropdown.Item>
                        <Dropdown.Item onClick={()=>props.history.push('/admin/customer_page')} icon={<Icon icon="group" />} eventKey="3-1">{t('Admin_Home_BreadCrumbs.21')}</Dropdown.Item>
                        <Dropdown.Item onClick={()=>props.history.push('/admin/usermanagement_page')} icon={<Icon icon="user-circle" />} eventKey="3-2">{t('Admin_Home_BreadCrumbs.22')}</Dropdown.Item>
                        <Dropdown.Item onClick={()=>props.history.push('/admin/typemanagement_page')} icon={<Icon icon="book" />} eventKey="3-3">{t('Admin_Home_BreadCrumbs.23')}</Dropdown.Item>
                        <Dropdown.Item onClick={()=>props.history.push('/admin/ordermanagement_page')} icon={<Icon icon="shopping-cart" />} eventKey="3-4">{t('Admin_Home_BreadCrumbs.26')}</Dropdown.Item>
                        <Dropdown.Item onClick={()=>props.history.push('/admin/authormanagement_page')} icon={<Icon icon="peoples" />} eventKey="3-5">{t('Admin_Home_BreadCrumbs.25')}</Dropdown.Item>
                        <Dropdown.Item onClick={()=>props.history.push('/admin/pulishinghousemanagement_page')} icon={<Icon icon="simplybuilt" />} eventKey="3-6">{t('Admin_Home_BreadCrumbs.24')}</Dropdown.Item>
                    </Dropdown>
                    <Dropdown eventKey="4" title={t('Admin_Home_BreadCrumbs.10')} icon={<Icon icon="bar-chart" />}>
                        <Dropdown.Item onClick={()=>props.history.push('/admin/report_page')} icon={<Icon icon="pie-chart" />} eventKey="4-1">{t('Admin_Home_BreadCrumbs.27')}</Dropdown.Item>
                        <Dropdown.Item onClick={()=>props.history.push('/admin/report_page')} icon={<Icon icon="line-chart" />} eventKey="4-2">{t('Admin_Home_BreadCrumbs.28')}</Dropdown.Item>
                        <Dropdown.Item onClick={()=>props.history.push('/admin/report_page')} icon={<Icon icon="area-chart" />} eventKey="4-3">{t('Admin_Home_BreadCrumbs.29')}</Dropdown.Item>
                    </Dropdown>
                    <Nav.Item eventKey="2" icon={<Icon icon="envelope" />}>
                    {t('Admin_Home_BreadCrumbs.30')}
                    </Nav.Item>
                </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
  );
};
    
export default withRouter(SideBarAdminPage);