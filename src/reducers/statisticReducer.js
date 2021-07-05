import * as Types from "../constants/ActionType";

const initialState = {
  statisticByMonths: [],
  topFiveBooks: [],
};

export default function publishHouseReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_STATISTICS_BY_MONTHS:
      return {
        ...state,
        statisticByMonths: action.statisticByMonths,
      };
      case Types.GET_TOP_FIVE_BOOKS:
        return {
          ...state,
          topFiveBooks: action.topFiveBooks,
        };
    default:
      return state;
  }
}
