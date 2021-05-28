import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import { useSelector, } from 'react-redux';
import { toastMessage } from "./../components/common/ToastHelper";
import { useTranslation } from "react-i18next"

const ProtectedRoute = ({component:Component,...rest}) => {
    const { t } = useTranslation();
    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)

    return (
        <Route {...rest} render={
            props=>{
                if(isAuthenticated ){
                    return <Component {...props}/>
                }else{
                    toastMessage("t('Toast_Message.15')");
                    return <Redirect to='/user_page'/>
                }
            }
        }>

        </Route>
    );
};

export default ProtectedRoute;