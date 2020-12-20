import * as Types from '../constants/ActionType'
const initialState = {
   wards: [],
    
  
};

export default function  (state = initialState,action) {
    switch(action.type){
        
        case Types.GET_WARDS:
            return {
                ...state,
               wards: action.wards,
               
            };
        default: return state;
    }
}
