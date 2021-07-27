import React from "react";
import IteminCart from "../common/IteminCart";
import Header from "../common/Header";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { useDispatch } from "react-redux";
import * as cartActions from "../../actions/cartAction";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { toastMessage } from "../common/ToastHelper";
import { useTranslation } from "react-i18next";
import Footer from "../common/Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "120px",
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "87px",
      marginTop: "120px",
      width: "72%",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "80px",
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "80px",
      width: "100%",
    },
  },

  total: {
    display: "flex",
    flexDirection: "column",
    marginTop: "120px",
    marginLeft: "10px",
    width: "250px",
    height: "130px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "5px",
      marginLeft: "0px",
      width: "100%",
    },
  },
  flex_div: {
    display: "flex",
    backgroundColor: "9fe6a0",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  button_order: {
    marginLeft: "10px",
    marginTop: "5px",
    width: "250px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2px",
      marginLeft: "0px",
      width: "100%",
    },
  },
}));

const ShoppingCartPage = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) =>
    state.cart.items ? state.cart : []
  );
  const userData = useSelector((state) =>
    state.auth.userData ? state.auth.userData : null
  );

  const showCartItems = Object.values(cartItems.items).map((cartItem) => (
    <div>
      <IteminCart
        key={cartItem.bookId}
        title={cartItem.name}
        price={cartItem.price}
        coverPrice={cartItem.coverPrice}
        discount={Math.ceil(
          ((cartItem.coverPrice - cartItem.price) / cartItem.coverPrice) * 100
        )}
        amount={cartItem.amount}
        imageSrc={cartItem.imageSrc}
        bookId={cartItem.bookId}
        authorName={cartItem.authorName}
        deleteItem={() => {
          dispatch(cartActions.deleteFromCart(cartItem.bookId));
        }}
      />
      {Object.values(cartItems.items).length > 1 ? <Divider /> : null}
    </div>
  ));
  const GetTotalMoney = Object.values(cartItems.items).reduce(
    (totalMoney, cartItem) => totalMoney + cartItem.amount * cartItem.price,
    0
  );
  const handleClick = () => {
    dispatch(cartActions.updateBookAmount(props.history));
  };
  return (
    <div>
      <Header></Header>
      {Object.values(cartItems.items).length > 0 ? (
        <div className={classes.flex_div}>
          <Paper
            style={{ marginBottom: "200px" }}
            className={classes.container}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {showCartItems}
          </Paper>
          <div>
            <Paper className={classes.total}>
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <h6>{t("Customer_Shopping_Payment.3")}: </h6>
                <div style={{ flexGrow: "1" }} />
                <h6>
                  {GetTotalMoney.toString().replace(
                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                    "$1."
                  )}
                  đ
                </h6>
              </div>
              <Divider />
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <h6>{t("Customer_Shopping_Payment.4")}: </h6>
                <div style={{ flexGrow: "1" }} />
                <h6>
                  {GetTotalMoney.toString().replace(
                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                    "$1."
                  )}
                  đ
                </h6>
              </div>
            </Paper>
            <Button
              className={classes.button_order}
              variant="contained"
              style={{
                backgroundColor: "#1a936f",
                color: "#fff",
                fontWeight: "600",
              }}
              onClick={handleClick}
            >
              {t("Customer_Shopping_Payment.5")}
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "#EDECE7",
            paddingTop: "200px",
          }}
        >
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body cart">
                    <div className="col-sm-12 empty-cart-cls text-center">
                      {" "}
                      <img
                        alt="Giỏ hàng"
                        src="https://i.pinimg.com/originals/c6/0f/ea/c60fea3ac3aab2e82c2f7ea901ef55f6.jpg?fbclid=IwAR1nrsHtpUGScp40zEzmSxUzNT1X5-h3uT92t64Hq7nzF3Rxpfo86f9qt9k"
                        width="200"
                        height="200"
                        className="img-fluid mb-4 mr-3"
                      />
                      <h3>
                        <strong>{t("Customer_Shopping_Payment.19")}</strong>
                      </h3>
                      <h4>{t("Customer_Shopping_Payment.20")}</h4>{" "}
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#1a936f",
                          color: "#fff",
                          fontWeight: "600",
                        }}
                        onClick={() => props.history.push("/")}
                      >
                        {t("Customer_Shopping_Payment.18")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginTop: "300px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default ShoppingCartPage;
