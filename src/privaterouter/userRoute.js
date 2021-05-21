import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import { useSelector, } from 'react-redux';
import { toastMessage } from "./../components/common/ToastHelper";
const ProtectedRoute = ({component:Component,...rest}) => {
 
    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)

    return (
        <Route {...rest} render={
            props=>{
                if(isAuthenticated ){
                    return <Component {...props}/>
                }else{
                    toastMessage("Bạn chưa đăng nhập. Đăng nhập để tiếp tục!");
                    return <Redirect to='/user_page'/>
                }
            }
        }>

        </Route>
    );
};

export default ProtectedRoute;