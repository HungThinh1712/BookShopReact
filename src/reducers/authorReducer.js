import * as Types from '../constants/ActionType'
const initialState = {
    authors: [],


};

export default function (state = initialState, action) {
    switch (action.type) {

        case Types.GET_AUTHORS:
            return {
                ...state,
                authors: action.authors,

            };
        case Types.ADD_AUTHOR:
            const addedAuthor = action.item;
            return {
                ...state,
                authors: [...state.authors, addedAuthor]

            };
        default: return state;
    }
}
