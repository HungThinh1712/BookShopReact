import * as Types from "../constants/ActionType";
import axios from "axios";
import * as CallApis from "./../constants/Apis";
import * as backdropAction from "./../actions/backdropAction";
import { toastMessage } from "../components/common/ToastHelper";
export const getUsersRequest = (page, name) => async (dispatch) => {
  const url = CallApis.API_URL.concat(
    `/Users/Admin/GetUser?name=${name}&page=${page}`
  );
  dispatch(backdropAction.setOpenBackDrop);
  await axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: Types.GET_USERS, //this call test dispatch. to dispsatch to our reducer
          users: res.data,
        });
        dispatch(backdropAction.setCloseBackDrop);
      }
    })
    .catch((err) => {
      console.log("Error" + err);
    });
};

export const getAllUsersRequest = () => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Users/GetAll`);
  await axios
    .get(url)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Types.GET_All_USERS, //this call test dispatch. to dispsatch to our reducer
        users: res.data,
      });
    })
    .catch((err) => {
      console.log("Error" + err);
    });
};

export const getAdminUsersRequest = (name) => async (dispatch) => {
  const url = CallApis.API_URL.concat(
    `/Users/Admin/GetAdminsUser?name=${name}`
  );
  dispatch(backdropAction.setOpenBackDrop);

  await axios
    .get(url)
    .then((res) => {
      dispatch(backdropAction.setCloseBackDrop);

      dispatch({
        type: Types.GET_ADMIN_USERS, //this call test dispatch. to dispsatch to our reducer
        users: res.data,
      });
    })
    .catch((err) => {
      dispatch(backdropAction.setCloseBackDrop);

      console.log("Error" + err);
    });
};

export const deactivateOrActivate = (id, isActivate) => async (dispatch) => {
  const url = CallApis.API_URL.concat(
    `/Users/Admin/Activate?id=${id}&isActivate=${isActivate}`
  );
  await axios
    .get(url)
    .then((res) => {
      toastMessage("Thành công");
    })
    .catch((err) => {
      console.log("Error" + err);
    });
};

export const createAdmin = (admin, action) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Users/Admin`);
  dispatch(backdropAction.setOpenBackDrop);
  await axios
    .post(url, admin)
    .then((res) => {
      dispatch(backdropAction.setCloseBackDrop);
      if (res.status === 200) {
        toastMessage("Thêm thành công");
        action(false);
      } else {
        let error;
        error = Object.values(res.data.errors)[0].toString();
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      dispatch(backdropAction.setCloseBackDrop);
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
    });
};

export const updateAdmin = (admin) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Users/Admin/Update`);
  dispatch(backdropAction.setOpenBackDrop);
  await axios
    .post(url, admin)
    .then((res) => {
      dispatch(backdropAction.setCloseBackDrop);
      if (res.status === 200) {
        toastMessage("Cập nhật thành công thành công");
      } else {
        let error;
        error = Object.values(res.data.errors)[0].toString();
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      dispatch(backdropAction.setCloseBackDrop);
      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
    });
};
