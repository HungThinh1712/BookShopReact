import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ItemInPayment from "./ItemCartInPayment";
import { useSelector, useDispatch } from "react-redux";
import * as cartAction from "./../../actions/cartAction";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Divider } from "@material-ui/core";

const ListItemIPayment = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) =>
    state.cart.items ? state.cart : []
  );

  const bookIds = cartItems.items.map((x) => x.bookId);

  const userId = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")).id
    : null;
  useEffect(() => {
    const fetchUser = () => {
      if (userId != null) {
        dispatch(cartAction.getCartByUserIdRequest());
      }
    };
    fetchUser();
  }, [userId, dispatch]);

  const sumMoney = props.totalMoney + props.shippingFee;

  const sumMoneyAfterDiscount = () => {
    let sumMoneyDiscount;
    if (props.discountMoney) {
      sumMoneyDiscount =
        props.totalMoney + props.shippingFee - props.discountMoney;
      return (
        <span>{`${sumMoneyDiscount
          .toString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`}</span>
      );
    } else if (props.shippingFeeAfterDiscount)
      return (
        <span>
          {`${props.totalMoney
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`}
        </span>
      );
    else {
      return (
        <span>
          {`${sumMoney.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`}
        </span>
      );
    }
  };

  const showDiscountMoney = () => {
    if (props.discountMoney) {
      return (
        <span>{`-${props.discountMoney
          .toString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`}</span>
      );
    } else if (props.shippingFeeAfterDiscount) {
      return (
        <span>{`-${props.shippingFee
          .toString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`}</span>
      );
    } else {
      return <span>0đ</span>;
    }
  };

  const showCartItems = Object.values(cartItems.items).map((cartItem) => (
    <div>
      <ItemInPayment
        key={cartItem.bookId}
        title={cartItem.name}
        price={cartItem.price}
        amount={cartItem.amount}
        imageSrc={cartItem.imageSrc}
      />
    </div>
  ));
  return (
    <div style={{ width: "75%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderColor: "#253528",
          borderRadius: "10px",
          padding: "10px 15px 10px 15px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 15px 0 15px",
          }}
        >
          <span
            style={{
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Thông tin đơn hàng
          </span>
          <span
            style={{
              color: "blueviolet",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "500",
            }}
            onClick={() => props.history.push("/cart")}
          >
            Chỉnh sửa
          </span>
        </div>

        {showCartItems}
      </div>

      <div
        style={{
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "500", opacity: "0.7" }}>
            Tạm tính
          </span>
          <span style={{ fontSize: "15px", fontWeight: "700" }}>
            {props.totalMoney
              .toString()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
            đ
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "500", opacity: "0.7" }}>
            Phí vận chuyển
          </span>
          <span style={{ fontSize: "15px", fontWeight: "700" }}>
            {`${
              props.shippingFee
                ? props.shippingFee
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
                : null
            }đ `}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "500", opacity: "0.7" }}>
            Giảm giá
          </span>
          <span style={{ fontSize: "15px", fontWeight: "700" }}>
            {showDiscountMoney()}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "500", opacity: "0.7" }}>
            Thành tiền
          </span>
          <span style={{ fontSize: "25px", fontWeight: "700", color: "red" }}>
            {sumMoneyAfterDiscount()}
          </span>
        </div>
        <div
          onClick={props.showModal}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            color: "rgb(20, 53, 195)",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          Chọn mã khuyến mãi
        </div>
        <div
          style={{
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <Button
            onClick={props.purchaseButtonClick}
            style={{
              width: "100%",
              backgroundColor: "#114b5f",
              color: "white",
              fontWeight: "500",
            }}
          >
            Đặt hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ListItemIPayment);
