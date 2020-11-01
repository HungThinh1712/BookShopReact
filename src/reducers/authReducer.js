// file name can be anything
import * as Types from './../constants/ActionType'

import isEmpty from '../authentication/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    userData: {}
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
        default:
            return state;
    }
}
