import React from 'react';
import {useSelector} from 'react-redux'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfileUserPage'

const UserPage = () => {
    const isLogined = useSelector(state => state.auth ? state.auth.isAuthenticated : false);
    return (
        isLogined ? <ProfilePage/>: <LoginPage/>
    );
};

export default UserPage;