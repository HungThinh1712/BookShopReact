import React,{useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import {useTranslation} from "react-i18next"

const ItemBookInAdmin = (props) => {
    const { t } = useTranslation();
    return (
        <div onClick={props.onClick}  className="col-md-3 col-sm-6" style={{marginTop:'20px'}}>
            <div className="product-grid6">
                <div className="product-image6">
                    <div >
                        <img className="pic-1" src={props.imageSrc} style={{marginTop:'20px'}} />
                    </div>
                </div>
                <div className="product-content">
                    <h3 className="title" ><div>{props.title}</div></h3>
                    <div className="price">{props.price}</div>
                </div>
                <ul className="social">
                    <li ><a data-tip={t('Admin_Book.5')}><i className="fa fa-search"></i></a></li>
                </ul>
            </div>
        </div>
    );
};

export default withRouter(ItemBookInAdmin);