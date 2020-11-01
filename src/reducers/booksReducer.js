import * as Types from '../constants/ActionType'
const initialState = {
    books: [],
    selectedBook: null,
    suggestedBooks:[], 
};

export default function  (state = initialState, action) {
    switch(action.type){
        
        case Types.GET_ALLBOOK:

            return {
                ...state,
                books: action.books,

            };
        case Types.GET_BOOK_BY_ID:
            return {
                ...state,
                selectedBook: action.selectedBook
            };
        case Types.GET_BOOK_BY_TYPE_ID:
            return {
                ...state,
                suggestedBooks: action.suggestedBooks
            };
        default: return state;
    }
}
