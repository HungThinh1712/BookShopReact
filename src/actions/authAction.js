import axios from 'axios';
import setAuthToken from '../authentication/setAuthToken'
import jwt_decode from 'jwt-decode';
import {message} from 'antd';
import * as Types from '../constants/ActionType'



// 🔓  Login - Get user token
export const loginUser = (userData, history) => async (dispatch) => {
 
    

    await axios.post('https://localhost:44352/api/Auth', userData)
        .then(res =>  {
           
            if (res.status===200) {
                //Save to localStorage
               
                const token = res.data;
             
                // Set token t  o localStorage
                localStorage.setItem('jwtToken', token);
                // Set token to Auth header. Apply Authorization token to header to every request
                setAuthToken(token);
                // the token includes user info but it is encoded
                // to decode we use jwt-decode
                //Decode token to get user data
                const decoded = jwt_decode(token);
                // Set current user
                dispatch(setCurrentUser(decoded));
                //dispatch(setCurrentUserInfo());
                message.success("Login Successful");
                history.push('/')
            } else {
                let errors;
                if (res.data.error === "Invalid credentials") {    // username already exists
                    errors = {"username": "Username or password is not correct"}
                } else if (res.data.error === "Please provide an email and password") {
                    errors = {"username": "Please provide an email and password!"}
                } else if(res.data.error === "Password is not correct"){
                    errors = {"username": "Password is not correct!"}
                }
                else {
                    let res_ = res.data.error;
                    let res__ = res_.replace('User validation failed: ', '{"') + '"}';
                    let errObj = res__.replace(new RegExp(': ', 'g'), '" : "').replace(new RegExp(', ', 'g'), '", "');
                    errors = JSON.parse(errObj);
                }
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: errors //sets payload to errors coming from server
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

    axios.get(`https://localhost:44352/api/Users/Get?id=${userId}`)
        .then(res => {
            if (res.status===200) {
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

