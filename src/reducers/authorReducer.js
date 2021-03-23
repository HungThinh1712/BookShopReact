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
            const temp = { ...state.publishHouses };
            temp.entities.unshift(addedAuthor);
            return {
                ...state,
                authors: temp,
            };
        case Types.UPDATE_AUTHOR:
            const updatedAuthor = action.item;
            return {
                ...state,
                authors: [...state.authors, updatedAuthor]
            };
        case Types.RESET_AUTHOR:
            return {
                authors: [],
            }
        default: return state;
    }
}