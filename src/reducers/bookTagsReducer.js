import * as Types from "../constants/ActionType";
const initialState = {
  bookTags: [],
};

export default function bookTagReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_BOOKTAGS:
      return {
        ...state,
        bookTags: action.bookTags,
      };
    case Types.ADD_BOOK_TAG:
      const addedTag = action.item;
      return {
        ...state,
        bookTags: [...state.bookTags, addedTag],
      };
    default:
      return state;
  }
}
