import * as Types from "../constants/ActionType";
const initialState = {
  promotions: [],
  promotionsByMe: [],
  allPromotionsByMe: [],
  promotion: null,
};

export default function promotionsReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_PROMOTIONS:
      return {
        ...state,
        promotions: action.promotions,
      };
    case Types.GET_PROMOTIONS_BY_ME:
      return {
        ...state,
        promotionsByMe: action.promotionsByMe,
      };
    case Types.GET_PROMOTION:
      return {
        ...state,
        promotion: action.promotion,
      };
      case Types.GET_ALL_PROMOTION_BY_ME:
        return {
          ...state,
          allPromotionsByMe: action.promotions,
        };
    default:
      return state;
  }
}
