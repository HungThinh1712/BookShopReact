import axios from 'axios';
import setAuthToken from '../authentication/setAuthToken'
import jwt_decode from 'jwt-decode';
import * as Types from '../constants/ActionType'
import * as cartActions from './../actions/cartAction'
import * as CallApis from './../constants/Apis'
import * as backdropAction from './../actions/backdropAction'
import {toastMessage} from './../components/common/ToastHelper'
import { useTranslation } from "react-i18next"

// 🔓  Login - Get user token
export const loginUser = (userData, history,shoppingCartData) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Auth`)
    await axios.post(url, userData)
        .then(res =>  {  
            if (res.status===200 ) {
                //Save to localStorage
               
                const token = res.data;
             
                // Set token t  o localStorage
                localStorage.setItem('jwtToken', token);
                // Set token to Auth header. Apply Authorization token to header to every request
                setAuthToken(token);
                // the token includes user info but it is encoded
                // to decode we use jwt-decode
                //Decode token to get user data
                const decoded = jwt_decode(localStorage.getItem('jwtToken')!=null ? localStorage.getItem('jwtToken') : token );
                // Set current user
                dispatch(setCurrentUser(decoded));
                if(decoded.admin==="False"){
                    dispatch(cartActions.addToCartofCurrentUser(shoppingCartData))
                  
                    history.push('/')
                }
                else{
                    history.push('/admin')
                }
            } else {
                let error;
               
                if(res.data ==="Email chưa được xác nhận"){
                  
                    history.push( '/confirm_code_page',{email:userData.email})
                    error = "Tài khoản của bạn cần xác thực "
                }
                else if(res.data==="Email hoặc mật khẩu không đúng!")
                    error = res.data;
                else
                    error = Object.values(res.data.errors)[0].toString();
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: error //sets payload to errors coming from server
                });
            }
        })
        .catch(err => {
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err //sets payload to errors coming from server
                })
            }
        );
};



// 🔒 get user info
export const setCurrentUserInfo = (userId) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Users/Get?id=${userId}`)
    axios.get(url)
        .then(res => {
            if (res.status===200) {
                localStorage.setItem('userData', JSON.stringify(res.data));
               
                dispatch( {
                    type: Types.SET_CURRENT_USER_INFO,
                    payload: res.data
                })
            } else {
                console.log(res);
            }

        })
        .catch(err => {
            console.log(err);
        })


};



// 🔒 Set logged  in user
export const setCurrentUser = (decoded) =>  (dispatch) => {
    dispatch({
        type: Types.SET_CURRENT_USER,
        payload: decoded
    });
    dispatch(setCurrentUserInfo(decoded.sub))
   
};

export const updateAddressOfCurrentUser = (updatedUser,history,clickEvent,tag) => async (dispatch) => {
    const { t } = useTranslation();
    const url = CallApis.API_URL.concat(`/Users/UpdateAddress`)
    await axios({
        
        method: 'put',
        url: url,
        data: {
            updatedUser
        }
      }).then(res => {
        if (res.status===200) {
         
            if(tag==="1"){
                history.push('/address_shipping')
                clickEvent.onClick();
            }
                
            toastMessage(t('Toast_Message.1'))
            localStorage.setItem('userData', JSON.stringify(res.data));
            dispatch( {
                type: Types.UPDATE_USER_ADDRESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                payload: res.data //sets payload to errors coming from server
            });
        }

    })
    .catch(err => {
        console.log(err);
    })
        
};
export const logOut = () =>(dispatch)  => {

    localStorage.clear();
            dispatch( {
                type: Types.LOG_OUT,
                payload: []
            })
    
};

export const confirmCode = (userData,shoppingCartData,history) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Auth`)
    await axios.put(url, userData).then(res =>  {  
        if (res.status===200 ) {
            const token = res.data;
             
            // Set token t  o localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header. Apply Authorization token to header to every request
            setAuthToken(token);
            // the token includes user info but it is encoded
            // to decode we use jwt-decode
            //Decode token to get user data
            const decoded = jwt_decode(localStorage.getItem('jwtToken')!=null ? localStorage.getItem('jwtToken') : token );
            // Set current user
           
            if(decoded.admin==="False"){
                dispatch(cartActions.addToCartofCurrentUser(shoppingCartData))
                dispatch(setCurrentUser(decoded));
                history.push('/')
            }
            else{
                dispatch(setCurrentUser(decoded));
                history.push('/admin')
            }
        } 
        else{
            dispatch({
                type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                payload: res.data //sets payload to errors coming from server
            });
        }
    })
    .catch(err => {
           
        }
    );
        
};

export const registerUser = (userData, history) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Users/Create`)
    dispatch(backdropAction.setOpenBackDrop)
    await axios.post(url, userData)
        .then(res =>  {  
            if (res.status===200 ) {
                dispatch(backdropAction.setCloseBackDrop)
                history.push('/confirm_code_page',{email:userData.email})
            }else {
                let error;    
                dispatch(backdropAction.setCloseBackDrop)            
                error = Object.values(res.data.errors)[0].toString();
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: error //sets payload to errors coming from server
                });
            }
        })
        .catch(err => {
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err //sets payload to errors coming from server
                })
            }
        );
};

export const updateProfileUser = (updatedUser) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Users/UpdateProfileUser`)
    await axios({
        
        method: 'put',
        url: url,
        data: {
            updatedUser
        }
      }).then(res => {
        if (res.status===200) {
            console.log(res.data);
            localStorage.setItem('userData', JSON.stringify(res.data));
            dispatch( {
                type: Types.UPDATE_PROFILE_USER,
                payload: res.data
            })
        } else {
            dispatch({
                type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                payload: res.data //sets payload to errors coming from server
            });
        }

    })
    .catch(err => {
        console.log(err);
    })
        
};

export const updateProfileUserWithPassWord = (updatedUser) => async (dispatch) => {
    const { t } = useTranslation();
    const url = CallApis.API_URL.concat(`/Users/UpdateProfileUserWithPassWord`)
    await axios({
        
        method: 'put',
        url: url,
        data: {
            updatedUser
        }
      }).then(res => {
        if (res.status===200) {
            localStorage.setItem('userData', JSON.stringify(res.data));
            toastMessage(t('Toast_Message.1'))
            
            dispatch( {
                type: Types.UPDATE_PROFILE_USER_PASSWORD,
                payload: res.data
            })
        } else {
            dispatch({
                type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                payload: res.data //sets payload to errors coming from server
            })
        }

    })
    .catch(err => {
        console.log(err);
    })
        
};

export const sendCodeResetPassWord = (email,changeFlag) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Users/SendCodeResetPassWord?email=${email}`)
    dispatch(backdropAction.setOpenBackDrop)
    await axios.get(url)
        .then(res =>  {  
            if (res.status===200 ) {
                dispatch(backdropAction.setCloseBackDrop)
                toastMessage(res.data)
                changeFlag(true);
            }else {
                changeFlag(false);
                dispatch(backdropAction.setCloseBackDrop)            
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: res.data //sets payload to errors coming from server
                });
            }
        })
        .catch(err => {
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err //sets payload to errors coming from server
                })
            }
        );
};

export const confirmCodeReset = (userData,history,handleClickOpen) => async (dispatch) => {
    const { t } = useTranslation();
    const url = CallApis.API_URL.concat(`/Users/ConfirmCodeResetPassWord`)
    await axios.put(url, userData).then(res =>  {  
        if (res.status===200 ) {
            handleClickOpen();
                   
        } 
        else{
            toastMessage(t('Toast_Message.2'));   
        }
    })
    .catch(err => {
           
        }
    );
        
};


export const updateAvatarUser = (userData) => async (dispatch) => {
    const { t } = useTranslation();
    const url = CallApis.API_URL.concat(`/Users/UpdateAvatarUser`)
    await axios.put(url, userData)
        .then(res =>  {  
            if (res.status===200 ) {
               
                localStorage.setItem('userData', JSON.stringify(res.data));
                toastMessage(t('Toast_Message.1'))
                dispatch( {
                    type: Types.UPDATE_AVATAR_USER,
                    payload: res.data
            })     
            
            }else {
                console.log(res)
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: "Vui lòng kiểm tra lại thông tin" //sets payload to errors coming from server
                })
            }
        })
        .catch(err => {
            console.log(err)
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: "Vui lòng kiểm tra lại thông tin" //sets payload to errors coming from server
                })
            }
        );
};

export const changePassword = (userData,onClose) => async (dispatch) => {
    const { t } = useTranslation();
    const url = CallApis.API_URL.concat(`/Users/ChangePassword`)
    await axios.put(url, userData).then(res =>  {  
        if (res.status===200 ) {
            onClose();
           
                   
        } 
        else{
            toastMessage(t('Toast_Message.2'));   
        }
    })
    .catch(err => {
           
        }
    );
        
};


export const sendCodeActive = (email) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Users/ResendConfirmCode?email=${email}`)
    dispatch(backdropAction.setOpenBackDrop)
    await axios.get(url)
        .then(res =>  {  
            if (res.status===200 ) {
                dispatch(backdropAction.setCloseBackDrop)
                toastMessage(res.data)

            }else {
                dispatch(backdropAction.setCloseBackDrop)            
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: res.data //sets payload to errors coming from server
                });
            }
        })
        .catch(err => {
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err //sets payload to errors coming from server
                })
            }
        );
};


export const loginUserFacebook = (email,fullName,shoppingCartData,history) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Users/CreateUserFacebook?email=${email}&fullName=${fullName}`)
    await axios.get(url)
        .then(res =>  {  
            if (res.status===200 ) {
                //Save to localStorage
               
                const token = res.data;
             
                // Set token t  o localStorage
                localStorage.setItem('jwtToken', token);
                // Set token to Auth header. Apply Authorization token to header to every request
                setAuthToken(token);
                // the token includes user info but it is encoded
                // to decode we use jwt-decode
                //Decode token to get user data
                const decoded = jwt_decode(localStorage.getItem('jwtToken')!=null ? localStorage.getItem('jwtToken') : token );
                // Set current user
                dispatch(setCurrentUser(decoded));
                if(decoded.admin==="False"){
                    dispatch(cartActions.addToCartofCurrentUser(shoppingCartData))              
                    history.push('/')
                }
            } else {
                let error;
               
                if(res.data="Email hoặc mật khẩu không đúng!")
                    error = res.data;
                else
                    error = Object.values(res.data.errors)[0].toString();
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: error //sets payload to errors coming from server
                });
            }
        })
        .catch(err => {
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err //sets payload to errors coming from server
                })
            }
        );
};









