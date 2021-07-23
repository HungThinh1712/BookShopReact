import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "./../../actions/authAction";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { Input } from "antd";
import { Button } from "antd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import background1 from "../Images/background.jpg";
import FacebookIcon from "@material-ui/icons/Facebook";
import { GoogleOutlined, FaceBookOutlined } from "@ant-design/icons";
const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      backgroundColor: "#f2f2f2 !important",
      cursor: "pointer",
    },
  },
}));
const SignIn = (props) => {
  const dispatch = useDispatch();

  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const cartItems = useSelector((state) =>
    state.cart.items ? state.cart : []
  );
  const cartItemData = Object.values(cartItems.items);
  const handleEmailInputChange = (e) => {
    setEmailState(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPasswordState(e.target.value);
  };

  const handleSubmit = async (e) => {
    const text = { email, password };
    await dispatch(authActions.loginUser(text, props.history, cartItemData));
  };

  const responseFacebook = (response) => {
    if (response.accessToken) {
      fetch(
        "https://graph.facebook.com/v2.5/me?fields=email,name&access_token=" +
          response.accessToken
      )
        .then((response) => response.json())
        .then((json) => {
          // Some user object has been set up somewhere, build that user here
          dispatch(
            authActions.loginUserFacebook(
              json.email,
              json.name,
              cartItemData,
              props.history
            )
          );
        });
    } else {
    }
  };
  const responseGoogle = (response) => {
    console.log(response);
    dispatch(
      authActions.loginUserFacebook(
        response.profileObj.email,
        response.profileObj.name,
        cartItemData,
        props.history
      )
    );
  };
  const classes = useStyles();
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(https://i.imgur.com/R98y0u7.png)`,
        display: "flex",
        justifyContent: "flex-end",
      }}
      className="signin-signup"
    >
      <form>
        <div
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="loginForm"
        >
          {/* <img  style={{width:'70px',height:'80px'}} src={Logo} alt=""/> */}
          <div style={{ display: "flex" }}>
            <ArrowBackIcon
              onClick={() => props.history.push("/")}
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
            <h2 style={{ fontWeight: "600" }}>Đăng nhập</h2>
          </div>
          <label style={{ fontSize: "12px", fontWeight: "600" }}>Email</label>
          <Input
            style={{
              borderRadius: "5px",
              width: "300px",
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
            style={{ borderRadius: "5px", marginBottom: "10px" }}
            type="password"
            onChange={handlePasswordInputChange}
            placeholder="Nhập mật khẩu"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div
              className={classes.icon}
              onClick={() => props.history.push("/forget_password")}
              style={{
                color: "#49654e",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "5px",
              }}
            >
              Quên mật khẩu
            </div>
            <div
              className={classes.icon}
              style={{
                color: "#49654e",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "5px",
              }}
              onClick={() => props.history.push("/register")}
            >
              Đăng ký
            </div>
          </div>
          <Button
            style={{ marginBottom: "10px" }}
            size="large"
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
              background: "#253528",
              color: "White",
            }}
            onClick={handleSubmit}
          >
            Truy cập
          </Button>

          <div className="social-media" style={{ marginTop: "10px" }}>
            <div
              style={{
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="social-icon"
            >
              <FacebookLogin
                appId="513590556436339"
                callback={responseFacebook}
                render={(renderProps) => (
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={renderProps.onClick}
                  >
                    <FacebookIcon />
                  </div>
                )}
                icon="fa-facebook"
              />
            </div>
            <div
              style={{
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="social-icon"
            >
              <GoogleLogin
                clientId="466677084136-koq86l9ktvvdolnitinanfcv1men5te2.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                render={(renderProps) => (
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={renderProps.onClick}
                  >
                    <GoogleOutlined />
                  </div>
                )}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default withRouter(SignIn);
