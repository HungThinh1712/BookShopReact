import React, { useEffect, useState } from "react";
import HeaderInPayment from "../common/HeaderInPayment";
import PaymentMethod from "../common/PaymentMethod";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import * as CallApis from "../../constants/Apis";

const useStyles = makeStyles((theme) => ({
  address_zone: {
    display: "inline-block",
    [theme.breakpoints.up("lg")]: {
      marginLeft: "40px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "40px",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  wraper: {
    [theme.breakpoints.up("sm")]: {
      marginRight: "0px",

      marginLeft: "20px",
      marginTop: "20px",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      marginLeft: "250px",
      marginTop: "20px",
      marginRight: "350px",
    },

    [theme.breakpoints.down("xs")]: {
      display: "flex",
      marginLeft: "0px",
      marginTop: "20px",
    },
  },
  title: {
    display: "inline-block",
    [theme.breakpoints.up("sm")]: {
      marginRight: "0px",
      marginLeft: "20px",
      fontWeight: "700",
      marginTop: "20px",
      fontSize: "30px",
      color: "#49654E",
    },
    [theme.breakpoints.up("lg")]: {
      fontWeight: "700",
      marginLeft: "250px",
      marginTop: "20px",
      fontSize: "30px",
      color: "#49654E",
    },

    [theme.breakpoints.down("xs")]: {
      marginRight: "0px",
      marginLeft: "0px",
      fontWeight: "700",
      marginTop: "20px",
      fontSize: "30px",
      color: "#49654E",
    },
  },
}));

const PaymentPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector((state) =>
    state.auth.userData ? state.auth.userData : null
  );
  const classes = useStyles();
  const [distanceAndFee, setDistanceAndFee] = useState(null);
  useEffect(() => {
    const url = CallApis.API_URL.concat(`/Distance`);
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setDistanceAndFee(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  return (
    <div style={{ backgroundColor: "#EDECE7", paddingBottom: "175px" }}>
      <HeaderInPayment step={2} />
      <div className={classes.title}>3. Thanh toán và đặt hàng</div>
      <div className={classes.wraper}>
        <PaymentMethod />
      </div>
    </div>
  );
};

export default withRouter(PaymentPage);
