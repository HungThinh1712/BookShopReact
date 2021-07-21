import React, { useState } from "react";
import Logo from "./../Images/logo_hcmute.png";
import SexCheckBox from "./../common/SexCheckBok";
import { useDispatch } from "react-redux";
import { toastMessage } from "../common/ToastHelper";
import * as authActions from "../../actions/authAction";
import { makeStyles } from "@material-ui/core/styles";

import { useTranslation } from "react-i18next";
import { Input } from "antd";
import { Button } from "antd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { DatePicker } from "antd";
import background from "../Images/background.jpg";
const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      backgroundColor: "#f2f2f2 !important",
      cursor: "pointer",
    },
  },
}));
const RegisterPage = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [sex, setSex] = useState(1);
  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameInputChange = (e) => {
    setFullName(e.target.value);
  };

  const handlePhoneInputChange = (e) => {
    setPhone(e.target.value);
  };
  const handleBirthDayInputChange = (e) => {
    setBirthDay(e);
  };

  const handleConfirmPasswordInputChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSexInputChange = (e) => {
    setSex(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (confirmPassword !== password) toastMessage(t("Toast_Message.9"));
    else if (birthDay === "") toastMessage(t("Toast_Message.14"));
    else {
      const userData = { email, password, fullName, phone, birthDay, sex };
      await dispatch(authActions.registerUser(userData, props.history));
    }
  };
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${background})`,
        display: "flex",
        justifyContent: "flex-end",
      }}
      className="signin-signup"
    >
      <form className="sign-up-form">
        <div className="loginForm">
          <div style={{ display: "flex" }}>
            <ArrowBackIcon
              onClick={() => props.history.push("/login")}
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
            <h2 style={{ fontWeight: "600" }}>Đăng ký</h2>
          </div>
          <label style={{ fontSize: "12px", fontWeight: "600" }}>
            Họ và tên
          </label>
          <Input
            style={{
              borderRadius: "5px",
              width: "400px",
              marginBottom: "10px",
            }}
            type="text"
            onChange={handleNameInputChange}
            placeholder="Nhập họ và tên"
          />
          <label style={{ fontSize: "12px", fontWeight: "600" }}>Email</label>
          <Input
            style={{
              borderRadius: "5px",
              width: "400px",
              marginBottom: "10px",
            }}
            type="text"
            onChange={handleEmailInputChange}
            placeholder="Nhập email"
          />
          <label style={{ fontSize: "12px", fontWeight: "600" }}>
            Mật khẩu
          </label>
          <Input
            style={{
              borderRadius: "5px",
              width: "400px",
              marginBottom: "10px",
            }}
            type="password"
            onChange={handlePasswordInputChange}
            placeholder="Nhập mật khẩu"
          />
          <label style={{ fontSize: "12px", fontWeight: "600" }}>
            Xác nhận mật khẩu
          </label>
          <Input
            style={{
              borderRadius: "5px",
              width: "400px",
              marginBottom: "10px",
            }}
            type="password"
            onChange={handleConfirmPasswordInputChange}
            placeholder="Xác nhận mật khẩu"
          />
          <label style={{ fontSize: "12px", fontWeight: "600" }}>
            Số điện thoại
          </label>
          <Input
            style={{
              borderRadius: "5px",
              width: "400px",
              marginBottom: "10px",
            }}
            type="text"
            onChange={handlePhoneInputChange}
            placeholder="Nhập số điện thoai"
          />
          <label style={{ fontSize: "12px", fontWeight: "600" }}>
            Ngày sinh
          </label>
          <DatePicker
            style={{
              borderRadius: "5px",
              width: "400px",
              marginBottom: "10px",
            }}
            type="text"
            onChange={handleBirthDayInputChange}
            placeholder="Nhập ngày sinh"
          />
          <div style={{ marginBottom: "10px" }}>
            <SexCheckBox value={sex} onChange={handleSexInputChange} />
          </div>
          <div style={{ marginBottom: "10px", width: "400px" }}>
            <Button
              type="primary"
              size="large"
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                borderRadius: "5px",
                background: "#49654e",
                color: "#fff",
              }}
              onClick={handleSubmit}
            >
              Tạo tại khoản
            </Button>
          </div>
          <div
            style={{
              color: "#49654e",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={() => props.history.push("/login")}
          >
            <span>{t("Customer_Management.44")}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
