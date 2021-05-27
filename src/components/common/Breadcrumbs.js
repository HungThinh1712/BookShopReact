import React  from 'react';
import { Breadcrumbs } from '@material-ui/core';
import { Link } from '@material-ui/core';
import {useTranslation} from "react-i18next"

const Breadcrumb = (props) => {
    const { t } = useTranslation();
    return(   
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link style={{cursor:'pointer'}} color="primary" onClick={props.onClick}>
                    {t('Admin_Home_BreadCrumbs.1')}
                </Link>
                <Link style={{cursor:'pointer'}} color="inherit" onClick={props.onClick2}>
                    {props.breadcrumb}
                </Link>
            </Breadcrumbs>
        </div>
    );
}

export default Breadcrumb;