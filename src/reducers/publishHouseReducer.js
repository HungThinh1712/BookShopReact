import { updatePublishHouse } from '../actions/publishHouseAction';
import * as Types from '../constants/ActionType'
const publishHouseData = localStorage.getItem("publishHouseData") != null ? localStorage.getItem("publishHouseData") : null

const initialState = {
    publishHouses: [],
    publishHouseData: JSON.parse(publishHouseData)
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
        case Types.UPDATE_PROFILE_USER:
            return {
                ...state,
                publishHouseData: action.payload
            };
        default:
            return state;
    }
}