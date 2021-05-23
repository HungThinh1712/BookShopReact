import * as Types from "../constants/ActionType";

const initialState = {
  statisticByMonths: [],
};

export default function publishHouseReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_STATISTICS_BY_MONTHS:
      return {
        ...state,
        statisticByMonths: action.statisticByMonths,
      };
    default:
      return state;
  }
}
