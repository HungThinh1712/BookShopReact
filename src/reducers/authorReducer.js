import * as Types from "../constants/ActionType";
const initialState = {
  authors: {},
  author: null,
};

export default function authorReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_AUTHORS:
      return {
        ...state,
        authors: action.authors,
      };
    case Types.GET_AUTHOR:
      return {
        ...state,
        author: action.author,
      };
    case Types.UPDATE_AUTHOR:
      var tempAuthors = { ...state.authors };
      for (let i = 0; i < tempAuthors.entities.length; i++) {
        if (tempAuthors.entities[i].id === action.author.id) {
          tempAuthors.entities[i] = action.author;
          break;
        }
      }
      return {
        ...state,
        authors: tempAuthors,
      };

    default:
      return state;
  }
}
