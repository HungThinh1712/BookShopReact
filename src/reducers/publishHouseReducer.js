import * as Types from "../constants/ActionType";

const initialState = {
  publishHouses: {},
};

export default function publishHouseReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_PUBLISHHOUSES:
      return {
        ...state,
        publishHouses: action.publishHouses,
      };
    case Types.RESET_PUBLISHOUSE:
      return {
        publishHouses: [],
      };
    case Types.UPDATE_PUBLISH_HOUSE:
      var tempPublishouse = { ...state.publishHouses };
      for (let i = 0; i < tempPublishouse.entities.length; i++) {
        if (tempPublishouse.entities[i].id === action.payload.id) {
          tempPublishouse.entities[i] = action.payload;
          break;
        }
      }
      return {
        ...state,
        publishHouses: tempPublishouse,
      };
    default:
      return state;
  }
}
