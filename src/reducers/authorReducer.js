import * as Types from "../constants/ActionType";
const initialState = {
  authors: [],
  author: null
};

export default function authorReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_AUTHORS:
      return {
        ...state,
        authors: action.authors,
      };
    case Types.GET_AUTHOR:
      return{
        ...state,
        author: action.author
      }

    default:
      return state;
  }
}
