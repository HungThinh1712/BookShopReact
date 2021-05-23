import * as Types from "../constants/ActionType";
import axios from "axios";
import * as CallApis from "./../constants/Apis";
import { toastMessage } from "../components/common/ToastHelper";

export const getPublishHousesRequest =
  (name, page, pageSize) => async (dispatch) => {
    const url = CallApis.API_URL.concat(
      `/PublishingHouses?name=${name}&page=${page}&pageSize=${pageSize}`
    );
    await axios
      .get(url)
      .then((res) => {
        dispatch({
          type: Types.GET_PUBLISHHOUSES, //this call test dispatch. to dispsatch to our reducer
          publishHouses: res.data,
        });
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

export const addPublishHouse = (publishHouse) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/PublishingHouses/Create`);
  await axios
    .post(url, publishHouse)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Thêm thành công");
        dispatch({
          type: Types.ADD_PUBLISH_HOUSE, //this call test dispatch. to dispsatch to our reducer
          item: res.data,
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

export const updatePublishHouse = (updatedPublishHouse) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/PublishingHouses/Update`);
  await axios
    .put(url, updatedPublishHouse)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Cập nhật thành công");
        dispatch({
          type: Types.UPDATE_PUBLISH_HOUSE, //this call test dispatch. to dispsatch to our reducer
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


export const getAllPublishingHouseRequest =
  (page, name) => async (dispatch) => {
    const url = CallApis.API_URL.concat(
      `/PublishingHouses/Admin/GetAllPublishingHouse?name=${name}&${page}`
    );
    await axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: Types.GET_PUBLISHHOUSES, //this call test dispatch. to dispsatch to our reducer
          publishHouses: res.data,
        });
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };
