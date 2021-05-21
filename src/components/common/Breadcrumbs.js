import React  from 'react';
import { Breadcrumbs } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const Breadcrumb = (props) => {
    return(   
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link style={{cursor:'pointer'}} color="primary" onClick={props.onClick}>
                    Trang chủ
                </Link>
                <Link style={{cursor:'pointer'}} color="inherit" onClick={props.onClick2}>
                    {props.breadcrumb}
                </Link>
            </Breadcrumbs>
        </div>
    );
}

export default Breadcrumb;