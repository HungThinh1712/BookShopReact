import * as Types from "../constants/ActionType";
import axios from "axios";
import * as CallApis from "./../constants/Apis";
import { toastMessage } from "../components/common/ToastHelper";
import * as backdropAction from "../actions/backdropAction";

export const getAuthorsRequest = (name, page, pageSize) => async (dispatch) => {
  const url = CallApis.API_URL.concat(
    `/Authors?name=${name}&page=${page}&pageSize=${pageSize}`
  );
  dispatch(backdropAction.setOpenBackDrop);
  await axios
    .get(url)
    .then((res) => {
      dispatch(backdropAction.setCloseBackDrop);
      dispatch({
        type: Types.GET_AUTHORS, //this call test dispatch. to dispsatch to our reducer
        authors: res.data,
      });
    })
    .catch((err) => {
      dispatch(backdropAction.setCloseBackDrop);
    });
};

export const getAuthorRequest = (id) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Authors/GET?id=${id}`);
  dispatch(backdropAction.setOpenBackDrop);
  await axios
    .get(url)
    .then((res) => {
      dispatch(backdropAction.setCloseBackDrop);
      dispatch({
        type: Types.GET_AUTHOR, //this call test dispatch. to dispsatch to our reducer
        author: res.data,
      });
    })
    .catch((err) => {
      dispatch(backdropAction.setCloseBackDrop);
    });
};

export const addAuthor = (author) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Authors/Create`);
  dispatch(backdropAction.setOpenBackDrop);
  await axios
    .post(url, author)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Thêm thành công");
        dispatch(backdropAction.setCloseBackDrop);
        dispatch({
          type: Types.ADD_AUTHOR, //this call test dispatch. to dispsatch to our reducer
          authors: res.data,
        });
      } else {
        let error = Object.values(res.data.errors)[0].toString();
        dispatch(backdropAction.setCloseBackDrop);
        console.log("error", error);
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

export const updateAuthor = (updatedAuthor) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Authors/Update`);
  dispatch(backdropAction.setOpenBackDrop);
  await axios
    .put(url, updatedAuthor)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Cập nhật thành công");
        dispatch(backdropAction.setCloseBackDrop);
        dispatch({
          type: Types.UPDATE_AUTHOR,
          author: res.data,
        });
      } else {
        dispatch(backdropAction.setCloseBackDrop);
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: res.data, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      dispatch(backdropAction.setCloseBackDrop);
    });
};

export const deleteAuthor = (id) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Authors/Delete?id=${id}`);
  dispatch(backdropAction.setOpenBackDrop);
  await axios
    .delete(url)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Xóa thành công");
        dispatch(backdropAction.setCloseBackDrop);
      } else {
        let error = Object.values(res.data.errors)[0].toString();
        dispatch(backdropAction.setCloseBackDrop);

        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: error, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(backdropAction.setCloseBackDrop);

      dispatch({
        type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
        payload: err, //sets payload to errors coming from server
      });
    });
};
