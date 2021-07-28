import React, { useState } from "react";
import Nav from "../common/UserPageNav";
import Header from "../common/Header";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../common/Footer";
import SexCheckBox from "../common/SexCheckBok";
import { Checkbox } from "antd";
import PersonIcon from "@material-ui/icons/Person";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "./../../actions/authAction";
import { toastMessage } from "./../common/ToastHelper";
import { useTranslation } from "react-i18next";
import MessengerChat from "../common/MessengerCustomerChat";
import { SaveFilled } from "@ant-design/icons";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LockIcon from "@material-ui/icons/Lock";
import { Tooltip } from "antd";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginTop: "80px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "87px",
      marginTop: "120px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginTop: "80px",
    },
  },
}));
const ProfileUserPage = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const onChangeChecked = (e) => {
    setChecked(e.target.checked);
  };
  const userData = useSelector((state) =>
    state.auth.userData ? state.auth.userData : null
  );
  const id = userData ? userData.id : null;
  const [name, setName] = useState(
    userData && userData.fullName ? userData.fullName : ""
  );
  const [phone, setPhone] = useState(
    userData && userData.phone ? userData.phone : ""
  );
  const [birthday, setBirthday] = useState(
    userData && userData.birthDay ? userData.birthDay : null
  );
  const [email, setEmail] = useState(
    userData && userData.email ? userData.email : ""
  );
  const [sex, setSex] = useState(userData && userData.sex ? userData.sex : 1);
  const [oldPassword, setOldPassWord] = useState("");
  const [newPassword, setNewPassWord] = useState("");
  const [confirmPassword, setConfirmPassWord] = useState("");

  const handleButtonClick = async () => {
    if (checked === false) {
      const userData = { id, name, phone, birthday, sex };
      const now = new Date();

      if (birthday === "" || new Date(birthday) >= now) {
        toastMessage("Ngày sinh không hợp lệ");
      } else if (name === "") {
        toastMessage("Tên không hợp lệ");
      } else if (phone === "") {
        toastMessage("Số điện thoại không hợp lệ");
      } else {
        await dispatch(authActions.updateProfileUser(userData));
        toastMessage("Cập nhật thành công");
      }
    } else {
      if (oldPassword === "" || newPassword === "" || confirmPassword === "")
        toastMessage("Mật khẩu không được để trống");
      else if (newPassword !== confirmPassword)
        toastMessage("Mật khẩu không trùng nhau");
      else {
        const userData = {
          id,
          name,
          phone,
          birthday,
          sex,
          oldPassword,
          newPassword,
        };
        await dispatch(authActions.updateProfileUserWithPassWord(userData));

        setChecked(false);
      }
    }
  };
  const handleBirthdayInputChange = (e) => {
    setBirthday(e.target.value);
  };
  const handleNameInputChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneInputChange = (e) => {
    setPhone(e.target.value);
  };
  const handleSexInputChange = (e) => {
    setSex(e.target.value);
  };
  const handleOldPassWordInputChange = (e) => {
    setOldPassWord(e.target.value);
  };
  const handleNewPassWordInputChange = (e) => {
    setNewPassWord(e.target.value);
  };
  const handleConfirmPassWordInputChange = (e) => {
    setConfirmPassWord(e.target.value);
  };

  return (
    <div style={{ backgroundColor: "#EDECE7" }}>
      <div>
        <MessengerChat />
        <Header />
        <div
          style={{
            paddingTop: "100px",
            marginLeft: "85px",
            marginBottom: "-100px",
          }}
        ></div>
        <div className={`${classes.container}`}>
          <div style={{ display: "flex" }}>
            <Nav
              imgSrc={userData ? userData.imgUrl : ""}
              className={classes.nav}
              name={name}
              props={props}
            />
            <div className="col-xs-7 col-sm-8 ">
              <div style={{ borderRadius: "5px" }} className="profile-content">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ fontSize: "25px", fontWeight: 500 }}>
                    {t("Customer_Management.1")}
                  </p>
                  <Tooltip title="Lưu thông tin" placement="topLeft">
                    {" "}
                    <SaveFilled
                      onClick={handleButtonClick}
                      style={{
                        fontSize: "30px",
                        paddingRight: "250px",
                        paddingBottom: "20px",
                        color: "#114b5f",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </div>
                <div className="input-field-userpage">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon />
                  </div>
                  <input
                    value={name}
                    onChange={handleNameInputChange}
                    type="text"
                    placeholder={t("Customer_Management.25")}
                  />
                </div>
                <div className="sex">
                  <SexCheckBox value={sex} onChange={handleSexInputChange} />
                </div>
                <div className="input-field-userpage">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <EmailIcon />
                  </div>
                  <input
                    value={email}
                    disabled
                    type="email"
                    placeholder="Email"
                  />
                </div>

                <div className="input-field-userpage">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PhoneIcon />
                  </div>
                  <input
                    value={phone}
                    onChange={handlePhoneInputChange}
                    type="text"
                    placeholder={t("Customer_Management.26")}
                  />
                </div>
                <div className="input-field-userpage">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <DateRangeIcon />
                  </div>
                  <input
                    value={birthday === "0001-01-01" ? null : birthday}
                    onChange={handleBirthdayInputChange}
                    type="date"
                    placeholder={t("Customer_Management.27")}
                  />
                </div>
                <div className="sex">
                  <Checkbox checked={checked} onChange={onChangeChecked}>
                    <span style={{ paddingLeft: "8px" }}>
                      {t("Customer_Management.6")}
                    </span>
                  </Checkbox>
                </div>
                {checked ? (
                  <div>
                    <div className="input-field-userpage">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <LockIcon />
                      </div>
                      <input
                        type="password"
                        onChange={handleOldPassWordInputChange}
                        placeholder={t("Customer_Management.28")}
                      />
                    </div>
                    <div className="input-field-userpage">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <LockIcon />
                      </div>
                      <input
                        type="password"
                        onChange={handleNewPassWordInputChange}
                        placeholder={t("Customer_Management.29")}
                      />
                    </div>
                    <div className="input-field-userpage">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <LockIcon />
                      </div>
                      <input
                        type="password"
                        onChange={handleConfirmPassWordInputChange}
                        placeholder={t("Customer_Management.30")}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "200px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default withRouter(ProfileUserPage);
