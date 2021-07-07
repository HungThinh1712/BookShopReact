import * as Types from "../constants/ActionType";
const initialState = {
  users: [],
  allUsers: [],
  adminUsers:[]
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
        case Types.GET_ADMIN_USERS:
          return {
            ...state,
            adminUsers: action.users,
          };

    default:
      return state;
  }
}
