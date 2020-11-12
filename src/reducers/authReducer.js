// file name can be anything
import * as Types from './../constants/ActionType'

import isEmpty from '../authentication/is-empty';
const isAuthenticated =  localStorage.getItem('jwtToken')!= null ? true : false
const userData = localStorage.getItem("userData") !=null ? localStorage.getItem("userData") : null
const initialState = {
    isAuthenticated: isAuthenticated,
    user: {},
    userData: JSON.parse(userData)
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Types.SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),   // if isEmpty is true we are not authenticated and vice versa
                user: action.payload
            };
        case Types.SET_CURRENT_USER_INFO:
            return{
                ...state,
               userData: action.payload
            };
        case Types.UPDATE_USER_ADDRESS:
            return{
                ...state,
                userData: action.payload
            };
        default:
            return state;
    }
}
