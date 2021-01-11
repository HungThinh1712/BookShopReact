import * as Types from '../constants/ActionType'
const initialState = {
    users: [],


};

export default function (state = initialState, action) {
    switch (action.type) {

        case Types.GET_USERS:
            return {
                ...state,
                users: action.users,

            };
       
        default: return state;
    }
}
