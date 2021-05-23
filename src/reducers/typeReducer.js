import * as Types from "../constants/ActionType";
const initialState = {
  types: {},
};

export default function typeReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_TYPES:
      return {
        ...state,
        types: action.types,
      };
    case Types.RESET_TYPE:
      return {
        types: [],
      };
    case Types.UPDATE_TYPE:
      var tempTypes = { ...state.types };
      for (let i = 0; i < tempTypes.entities.length; i++) {
        if (tempTypes.entities[i].id === action.payload.id) {
          tempTypes.entities[i] = action.payload;
          break;
        }
      }
      return {
        ...state,
        types: tempTypes,
      };
    default:
      return state;
  }
}
