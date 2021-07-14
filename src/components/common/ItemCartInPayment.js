import React from "react";

const ItemCartInPayment = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", padding: "5px" }}>
        <img
          style={{ width: "70px", height: "70px" }}
          src={props.imageSrc}
          alt="product "
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontWeight: "600",
              fontSize: "14px",
              color: "#253528",
            }}
          >
            {props.title}
          </span>
          <span
            style={{
              opacity: "0.7",
              fontSize: "12px",
              color: "#253528",
            }}
          >
            Số lượng: {props.amount}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: "15px",
        }}
      >
        <span
          style={{
            fontWeight: "700",
            fontSize: "17px",
            color: "#253528",
          }}
        >
          {props.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ
        </span>
      </div>
    </div>
  );
};

export default ItemCartInPayment;
