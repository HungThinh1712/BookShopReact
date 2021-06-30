import * as Types from "../constants/ActionType";
import axios from "axios";
import * as CallApis from "./../constants/Apis";
import { toastMessage } from "../components/common/ToastHelper";
import qs from "qs";



export const addPromotion = (promotion) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Promotion`);
  await axios
    .post(url, promotion)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Thêm thành công");
       
      } else {
        let error = Object.values(res.data.errors)[0].toString();
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
    });
}
export const getPromontions = (page,pageSize) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Promotion?page=${page}&pageSize=${pageSize}`);
  await axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: Types.GET_PROMOTIONS,
            promotions: res.data,
        })
       
      } else {
        let error = Object.values(res.data.errors)[0].toString();
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
    });
}
export const getPromontionsByMe = (totalMoney,bookIds) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Promotion/GetPromotionsByMe`);
  await axios
    .get(url,{
      params: {
        totalMoney: totalMoney,
        bookIds: bookIds
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: Types.GET_PROMOTIONS_BY_ME,
            promotionsByMe: res.data,
        })
       
      } else {
        let error = Object.values(res.data.errors)[0].toString();
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
    });
}

