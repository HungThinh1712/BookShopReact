import CartItem from "./../models/CartItem";
import * as Types from "./../constants/ActionType";
import { toastMessage } from "../components/common/ToastHelper";
import { useTranslation } from "react-i18next"

const cartItemInLocal =
  JSON.parse(localStorage.getItem("cart")) != null
    ? JSON.parse(localStorage.getItem("cart")).items
    : [];
const initialState = {
  items: cartItemInLocal,
};

export default function cartReducer(state = initialState, action) {
  // const { t } = useTranslation();
  const userId = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")).id
    : null;
  switch (action.type) {
    case Types.ADD_TO_CART:
      const addedBook = action.item;
      const price = addedBook.price;
      const coverPrice = addedBook.coverPrice;
      const name = addedBook.name;
      const authorName = addedBook.authorName;
      const bookId = addedBook.bookId;
      const imageSrc = addedBook.imageSrc;
      const discount = Math.ceil(((coverPrice - price) / coverPrice) * 100);
      let updatedOrNewCartItem;
      if (userId == null) {
        if (state.items[bookId]) {
          // already have the item in the cart
          toastMessage("Đã có sản phẩm trong giỏ hàng. Cập nhật số lượng");
          updatedOrNewCartItem = new CartItem(
            name,
            price,
            coverPrice,
            discount,
            authorName,
            state.items[addedBook.bookId].amount + action.amount,
            bookId,
            imageSrc
          );
        } else {
          // add new item
          toastMessage("Một sản phẩm mới đã được thêm vào giỏ hàng");
          updatedOrNewCartItem = new CartItem(
            name,
            price,
            coverPrice,
            discount,
            authorName,
            action.amount,
            bookId,
            imageSrc
          );
        }
        let st = {
          ...state,
          items: { ...state.items, [bookId]: updatedOrNewCartItem },
        };
        localStorage.setItem("cart", JSON.stringify(st));
        return st;
      } else {
        let flag = false;
        let st = [];
        const checkedBookID = state.items.updatedOrNewCartItem
          ? state.items.updatedOrNewCartItem.bookId
          : null;

        for (let i = 0; i < state.items.length; i++) {
          if (bookId === state.items[i].bookId || bookId === checkedBookID) {
            toastMessage("Đã có sản phẩm trong giỏ hàng. Cập nhật số lượng");
            flag = true;

            updatedOrNewCartItem = new CartItem(
              name,
              price,
              coverPrice,
              discount,
              authorName,
              action.amount,
              bookId,
              imageSrc
            );
            let newArray = [...state.items];
            newArray[i] = {
              ...newArray[i],
              amount: newArray[i].amount + action.amount,
            };
            st = {
              ...state,
              items: newArray,
            };
          }
        }
        if (flag === false) {
          toastMessage("Một sản phẩm mới đã được thêm vào giỏ hàng");
          updatedOrNewCartItem = new CartItem(
            name,
            price,
            coverPrice,
            discount,
            authorName,
            action.amount,
            bookId,
            imageSrc
          );
          st = {
            ...state,
            items: [...state.items, updatedOrNewCartItem],
          };
        }
        return st;
      }

    case Types.UPDATE_AMOUNT_CURENTBOOK_IN_CART_LOCAL:
      const updatedBook = action.item;
      const price_ = updatedBook.price;
      const coverPrice_ = updatedBook.coverPrice;
      const name_ = updatedBook.name;
      const authorName_ = updatedBook.authorName;
      const bookId_ = updatedBook.bookId;
      const imageSrc_ = updatedBook.imageSrc;
      const discount_ = Math.ceil(((coverPrice_ - price_) / coverPrice_) * 100);
      let updatedCartItem;
      if (state.items[bookId_]) {
        // already have the item in the cart

        updatedCartItem = new CartItem(
          name_,
          price_,
          coverPrice_,
          discount_,
          authorName_,
          action.amount,
          bookId_,
          imageSrc_
        );
      }
      let st = {
        ...state,
        items: { ...state.items, [bookId_]: updatedCartItem },
      };
      localStorage.setItem("cart", JSON.stringify(st));
      return st;

    case Types.UPDATE_AMOUNT_CURENTBOOK_IN_CART_SERVER:
      return {
        ...state,
        items: action.items,
      };

    // case Types.GET_CART_BY_USER_ID:
    //     if (action.items != null) {
    //         return {
    //             ...state,
    //             items: action.items,
    //         }
    //     } else {
    //         return {
    //             ...state
    //         }
    //     }
    case Types.DELETE_FROM_CART:
      let updatedCartItems_;

      // erase it
      if (userId == null) {
        updatedCartItems_ = { ...state.items };
        delete updatedCartItems_[action.bookId]; // delete product from object
        let st__ = {
          ...state,
          items: updatedCartItems_,
        };
        localStorage.setItem("cart", JSON.stringify(st__));
        return st__;
      } else {
        for (let i = 0; i < state.items.length; i++) {
          if (action.bookId === state.items[i].bookId) {
            updatedCartItems_ = [...state.items];
            //delete updatedCartItems_[i];
            // delete product from object

            updatedCartItems_.splice(i, 1);
            let st__ = {
              ...state,
              items: updatedCartItems_,
            };
            return st__;
          }
        }
      }
    case Types.CLEAR_CART_STATE:
      return {
        ...state,
        items: action.payload,
      };
    case Types.GET_CART_BY_USER_ID:
      return {
        ...state,
        items: action.items,
      };
    case Types.UPDATE_BOOK_AMOUNT:
      return {
        ...state,
        items: action.items,
      };

    default:
      return {
        ...state,
      };
  }
}
