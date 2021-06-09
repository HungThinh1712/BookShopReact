import React from "react";

const ItemCartInPayment = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <div style={{ fontWeight: "500", fontSize: "14px", padding: "10px",color: "#253528" }}>
          {props.amount} x{" "}
        </div>
        <div
          style={{
            fontWeight: "500",
            fontSize: "14px",
            padding: "10px",
            color: "#253528",
          }}
        >
          {props.title}
        </div>
      </div>
      <div style={{ padding: "10px" }}>
        <div style={{ fontWeight: "500", fontSize: "14px" }}>
          {props.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ
        </div>
      </div>
    </div>
  );
};

export default ItemCartInPayment;
