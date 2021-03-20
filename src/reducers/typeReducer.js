import { updateType } from '../actions/typesAction';
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
        case Types.UPDATE_TYPE:
            const updatedType = action.item;
            return {
                ...state,
                authors: [...state.authors, updatedType]
            };
        default: return state;
    }
}
