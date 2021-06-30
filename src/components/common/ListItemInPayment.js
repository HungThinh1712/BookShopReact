import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ItemInPayment from "./ItemCartInPayment";
import { useSelector, useDispatch } from "react-redux";
import * as cartAction from "./../../actions/cartAction";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Divider } from '@material-ui/core';

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

  const sumMoneyAfterDiscount = ()=>{
    let  sumMoneyDiscount
    if(props.discountMoney){
      sumMoneyDiscount = props.totalMoney + props.shippingFee - props.discountMoney;
      return <span>{`${sumMoneyDiscount
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`}</span>
    }
    else if(props.shippingFeeAfterDiscount)
      return <span>
        {`${props.totalMoney
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`}
      </span>;
    else{
      return null;
    }
  }

  const showDiscountMoney = ()=>{
    if(props.discountMoney){
      return <span>{`-${props.discountMoney
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`}</span>
    }
    else if(props.shippingFeeAfterDiscount){
      console.log(props.shippingFeeAfterDiscount);
      return <span>{`-${props.shippingFee
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ`}</span>
    }
  }

  const showCartItems = Object.values(cartItems.items).map((cartItem) => (
    <div>
      <ItemInPayment
        key={cartItem.bookId}
        title={cartItem.name}
        price={cartItem.price}
        amount={cartItem.amount}
      />
    </div>
  ));
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderStyle: "solid",
          borderWidth: "2px",
          marginTop: "20px",
          borderColor: "#253528",
          borderRadius: "5px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "700", fontSize: "17px", padding: "10px" }}>
            {t("Customer_Shopping_Payment.23")}
          </div>
          <div style={{ padding: "10px", marginLeft: "200px" }}>
            <Button
              onClick={() => props.history.push("/cart")}
              variant="contained"
              size="small"
            >
              {t("Customer_Shopping_Payment.10")}
            </Button>
          </div>
        </div>
        <div style={{ backgroundColor: "#253528", height: "1px" }}></div>
        {showCartItems}
        <div style={{ backgroundColor: "#253528", height: "1px" }}></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              fontWeight: "600",
              fontSize: "13px",
              padding: "2px",
              marginLeft: "10px",
            }}
          >
            Phí vận chuyển
          </div>
          <div style={{ padding: "2px", marginRight: "10px" }}>
            <div style={{ fontSize: "13px", fontWeight: "500" }}>{`${
              props.shippingFee 
                ? props.shippingFee
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
                : null
            }đ (${props.distance})`}</div>
          </div>
        </div>

        <div style={{ backgroundColor: "#253528", height: "0.5px" }}></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "600", fontSize: "17px", padding: "10px" }}>
            {t("Customer_Shopping_Payment.4")}
          </div>
          <div style={{ padding: "10px", marginLeft: "200px" }}>
            <div>
            <div style={{ color: "red", fontSize: "20px", fontWeight: "500" }}>
              {sumMoney.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ
            </div>
              <div
                style={{ color: "red", fontSize: "15px", fontWeight: "500",display:'flex',justifyContent:'flex-end' }}
              >
                {showDiscountMoney()}
              </div>
          </div>
          {props.discountMoney || props.shippingFeeAfterDiscount ? <Divider/> : null}
          <div
                style={{ color: "red", fontSize: "20px", fontWeight: "500" }}
              >
                {sumMoneyAfterDiscount()}
              </div>
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            className="txt-promotion"
            onClick={props.showModal}
            style={{
              fontWeight: "600",
              fontSize: "15px",
              paddingRight: "10px",
              color: "rgb(13, 92, 182)",
            }}
          >
            Chọn mã khuyến mãi
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ListItemIPayment);
