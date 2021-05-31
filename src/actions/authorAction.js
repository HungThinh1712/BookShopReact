import * as Types from "../constants/ActionType";
import axios from "axios";
import * as CallApis from "./../constants/Apis";
import { toastMessage } from "../components/common/ToastHelper";

export const getAuthorsRequest = (name, page, pageSize) => async (dispatch) => {
  const url = CallApis.API_URL.concat(
    `/Authors?name=${name}&page=${page}&pageSize=${pageSize}`
  );
  await axios
    .get(url)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Types.GET_AUTHORS, //this call test dispatch. to dispsatch to our reducer
        authors: res.data,
      });
    })
    .catch((err) => {
      console.log("Error" + err);
    });
};

export const getAuthorRequest = (id) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Authors/GET?id=${id}`);
  await axios
    .get(url)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Types.GET_AUTHOR, //this call test dispatch. to dispsatch to our reducer
        author: res.data,
      });
    })
    .catch((err) => {
      console.log("Error" + err);
    });
};

export const addAuthor = (author) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Authors/Create`);

  await axios
    .post(url, author)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Thêm thành công");
        dispatch({
          type: Types.ADD_AUTHOR, //this call test dispatch. to dispsatch to our reducer
          authors: res.data,
        });
      } else {
        let error = Object.values(res.data.errors)[0].toString();
        console.log("error", error);
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

export const updateAuthor = (updatedAuthor) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Authors/Update`);
  await axios
    .put(url, updatedAuthor)
    .then((res) => {
      if (res.status === 200) {
        toastMessage("Cập nhật thành công");
        dispatch({
          type: Types.UPDATE_AUTHOR,
          author: res.data,
        });
      } else {
        dispatch({
          type: Types.GET_ERRORS, //this call test dispatch. to dispsatch to our reducer
          payload: res.data, //sets payload to errors coming from server
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteAuthor = (id) => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/Authors/Delete?id=${id}`);
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
