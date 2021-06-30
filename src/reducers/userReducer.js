import * as Types from "../constants/ActionType";
const initialState = {
  users: [],
  allUsers: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_USERS:
      return {
        ...state,
        users: action.users,
      };
      case Types.GET_All_USERS:
        return {
          ...state,
          allUsers: action.users,
        };

    default:
      return state;
  }
}
