import * as Types from '../constants/ActionType'
const initialState = {
   promotions: [],
   promotionsByMe:[]
    
  
};

export default function  promotionsReducer(state = initialState,action) {
    switch(action.type){
        
        case Types.GET_PROMOTIONS:
            return {
                ...state,
               promotions: action.promotions,
               
            };
        case Types.GET_PROMOTIONS_BY_ME:
            return {
            ...state,
            promotionsByMe: action.promotionsByMe,
                   
            };
        default: return state;
    }
}
