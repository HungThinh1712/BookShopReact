// file name can be anything
import * as Types from './../constants/ActionType'
const initialState = {
    open:false
};

export default function backdropReducer(state = initialState, action) {
    switch (action.type) {
        case Types.OPEN_BACKDROP:
            return{
                ...state,
                open: action.open
            };
        case Types.CLOSE_BACKDROP:
            return{
                ...state,
                open: action.open
            };
        default:
            return state;
    }
}
