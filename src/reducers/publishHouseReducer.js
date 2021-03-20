import * as Types from '../constants/ActionType'

const initialState = {
    publishHouses: [],
};

export default function (state = initialState, action) {
    switch (action.type) {

        case Types.GET_PUBLISHHOUSES:
            return {
                ...state,
                publishHouses: action.publishHouses,

            };
        case Types.ADD_PUBLISH_HOUSE:
            const addedPublishouse = action.item;
            return {
                ...state,
                publishHouses: [...state.publishHouses, addedPublishouse]

            };
        case Types.UPDATE_PUBLISH_HOUSE:
            const updatedPublishouse = action.item;
            return {
                ...state,
                publishHouses: [...state.publishHouses, updatedPublishouse]
            };
        default:
            return state;
    }
}