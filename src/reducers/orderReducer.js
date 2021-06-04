import * as Types from '../constants/ActionType'
const initialState = {
    orders: [],
    order: null
};

export default function  orderReducer(state = initialState,action) {
    switch(action.type){
        
        case Types.GET_ORDERS:
            return {
                ...state,
                orders: action.orders,
               
            };
        case Types.GET_ORDER:
            return{
                ...state,
                order:action.order
            }
        default: return state;
    }
}
