import * as Types from '../constants/ActionType'
const initialState = {
    comments: [],
    ratings: []


};

export default function (state = initialState, action) {
    switch (action.type) {

        case Types.GET_COMMENTS:
            return {
                ...state,
                comments: action.comments,

            };
        case Types.GET_RATINGS:
            return {
                ...state,
                ratings: action.ratings,

            };
        case Types.ADD_COMMENT:
            return {
                ...state,
                ratings: action.payload.ratings,
                comments: action.payload.comments
            };
        case Types.UPDATE_COMMENT:
            return {
                ...state,
                ratings: action.payload.ratings,
                comments: action.payload.comments
            };
        case Types.DELETE_COMMENT:
            return {
                ...state,
                ratings: action.payload.ratings,
                comments: action.payload.comments
            };
        default: return state;
    }
}
