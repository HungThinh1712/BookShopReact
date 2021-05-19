import React  from 'react';
import { Breadcrumbs } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const Breadcrumb = (props) => {
    return(   
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="primary" href={props.link_root} onClick={props.onClick}>
                    Trang chủ
                </Link>
                <Link color="inherit" href={props.link}>
                    {props.breadcrumb}
                </Link>
            </Breadcrumbs>
        </div>
    );
}

export default Breadcrumb;