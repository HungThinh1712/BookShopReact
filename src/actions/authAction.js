import axios from 'axios';
import setAuthToken from '../authentication/setAuthToken'
import jwt_decode from 'jwt-decode';
import * as Types from '../constants/ActionType'
import * as cartActions from './../actions/cartAction'



// 🔓  Login - Get user token
export const loginUser = (userData, history,shoppingCartData) => async (dispatch) => {
    await axios.post('https://localhost:44352/api/Auth', userData)
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
               
                if(decoded.admin==="False"){
                    dispatch(cartActions.addToCartofCurrentUser(shoppingCartData))
                    dispatch(setCurrentUser(decoded));
                    history.push('/')
                }
                else{
                    history.push('/admin_page')
                }
            } else {
                let error;
                if(res.data.errors!==undefined)
                    error = "Email không hợp lê"
                else
                    error = res.data
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

    axios.get(`https://localhost:44352/api/Users/Get?id=${userId}`)
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
export const updateAddressOfCurrentUser = (updatedUser,history) => async (dispatch) => {
    await axios({
        
        method: 'put',
        url: `https://localhost:44352/api/Users/UpdateAddress`,
        headers: {}, 
        data: {
            updatedUser
        }
      }).then(res => {
        if (res.status===200) {
         
            history.push('/address_shipping')
            localStorage.setItem('userData', JSON.stringify(res.data));
            dispatch( {
                type: Types.UPDATE_USER_ADDRESS,
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

