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
    case Types.RESET_PUBLISHOUSE:
        return {
            publishHouses: [],
        }
    default:
      return state;
  }
}
