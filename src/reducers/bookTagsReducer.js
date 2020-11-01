import * as Types from '../constants/ActionType'
const initialState = {
    bookTags: [],
    
  
};

export default function  (state = initialState,action) {
    switch(action.type){
        
        case Types.GET_BOOKTAGS:
            return {
                ...state,
                bookTags: action.bookTags,
               
            };
        default: return state;
    }
}
