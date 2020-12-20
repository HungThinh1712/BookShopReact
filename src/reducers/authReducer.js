// file name can be anything
import * as Types from './../constants/ActionType'
import { toastMessage } from '../components/common/ToastHelper';
import isEmpty from '../authentication/is-empty';
const isAuthenticated = localStorage.getItem('jwtToken') != null ? true : false
const userData = localStorage.getItem("userData") != null ? localStorage.getItem("userData") : null
const initialState = {
    isAuthenticated: isAuthenticated,
    user: {},
    userData: JSON.parse(userData)
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Types.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),   // if isEmpty is true we are not authenticated and vice versa
                user: action.payload
            };
        case Types.SET_CURRENT_USER_INFO:
            return {
                ...state,
                userData: action.payload
            };
        case Types.UPDATE_USER_ADDRESS:
            return {
                ...state,
                userData: action.payload
            };
        case Types.GET_ERRORS:
            const error = action.payload;
            toastMessage(error);
            return {
                ...state,
            };
        case Types.LOG_OUT:
            toastMessage("Đăng xuất thành công")
            return {
                ...state,
                isAuthenticated: false,   // if isEmpty is true we are not authenticated and vice versa
                user: action.payload,
                userData: action.payload
            };
        case Types.UPDATE_PROFILE_USER:
            return {
                ...state,
                userData: action.payload
            };
        default:
            return state;
    }
}
