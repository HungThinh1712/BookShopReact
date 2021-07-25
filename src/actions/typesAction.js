import * as Types from "../constants/ActionType";
import axios from "axios";
import * as CallApis from "./../constants/Apis";
import { toastMessage } from "../components/common/ToastHelper";

export const getTypesRequest = (name, page, pageSize) => async (dispatch) => {
  const url = CallApis.API_URL.concat(
    `/Types/GetAll?name=${name}&page=${page}&pageSize=${pageSize}`
  );
  await axios
    .get(url)
    .then((res) => {
      dispatch({
        type: Types.GET_TYPES, //this call test dispatch. to dispsatch to our reducer
        types: res.data,
      });
    })
    .catch((err) => {
      console.log("Error" + err);
    });
};

export const getTypesIncludeDeleteRequest =
  (name, page, pageSize) => async (dispatch) => {
    const url = CallApis.API_URL.concat(
      `/Types/GetAllIncludesDeleted?name=${name}&page=${page}&pageSize=${pageSize}`
    );
    await axios
      .get(url)
      .then((res) => {
        dispatch({
          type: Types.GET_TYPES, //this call test dispatch. to dispsatch to our reducer
          types: res.data,
        });
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

export const addType = (type) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Types/Create`);
  await axios
    .post(url, type)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Thêm thành công");
        dispatch({
          type: Types.ADD_TYPES, //this call test dispatch. to dispsatch to our reducer
          types: res.data,
        });
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
};
export const updateType = (type) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Types/Update`);
  console.log(type);
  await axios
    .put(url, type)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Cập nhật thành công");
        dispatch({
          type: Types.UPDATE_TYPE, //this call test dispatch. to dispsatch to our reducer
          payload: res.data,
        });
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
};
export const deleteType = (id) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Types/Delete?id=${id}`);
  await axios
    .delete(url)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Xóa thành công");
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
};
