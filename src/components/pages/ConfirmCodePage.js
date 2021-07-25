import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../actions/authAction";
import { useTranslation } from "react-i18next";
import MailIcon from "@material-ui/icons/Mail";
import CheckIcon from "@material-ui/icons/Check";
const ConfirmCodePage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const email = props.history.location.state.email;
  const [code, setCode] = useState("");
  const cartItems = useSelector((state) =>
    state.cart.items ? state.cart : []
  );
  const cartItemData = Object.values(cartItems.items);

  const handleCodeInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    const userData = { email, code };

    await dispatch(
      authActions.confirmCode(userData, cartItemData, props.history)
    );
  };
  const handleResent = () => {
    dispatch(authActions.sendCodeActive(email));
  };
  return (
    <div className="confirm-code">
      <form className="sign-in-form">
        <h2 className="title">{t("Customer_Management.35")}</h2>
        <div className="input-field-login">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0",
            }}
          >
            <MailIcon />
          </div>
          <input type="text" placeholder="Email" value={email} readOnly></input>
        </div>
        <div className="input-field-login">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0",
            }}
          >
            <CheckIcon />
          </div>
          <input
            type="text"
            onChange={handleCodeInputChange}
            placeholder="Mã xác nhận"
          />
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
          className="btn-loginpage solid"
          onClick={handleSubmit}
        >
          {t("Customer_Management.36")}
        </div>
        <div
          onClick={handleResent}
          style={{ color: "blueviolet", cursor: "pointer" }}
        >
          {t("Customer_Management.37")}
        </div>
      </form>
    </div>
  );
};

export default ConfirmCodePage;
