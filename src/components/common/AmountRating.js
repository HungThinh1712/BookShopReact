import React from "react";
import Rating from "@material-ui/lab/Rating";
const AmountRating = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        marginBottom: "5px",
      }}
    >
      <Rating size="small" value={props.value} readOnly></Rating>
      <div style={{ width: "20vw" }}>
        <div className="progress" style={{ height: "8px", marginLeft: "5px" }}>
          <div
            className="progress-bar progress-bar-success"
            role="progressbar"
            style={{
              width: `${(props.amount / props.sumAmountRate) * 100}%`,
              backgroundColor: "#114b5f",
            }}
          ></div>
        </div>
      </div>
      <div style={{ marginLeft: "10px", marginTop: "-4px" }}>
        {props.amount}
      </div>
    </div>
  );
};

export default AmountRating;
