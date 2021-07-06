import * as Types from "../constants/ActionType";
import axios from "axios";
import * as CallApis from "./../constants/Apis";
import { toastMessage } from "../components/common/ToastHelper";
import qs from "qs";
import * as backdropAction from "./../actions/backdropAction";


export const addPromotion = (promotion,history) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Promotion`);
  dispatch(backdropAction.setOpenBackDrop)
  await axios
    .post(url, promotion)
    .then((res) => {
      if (res.status === 200) {
        if(res.data===true){
          toastMessage("Thêm thành công");
          dispatch(backdropAction.setCloseBackDrop)
          history.push("/admin/promotions");
        }else{
          toastMessage("Mã khuyến mãi đã tồn tại")
        }
       
      } else {
       
          let error = Object.values(res.data.errors)[0].toString();
       
        dispatch(backdropAction.setCloseBackDrop)
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      dispatch(backdropAction.setCloseBackDrop)
      console.log(err);
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
    });
}

export const cancelPromotion = (id,history) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Promotion/Cancel?id=${id}`);
  dispatch(backdropAction.setOpenBackDrop)
  await axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        if(res.data===true){
          toastMessage("Hủy thành công");
          dispatch(backdropAction.setCloseBackDrop)
          history.push("/admin/promotions");
        }
      } else {
       
          let error = Object.values(res.data.errors)[0].toString();
       
        dispatch(backdropAction.setCloseBackDrop)
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      dispatch(backdropAction.setCloseBackDrop)
      console.log(err);
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
    });
}

export const activePromotion = (id,history) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Promotion/Active?id=${id}`);
  dispatch(backdropAction.setOpenBackDrop)
  await axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        if(res.data===true){
          toastMessage("Kích hoạt thành công");
          dispatch(backdropAction.setCloseBackDrop)
          history.push("/admin/promotions");
        }
      } else {
       
          let error = Object.values(res.data.errors)[0].toString();
       
        dispatch(backdropAction.setCloseBackDrop)
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      dispatch(backdropAction.setCloseBackDrop)
      console.log(err);
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
    });
}


export const updatePromotion = (promotion,history) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Promotion`);
  dispatch(backdropAction.setOpenBackDrop)
  await axios
    .put(url, promotion)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Cập nhật thành công");
        dispatch(backdropAction.setCloseBackDrop)
        history.push("/admin/promotions");
       
      } else {
        let error = Object.values(res.data.errors)[0].toString();
        dispatch(backdropAction.setCloseBackDrop)
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      dispatch(backdropAction.setCloseBackDrop)
      console.log(err);
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
    });
}
export const getPromontions = (page,pageSize,key) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Promotion?page=${page}&pageSize=${pageSize}&status=${key}`);
  dispatch(backdropAction.setOpenBackDrop)
  await axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: Types.GET_PROMOTIONS,
            promotions: res.data,
        })
        dispatch(backdropAction.setCloseBackDrop)
       
      } else {
        let error = Object.values(res.data.errors)[0].toString();
        dispatch(backdropAction.setCloseBackDrop)
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      dispatch(backdropAction.setCloseBackDrop)
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
    });
}
export const getPromontionsByMe = (totalMoney,bookIds) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Promotion/GetPromotionsByMe`);
  dispatch(backdropAction.setOpenBackDrop)
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
        dispatch(backdropAction.setCloseBackDrop)

       
      } else {
        let error = Object.values(res.data.errors)[0].toString();
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
        dispatch(backdropAction.setCloseBackDrop)

      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
      dispatch(backdropAction.setCloseBackDrop)

    });
}

export const getAllPromontionsByMe = () => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Promotion/GetAllPromotionsByMe`);
  dispatch(backdropAction.setOpenBackDrop)
  await axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: Types.GET_ALL_PROMOTION_BY_ME,
            promotions: res.data,
        })
        dispatch(backdropAction.setCloseBackDrop)

       
      } else {
        let error = Object.values(res.data.errors)[0].toString();
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
        dispatch(backdropAction.setCloseBackDrop)

      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
      dispatch(backdropAction.setCloseBackDrop)

    });
}


export const getPromontion = (id) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Promotion/Detail?id=${id}`);
  await axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: Types.GET_PROMOTION,
            promotion: res.data,
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
