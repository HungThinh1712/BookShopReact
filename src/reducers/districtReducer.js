import * as Types from '../constants/ActionType'
const initialState = {
   districts: [],
    
  
};

export default function  (state = initialState,action) {
    switch(action.type){
        
        case Types.GET_DISTRICTS:
            return {
                ...state,
               districts: action.districts,
               
            };
        default: return state;
    }
}
