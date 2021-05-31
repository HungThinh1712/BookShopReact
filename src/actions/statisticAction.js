import * as Types from "../constants/ActionType";
import axios from "axios";
import * as CallApis from "./../constants/Apis";

export const getStatisticByMonths = (year) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Orders/StatisticByMonth?year=${year}`);
  await axios
    .get(url)
    .then((res) => {
      dispatch({
        type: Types.GET_STATISTICS_BY_MONTHS, //this call test dispatch. to dispsatch to our reducer
        statisticByMonths: res.data,
      });
    })
    .catch((err) => {
      console.log("Error" + err);
    });
};
