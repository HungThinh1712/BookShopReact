import * as Types from '../constants/ActionType'
const initialState = {
    types: [],
    
  
};

export default function  (state = initialState,action) {
    switch(action.type){
        
        case Types.GET_TYPES:
            return {
                ...state,
                types: action.types,
               
            };
            case Types.ADD_TYPES:
                const addedType = action.item;
                return {
                    ...state,
                    types: [...state.types, addedType]
    
                };
        default: return state;
    }
}
