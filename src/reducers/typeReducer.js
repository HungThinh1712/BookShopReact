import * as Types from "../constants/ActionType";
const initialState = {
  types: [],
};

export default function typeReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_TYPES:
      return {
        ...state,
        types: action.types,
      };
    case Types.ADD_TYPES:
      return {
        ...state,
        types: action.types,
      };
    case Types.UPDATE_TYPE:
      const updatedType = action.item;
      return {
        ...state,
        authors: [...state.authors, updatedType],
      };
    case Types.RESET_TYPE:
      return {
        types: [],
      };
    default:
      return state;
  }
}
