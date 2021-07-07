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
import background from "../Images/background.jpg"

const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      backgroundColor: "#f2f2f2 !important",
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
      props.history.push("/login");
      toastMessage(t("Toast_Message.1"));
    }
  };

  const classes = useStyles();
  return (
    <div
    style={{ height: "100%",width:'100%', backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover',  backgroundImage: `url(${background})`,display:'flex',justifyContent:'flex-end' }}
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
                borderRadius: "5px",
                marginTop: "0.4em",
                marginRight: "1px",
                padding: "4px",
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
              marginBottom: "0px",
            }}
          ></div>
          <Button
            type="primary"
            size="large"
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              background:"#49654e",
              color:"#fff"
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
