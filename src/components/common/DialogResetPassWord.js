import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, } from 'react-redux';
import * as authAction from './../../actions/authAction'
import { toastMessage } from './ToastHelper';
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next"

const FormDialog =(props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassWord] = useState('')
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassWord(e.target.value);
    }

    const handleSubmit = () =>{
        const email = props.email;
        const userData = {email ,password}
        if(password==='' || confirmPassword===''){
            toastMessage("Vui lòng nhập đầy đủ thông tin")
        }
        else if(password!=confirmPassword){
            toastMessage("Mật khẩu không trùng nhau");
        }else{
            dispatch(authAction.changePassword(userData,props.history,props.onClose));
            props.history.push('/user_page');
            toastMessage("Cập nhật thành công");
           
        }
    }

    return (
        <Dialog  open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('Customer_Management.6')}</DialogTitle>
        <DialogContent>
            <div className="input-field-login">
            <i className="fas fa-lock"></i>
            <input value={password} onChange={handlePasswordChange}  type="password"  placeholder={t('Customer_Management.29')} />
            </div>
            <div className="input-field-login">
            <i className="fas fa-lock"></i>
            <input value={confirmPassword} onChange={handleConfirmPasswordChange} type="password"  placeholder={t('Customer_Management.30')} />
            </div>

        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose} color="primary">
            {t('Admin_Other.29')}
            </Button>
            <Button onClick={handleSubmit}  color="primary">
            {t('Admin_Other.30')}
            </Button>
        </DialogActions>
    </Dialog> 
    );
}
export default withRouter(FormDialog)

