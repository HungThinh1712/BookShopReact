import React, { useState } from "react";

import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import * as cartActions from "./../../actions/cartAction";

const useStyles = makeStyles((theme) => ({
  item: {
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      marginLeft: "20px",
      marginTop: "20px",
    },
    [theme.breakpoints.down("lg")]: {
      display: "flex",
      marginLeft: "20px",
      marginTop: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginLeft: "0px",
    },
  },
  flex: {
    flexGrow: "0.9",
  },
  title: {
    marginLeft: "30px",
    marginTop: "10px",
    fontSize: "18px",
    fontWeight: "900",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  author: {
    marginLeft: "30px",
    marginTop: "16px",
    fontSize: "14px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  delete_link: {
    marginLeft: "30px",
    marginTop: "18px",
    fontSize: "14px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  btn_group: {
    marginTop: "1.5em",
    marginLeft: "40px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
}));

const ItemInOrderDetails = (props) => {
  const classes = useStyles();
  return (
    <div style={{ border: "none" }}>
      <div className={classes.item}>
        <div
          style={{
            height: "8em",
            width: "7em",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            marginBottom: "12px",
          }}
        >
          <img
            className="card_image"
            src={props.imageSrc}
            alt="product "
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className={classes.title}>{props.name}</span>
          {props.authorName ? (
            <span className={classes.author}>Tác giả: {props.authorName}</span>
          ) : null}
        </div>
        <div className={classes.flex}></div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              marginTop: "10px",
              fontSize: "18px",
              fontWeight: "800",
              color: "red",
            }}
          >
            {props.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
            đ
          </span>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span style={{ marginTop: "6px", fontSize: "14px" }}>
              <s>
                {props.coverPrice
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}{" "}
                đ
              </s>
            </span>
            <span
              style={{
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "10px",
              }}
            >
              {props.discount}%
            </span>
          </div>
        </div>
        <div className={classes.btn_group}>
          <ButtonGroup
            size="small"
            color="primary"
            aria-label="outlined secondary button group"
          >
            <Button style={{ borderColor: "blue" }}>-</Button>
            <Button style={{ borderColor: "blue", fontWeight: 900 }} disabled>
              {props.amount}
            </Button>
            <Button style={{ borderColor: "blue" }}>+</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default ItemInOrderDetails;
