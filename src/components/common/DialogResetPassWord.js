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

const FormDialog =(props) => {

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
        console.log("aaa");
        if(password==='' || confirmPassword===''){
            toastMessage("Vui lòng đầy đủ thông tin")
        }
        else if(password!=confirmPassword){
            toastMessage("Mật khẩu không giống nhau");
        }else{
            dispatch(authAction.changePassword(userData,props.history,props.onClose));
            props.history.push('/user_page');
            toastMessage("Cập nhật thành công");
           
        }

    }

   
    return (
        <div>
             <Dialog style={{background:'blue'}} open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Thay đổi mật khẩu</DialogTitle>
                <DialogContent>
                    <div className="input-field-login">
                    <i className="fas fa-lock"></i>
                    <input value={password} onChange={handlePasswordChange}  type="password"  placeholder="Mật khẩu mới" />
                    </div>
                    <div className="input-field-login">
                    <i className="fas fa-lock"></i>
                    <input value={confirmPassword} onChange={handleConfirmPasswordChange} type="password"  placeholder="Xác nhận lại mật khẩu" />
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit}  color="primary">
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog> 
        </div>
    );
}
export default withRouter(FormDialog)

