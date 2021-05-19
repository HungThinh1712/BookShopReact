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
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
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
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
    },
  },
  author: {
    marginLeft: "30px",
    marginTop: "16px",
    fontSize: "14px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
    },
  },
  delete_link: {
    marginLeft: "30px",
    marginTop: "18px",
    fontSize: "14px",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
    },
  },
  btn_group: {
    marginTop: "1.5em",
    marginLeft: "50px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
    },
  },
}));

const IteminCart = (props) => {
  const userId = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")).id
    : null;
  const [amount, setAmount] = useState(props.amount);
  const dispatch = useDispatch();
  const handleDecrease = () => {
    if (amount - 1 > 0) {
      setAmount(amount - 1);
    }
    if (userId !== null) {
      dispatch(
        cartActions.updateAmountBookCurrentUser_Server(props.bookId, amount - 1)
      );
    } else {
      dispatch(
        cartActions.updateAmountBookCurrentUser_Local(props, amount - 1)
      );
    }
  };
  const handleIncrease = () => {
    setAmount(amount + 1);

    if (userId !== null) {
      dispatch(
        cartActions.updateAmountBookCurrentUser_Server(props.bookId, amount + 1)
      );
    } else {
      dispatch(
        cartActions.updateAmountBookCurrentUser_Local(props, amount + 1)
      );
    }
  };

  const handleDeleteButtonClick = () => {
    props.deleteItem();

    if (userId != null) {
      dispatch(cartActions.deleteIntemInCartofCurrentUser(props.bookId));
    }
  };

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
          <span className={classes.author}>Tác giả: {props.authorName}</span>
          <Link
            className={classes.delete_link}
            onClick={handleDeleteButtonClick}
          >
            Xóa
          </Link>
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
            {props.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ
          </span>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span style={{ marginTop: "6px", fontSize: "14px" }}>
              <s>
                {props.coverPrice
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ
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
            <Button style={{ borderColor: "blue" }} onClick={handleDecrease}>
              -
            </Button>
            <Button style={{ borderColor: "blue", fontWeight: 900 }} disabled>
              {amount}
            </Button>
            <Button style={{ borderColor: "blue" }} onClick={handleIncrease}>
              +
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default IteminCart;
