import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "./../../actions/authAction";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "./../common/DialogResetPassWord";
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import { Button } from "antd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      backgroundColor: "#ffe6d1 !important",
      cursor: "pointer",
    },
  },
}));
const ForgetPasswordPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [email, setEmailState] = useState("");
  const [code, setCode] = useState("");
  const handleEmailInputChange = (e) => {
    setEmailState(e.target.value);
  };
  const classes = useStyles();
  const changeFlag = (value) => {
    setFlag(value);
  };
  const handleSubmitSend = async (e) => {
    dispatch(authActions.sendCodeResetPassWord(email, changeFlag));
  };
  const handleSubmitConfirm =  () => {
    const userData = { email, code };
    console.log(userData)
     dispatch(
      authActions.confirmCodeReset(userData, props.history)
    );
  };
  const handleCodeInputChange = (e) => {
    setCode(e.target.value);
  };
  return (
    <div
      style={{ backgroundColor: "#f2f2f2", height: "100%" }}
      className="signin-signup"
    >
      <form>
        <div className="loginForm">
          <div style={{ display: "flex" }}>
            <ArrowBackIcon
              onClick={() => props.history.push("/user_page")}
              className={classes.icon}
              style={{
                backgroundColor: "#f2f2f2",
                borderRadius: "5px",
                marginTop: "0.2em",
                marginRight: "0.2em",
                padding: "5px",
                width: "40px",
                fontSize: "25px",
              }}
            />
            <h3 style={{ fontWeight: "600" }}>Quên mật khẩu</h3>
          </div>
          <label style={{ fontSize: "12px", fontWeight: "600" }}>Email</label>
          <Input
            style={{
              borderRadius: "3px",
              width: "300px",
              marginBottom: "10px",
            }}
            type="text"
            onChange={handleEmailInputChange}
            placeholder="Nhập email"
          />
          {flag === true ? (
            <div style={{display:'flex',flexDirection:'column'}}>
              <label style={{ fontSize: "12px", fontWeight: "600" }}>
                Code
              </label>
              <Input
                style={{
                  borderRadius: "3px",
                  width: "300px",
                  marginBottom: "10px",
                }}
                type="text"
                onChange={handleCodeInputChange}
                placeholder="Nhập mã xác thực"
              />
            </div>
          ) : null}
          {flag === false ? (
            <Button
              style={{ marginBottom: "15px" }}
              type="primary"
              size="large"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={handleSubmitSend}
            >
              Gửi mã xác nhận
            </Button>
          ) : (
            <Button
              style={{ marginBottom: "15px" }}
              type="primary"
              size="large"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={handleSubmitConfirm}
            >
              Xác nhận
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
export default withRouter(ForgetPasswordPage);
