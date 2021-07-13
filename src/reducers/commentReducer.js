import * as Types from "../constants/ActionType";
const initialState = {
  comments: [],
  ratings: [],
  comment: null,
  adminComments: [],
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    case Types.GET_ADMIN_COMMENTS:
      return {
        ...state,
        adminComments: action.comments,
      };
    case Types.GET_COMMENT:
      return {
        ...state,
        comments: action.comments,
      };
    case Types.GET_RATINGS:
      return {
        ...state,
        ratings: action.ratings,
      };
    case Types.ADD_COMMENT:
      return {
        ...state,
        ratings: action.payload.ratings,
        comments: action.payload.comments,
      };
    case Types.UPDATE_COMMENT:
      return {
        ...state,
        ratings: action.payload.ratings,
        comments: action.payload.comments,
      };
    case Types.DELETE_COMMENT:
      return {
        ...state,
        ratings: action.payload.ratings,
        comments: action.payload.comments,
      };
    default:
      return state;
  }
}
