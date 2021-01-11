import React, {useState} from 'react';
import {Route, Redirect} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';

const ProtectedRoute = ({component:Component,...rest}) => {
 

    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
    const userData = useSelector(state=>state.auth.userData)

    return (
        <Route {...rest} render={
            props=>{
                if(isAuthenticated && userData.isAdmin===true){
                    return <Component {...props}/>
                }else{
                    return <Redirect to='/abcxyz'/>
                }
            }
        }>

        </Route>
    );
};

export default ProtectedRoute;