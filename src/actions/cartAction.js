import * as Types from "./../constants/ActionType";
import axios from "axios";
import * as CallApis from "./../constants/Apis";
import { toastMessage } from "../components/common/ToastHelper";
import * as backdropAction from "./../actions/backdropAction";

export const addToCart = (item, amount) => {
  return {
    type: Types.ADD_TO_CART,
    item: item,
    amount: amount,
  };
};
export const updateAmountBookCurrentUser_Local = (item, amount) => {
  return {
    type: Types.UPDATE_AMOUNT_CURENTBOOK_IN_CART_LOCAL,
    item: item,
    amount: amount,
  };
};
export const deleteFromCart = (bookId) => {
  return {
    type: Types.DELETE_FROM_CART,
    bookId: bookId,
  };
};

export const addToCartofCurrentUser =
  (shoppingCartData) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/ShoppingCarts/AddToCart`);
    dispatch(backdropAction.setOpenBackDrop);
    await axios({
      method: "post",
      url: url,
      data: {
        shoppingCartData,
      },
    })
      .then((res) => {
        dispatch(backdropAction.setCloseBackDrop);
        if (res.status === 200) {
          localStorage.removeItem("cart");
        } else {
        }
      })
      .catch((err) => {});
  };

export const getCartByUserIdRequest = () => async (dispatch) => {
  const url = CallApis.API_URL.concat(`/ShoppingCarts/Get`);
  await axios
    .get(url)
    .then((res) => {
      dispatch({
        type: Types.GET_CART_BY_USER_ID, //this call test dispatch. to dispsatch to our reducer
        items: res.data,
      });
    })
    .catch((err) => {
      console.log("Error" + err);
    });
};

export const deleteIntemInCartofCurrentUser = (bookId) => async (dispatch) => {
  const url = CallApis.API_URL.concat(
    `/ShoppingCarts/DeleteItemInCart?bookId=${bookId}`
  );
  dispatch(backdropAction.setOpenBackDrop);
  await axios({
    method: "delete",
    url: url,
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch(backdropAction.setCloseBackDrop);
        localStorage.removeItem("cart");
      } else {
      }
    })
    .catch((err) => {});
};

export const payForCart =
  (paymentType, totalMoney, shippingFee, sendMessage, promotionCode) =>
  async (dispatch) => {
    let url = CallApis.API_URL.concat(
      `/ShoppingCarts/PayForCart?paymentType=${paymentType}&totalMoney=${totalMoney}&shippingFee=${shippingFee}`
    );
    if (promotionCode !== null) {
      console.log(url);
      url = url.concat(`&promotionCode=${promotionCode}`);
    }

    await axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getCartByUserIdRequest());
          sendMessage(res.data.orderId);
        } else {
        }
      })
      .catch((err) => {});
  };

export const clearStateCart = () => (dispatch) => {
  dispatch({
    type: Types.CLEAR_CART_STATE,
    payload: [],
  });
};

export const updateBookAmount = (history) => async (dispatch) => {
  dispatch(backdropAction.setOpenBackDrop);
  const url = CallApis.API_URL.concat(
    `/ShoppingCarts/UpdateAmountCartItemEqualsToDB`
  );
  await axios({
    method: "put",
    url: url,
  })
    .then((res) => {
      dispatch(backdropAction.setCloseBackDrop);
      if (res.status === 200) {
        history.push("/payment");
      } else {
        toastMessage(res.data);
        history.push("/cart");
      }
    })
    .catch((err) => {});
};

export const updateAmountBookCurrentUser_Server =
  (bookId, amount) => async (dispatch) => {
    dispatch(backdropAction.setOpenBackDrop);
    const url = CallApis.API_URL.concat(
      `/ShoppingCarts/IncreaseOrDecreaseItemAmount?bookId=${bookId}&amount=${amount}`
    );
    await axios({
      method: "put",
      url: url,
      data: {
        bookId,
      },
    })
      .then((res) => {
        dispatch(backdropAction.setCloseBackDrop);
        if (res.status === 200) {
          dispatch({
            type: Types.UPDATE_AMOUNT_CURENTBOOK_IN_CART_SERVER, //this call test dispatch. to dispsatch to our reducer
            items: res.data,
          });
        } else {
        }
      })
      .catch((err) => {});
  };

export const payWithMomo =
  (money, shippingFee, discountMoney, promotionCode) => async (dispatch) => {
    let sum = money + shippingFee - discountMoney;
    if (
      promotionCode != null &&
      (discountMoney === 0 || discountMoney === null)
    ) {
      sum = sum - shippingFee;
    }
    let url = CallApis.API_URL.concat(
      `/ShoppingCarts/PayByMomo?totalMoney=${sum
        .toString()
        .replace(".", "")}&shippingFee=${shippingFee}`
    );
    if (promotionCode) {
      url = url.concat(`&promotionCode=${promotionCode}`);
    }
    await axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        if (res.status === 200) {
          window.open(res.data, "_self");
        } else {
        }
      })
      .catch((err) => {});
  };
