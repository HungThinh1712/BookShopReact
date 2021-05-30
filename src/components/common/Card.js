import React from "react";
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    "&:hover": {
      boxShadow:
        "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",

      cursor: "pointer",
    },
  },
}));

const Card = (props) => {
  const classes = useStyles();
  return (
    <div
      onClick={props.onClick}
      className={`card_container ${classes.container} `}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{ position: "relative" }}
          className="card_image"
          src={props.imageSrc}
          alt="product "
          width={"100%"}
        />
        <div
          style={{
            borderRadius: "22px",
            backgroundColor: "#F7941E",
            width: "44px",
            height: "44px",
            position: "absolute",
            marginLeft: "150px",
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#fff",
              display: "inline-block",
              fontWeight: "bold",
              fontSize: "1.1em",
              marginTop: "8px",
            }}
          >
            {props.discount}%
          </span>
        </div>
      </div>

      <Grid
        container
        style={{ height: "50px", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        <span className="card_title">{props.title}</span>
      </Grid>
      <p style={{ marginBottom: 0 }}>
        <span
          style={{
            fontWeight: "900",
            color: "red",
            fontSize: "20px",
            fontFamily: "Roboto",
          }}
        >
          {props.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ
        </span>
      </p>
      <p className="card_price">
        <s>
          {props.coverPrice
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
        </s>
        đ
      </p>
      <div style={{ display: "flex" }}>
        <div>
          <Rating
            size="small"
            style={{ paddingTop: "2px" }}
            defaultValue={0}
            value={props.valueraiting}
            precision={0.5}
            readOnly
          />
        </div>
        <span style={{ marginBottom: "100px", color: "red", fontSize: "15px" }}>
          (0)
        </span>
      </div>
    </div>
  );
};
export default Card;
