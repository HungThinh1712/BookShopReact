import * as Types from '../constants/ActionType'
const initialState = {
    notifications: [],


};

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {

        case Types.GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications,

            };
        
        default: return state;
    }
}
