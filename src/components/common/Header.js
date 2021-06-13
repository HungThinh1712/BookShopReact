import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Logo from "./../Images/logo.png";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as cartAction from "./../../actions/cartAction";
import SnackBar from "../common/SnackBarLoginSuccess";
import NotificationItem from "../common/NotificationItem";
import * as notificationActions from "../../actions/notificationAction";
import { HubConnectionBuilder } from "@microsoft/signalr";
import * as CallApis from "../../constants/Apis";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import * as authActions from "./../../actions/authAction";
import * as cartActions from "./../../actions/cartAction";
import { useTranslation } from "react-i18next";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#114b5f",
  },
  toolBar: {
    [theme.breakpoints.up("sm")]: {
      marginRight: "0px",
      marginLeft: "0px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "80px",
      marginRight: "50px",
    },

    [theme.breakpoints.down("xs")]: {
      marginRight: "0px",
      marginLeft: "0px",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    textTransform: "uppercase",
    color:'white',
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontSize: "40px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "Righteous",
  },
  logo: {
    width:"7%",
    cursor: "pointer",
  },
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "50%",
    backgroundColor: "white",
    borderRadius: theme.shape.borderRadius,
    height: "35px",
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      width: "80ch",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    pointerEvents: "none",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  inputRoot: {
    color: "black",
    marginLeft: "10px",
    flex: 26,
    [theme.breakpoints.up("sm")]: {
      width: "80ch",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  menuIcon: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
      marginLeft: "87px",
      marginTop: "100px",
    },
    [theme.breakpoints.down("xs")]: {
      display: "inline-block",
      border: "none",
      outlineStyle: "none",
    },
  },
}));

const PrimarySearchAppBar = (props) => {
  const { t, i18n } = useTranslation();
  function handleClick_ChangeLang(lang) {
    i18n.changeLanguage(lang);
  }
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const cartAmount = useSelector((state) =>
    state.cart.items ? Object.keys(state.cart.items).length : null
  );
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const userId = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")).id
    : null;
  const userData = useSelector((state) =>
    state.auth.userData ? state.auth.userData : null
  );
  const userName = useSelector((state) =>
    state.auth.userData ? state.auth.userData.fullName : null
  );
  //Get first name
  var split = userName ? userName.split(" ") : "";
  const displayName =
    split.length >= 2
      ? split[split.length - 2] + " " + split[split.length - 1]
      : split[split.length - 1];
  
  const [searchString, setSearchString] = useState(
    props.searchString ? props.searchString : ""
  );
  const handleSearchStringChange = (e) => {
    setSearchString(e.target.value);
  };
  const handleSearchClick = () => {
    props.history.push(`/search/${searchString}`);
  };
  useEffect(() => {
    const fetchUser = () => {
      if (userId != null) {
        dispatch(cartAction.getCartByUserIdRequest());
      }
    };
    fetchUser();
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchNotification = () => {
      if (userId != null) {
        dispatch(notificationActions.getNotificationsRequest(userId));
      }
    };
    fetchNotification();
  }, [dispatch, userId]);

  //Connection to socket
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const url = CallApis.API_URL.concat(`/hubs/notification`);
    const newConnection = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          connection.on("ReceiveMessage", (message) => {
            if (message !== null && message.userId === userId) {
              dispatch(notificationActions.getNotificationsRequest(userId));
            }
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection, userId, dispatch]);

  const sendMessage = async (id) => {
    try {
      const url = CallApis.API_URL.concat(
        `/Notification/ChangeStatus?id=${id}`
      );
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (userData.isAdmin === false) {
        props.history.push("/order_history");
      } else if (userData.isAdmin === true) {
        props.history.push("/admin/ordermanagement_page");
      }
    } catch (e) {
      console.log("Sending message failed.", e);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const url = CallApis.API_URL.concat(`/Notification/DeleteNoti?id=${id}`);
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log("Sending message failed.", e);
    }
  };

  const notifications = useSelector((state) =>
    state.notifications.notifications.length > 0
      ? state.notifications.notifications
      : []
  );

  const showNotifications = notifications.map((notification, index) => (
    <NotificationItem
      title={notification.title}
      content={notification.content}
      timeAgo={notification.timeAgo}
      orderId={notification.orderId}
      imgSrc={notification.imgUrl}
      onClick={() => sendMessage(notification.id)}
      onDelete={() => deleteMessage(notification.id)}
      status={notification.status}
    ></NotificationItem>
  ));

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [opacity, setOpacity] = useState("none");
  const bellIconClick = () => {
    if (userId !== null) {
      dispatch(notificationActions.getNotificationsRequest(userId));
    }
    if (opacity === "none") setOpacity("");
    else setOpacity("none");
  };
  const handleClickHomePage = () => {
    console.log(userData);
    if (userData && userData.isAdmin === false) {
      props.history.push("/");
    } else if (userData && userData.isAdmin === true) {
      props.history.push("/admin");
    } else {
      props.history.push("/");
    }
  };
  const handleLogoutClick = () => {
    dispatch(authActions.logOut());
    dispatch(cartActions.clearStateCart());
    props.history.push("/");
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <img
            onClick={handleClickHomePage}
            className={classes.logo}
            src={Logo}
            alt=""
          />
          <div style={{ flexGrow: "0.04" }}></div>
          {props.notShow ? null : (
            <div className={classes.search}>
              <InputBase
                onChange={handleSearchStringChange}
                placeholder={t("Customer_Home.8")}
                defaultValue={searchString}
                classes={{
                  root: classes.inputRoot,
                }}
              />
              {searchString !== "" ? (
                <IconButton onClick={handleSearchClick}>
                  <SearchIcon />
                </IconButton>
              ) : (
                <IconButton onClick={handleSearchClick} disabled>
                  <SearchIcon />
                </IconButton>
              )}
            </div>
          )}
          <div style={{ flexGrow: "1" }}></div>

          <div className={classes.sectionDesktop}>
            <IconButton
              onClick={bellIconClick}
              id="bell"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge
                badgeContent={
                  notifications.length > 0 ? notifications[0].totalRead : 0
                }
                color="secondary"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <div className="notifications" id="box">
              {notifications.length > 1 ? (
                <div
                  style={{
                    borderRadius:"5px",
                    marginTop: "10px",
                    maxHeight:'600px',
                    display: `${opacity}`,
                    backgroundColor: "white",
                    overflow: "auto",
                  }}
                >
                  {notifications.length > 0 ? (
                    <h2>{t("Customer_MyInform.1")}</h2>
                  ) : (
                    <h2 style={{ color: "black" }}>
                      {t("Customer_MyInform.5")}
                    </h2>
                  )}
                  {showNotifications}
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "20px",
                    display: `${opacity}`,
                    backgroundColor: "white",
                  }}
                >
                  {notifications.length > 0 ? (
                    <h2>{t("Customer_MyInform.1")} </h2>
                  ) : (
                    <h2 style={{ color: "black" }}>
                      {t("Customer_MyInform.5")}
                    </h2>
                  )}
                  {showNotifications}
                </div>
              )}
            </div>
            <div style={{ flexGrow: 0.3 }}></div>

            {userData && userData.isAdmin === true ? (
              <IconButton
                onClick={handleLogoutClick}
                style={{ outline: "none !important", boxShadow: "none" }}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => props.history.push("/cart")}
                style={{ outline: "none !important", boxShadow: "none" }}
                color="inherit"
              >
                <Badge badgeContent={cartAmount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
            {userData && userData.isAdmin === true ? null : (
              <IconButton
                color="inherit"
                onClick={() => props.history.push("/user_page")}
              >
                {userId || userName  ? (
                  <div
                    style={{
                      backgroundColor: "#88d498",
                      color: "white",
                      borderRadius: "30px",
                      fontSize: "15px",
                      padding: "5px",
                      borderColor: "white",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      display:'flex',
                      alignItems:'center'
                    }}
                  >
                      <Avatar style={{width:"25px",height:"25px",backgroundColor:'white',color:'black',marginRight:'3px',fontSize:'10px',fontWeight:'600'}}>{ split.length >= 2
      ? split[split.length - 2][0] + " " + split[split.length - 1][0]
      : split[split.length - 1][0]}</Avatar>
                      <span style={{marginBottom:'0px !important',fontWeight:'600'}}>{displayName}</span>
                  </div>
                ) : (
                  <AccountCircle style={{ marginRight: "5px" }} />
                )}
              </IconButton>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          {/* <ReactCountryFlag
            onClick={() => handleClick_ChangeLang("vi")}
            style={{ fontSize: "2em", cursor: "pointer" }}
            countryCode="VN"
            svg
          />
          <ReactCountryFlag
            onClick={() => handleClick_ChangeLang("en")}
            style={{ fontSize: "2em", cursor: "pointer", marginLeft: "10px" }}
            countryCode="GB"
            svg
          /> */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <SnackBar />
    </div>
  );
};
export default withRouter(PrimarySearchAppBar);
