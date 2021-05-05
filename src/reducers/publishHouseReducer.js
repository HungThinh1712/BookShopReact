import { addPublishHouse } from "../actions/publishHouseAction";
import * as Types from "../constants/ActionType";

const initialState = {
  publishHouses: [],
};

export default function publishHouseReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_PUBLISHHOUSES:
      return {
        ...state,
        publishHouses: action.publishHouses,
      };
    case Types.ADD_PUBLISH_HOUSE:
      const addedPublisHouse = action.item;
      const temp = { ...state.publishHouses };
      temp.entities.unshift(addedPublisHouse);
      return {
        ...state,
        publishHouses: temp,
      };
    case Types.UPDATE_PUBLISH_HOUSE:
      const updatedPublishouse = action.item;
      return {
        ...state,
        publishHouses: [...state.publishHouses, updatedPublishouse],
      };
    case Types.RESET_PUBLISHOUSE:
        return {
            publishHouses: [],
        }
    default:
      return state;
  }
}
