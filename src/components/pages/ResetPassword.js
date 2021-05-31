import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "./../../actions/authAction";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { toastMessage } from "../common/ToastHelper";
import { Input } from "antd";
import { Button } from "antd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useTranslation } from "react-i18next";
import * as authAction from "../../actions/authAction";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      backgroundColor: "#ffe6d1 !important",
      cursor: "pointer",
    },
  },
}));
const SignIn = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassWord] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassWord(e.target.value);
  };

  const handleSubmit = () => {
    const email = props.history.location.state.email;
    const userData = { email, password };
    if (password === "" || confirmPassword === "") {
      toastMessage(t("Toast_Message.8"));
    } else if (password != confirmPassword) {
      toastMessage(t("Toast_Message.9"));
    } else {
      dispatch(authAction.changePassword(userData, props.history));
      props.history.push("/user_page");
      toastMessage(t("Toast_Message.1"));
    }
  };

  const classes = useStyles();
  return (
    <div
      style={{ backgroundColor: "#f2f2f2", height: "100%" }}
      className="signin-signup"
    >
      <form>
        <div className="loginForm">
          {/* <img  style={{width:'70px',height:'80px'}} src={Logo} alt=""/> */}
          <div style={{ display: "flex" }}>
            <ArrowBackIcon
              onClick={() => props.history.push("/forget_password")}
              className={classes.icon}
              style={{
                backgroundColor: "#f2f2f2",
                borderRadius: "5px",
                marginTop: "0.2em",
                marginRight: "0.2em",
                padding: "5px",
                width: "40px",
                fontSize: "30px",
              }}
            />
            <h3 style={{ fontWeight: "600" }}>Cập nhật mật khẩu</h3>
          </div>
          <label style={{ fontSize: "12px", fontWeight: "600" }}>
            Mật khẩu mới
          </label>
          <Input
            style={{
              borderRadius: "3px",
              width: "300px",
              marginBottom: "10px",
            }}
            type="password"
            onChange={handlePasswordChange}
            placeholder="Nhập mật khẩu"
          />
          <label style={{ fontSize: "12px", fontWeight: "600" }}>
            Xác nhận mật khẩu
          </label>
          <Input
            style={{
              borderRadius: "3px",
              marginBottom: "15px",
              width: "300px",
            }}
            type="password"
            onChange={handleConfirmPasswordChange}
            placeholder="Nhập mật khẩu"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          ></div>
          <Button
            type="primary"
            size="large"
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={handleSubmit}
          >
            Thay đổi mật khẩu
          </Button>
        </div>
      </form>
    </div>
  );
};
export default withRouter(SignIn);
