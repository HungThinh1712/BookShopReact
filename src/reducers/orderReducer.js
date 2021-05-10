import * as Types from '../constants/ActionType'
const initialState = {
    orders: [],
};

export default function  orderReducer(state = initialState,action) {
    switch(action.type){
        
        case Types.GET_ORDERS:
            return {
                ...state,
                orders: action.orders,
               
            };
        default: return state;
    }
}
