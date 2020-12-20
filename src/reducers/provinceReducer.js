import * as Types from '../constants/ActionType'
const initialState = {
   provinces: [],
    
  
};

export default function  (state = initialState,action) {
    switch(action.type){
        
        case Types.GET_PROVINCES:
            return {
                ...state,
               provinces: action.provinces,
               
            };
        default: return state;
    }
}
