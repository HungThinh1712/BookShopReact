import React, {useState,useEffect} from 'react';
import CheckBox from './../common/CheckBox'
import {makeStyles} from '@material-ui/core/styles'
import ListItemInPayment from './ListItemInPayment'
import Button from '@material-ui/core/Button'
import {useDispatch,useSelector} from 'react-redux';
import * as cartActions from '../../actions/cartAction';
import {withRouter} from 'react-router-dom'
import * as notificationActions from '../../actions/notificationAction'
import { HubConnectionBuilder } from '@microsoft/signalr';
import * as CallApis from '../../constants/Apis'
import {useTranslation} from 'react-i18next'
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  payment_method_zone: {
    display: "inline-block",
  },
}));

const PaymentMethod = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) =>
    state.cart.items ? state.cart : []
  );
  const GetTotalMoney = Object.values(cartItems.items).reduce(
    (totalMoney, cartItem) => totalMoney + cartItem.amount * cartItem.price,
    0
  );
  const [paymentMethod, setPaymentMethod] = useState(1);
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

  const userId = useSelector((state) =>
    state.auth.userData ? state.auth.userData.id : null
  );
  const userData = useSelector((state) =>
    state.auth.userData ? state.auth.userData : null
  );

  // useEffect(() => {
  //   if (connection) {
  //     connection
  //       .start()
  //       .then((result) => {
  //         console.log("Connected!");

  //         connection.on("ReceiveMessage", (message) => {
  //           if (message !== null) {
  //             dispatch(notificationActions.getNotificationsRequest(userId));
  //           }
  //         });
  //       })
  //       .catch((e) => console.log("Connection failed: ", e));
  //   }
  // }, [connection,dispatch,userId]);

  const sendMessage = async (orderId) => {
    console.log("aaa");
    const chatMessage = {
      title: "Đặt hàng",
      content: `${userData.fullName} đã đặt một đơn hàng. Mã đơn hàng: ${orderId}`,
      senderId: userData.id,
    };

    try {
      const url = CallApis.API_URL.concat(`/Notification/SendNotiToAmin`);
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(chatMessage),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log("Sending message failed.", e);
    }
  };
 const shipingFee =props.distanceAndFee ? props.distanceAndFee.shippingFee :null;

  const handleClick = () => {
    if (paymentMethod === 1) {
      const paymentType = 1;
      dispatch(cartActions.payForCart(paymentType,GetTotalMoney,shipingFee,sendMessage));

      props.history.push("/order_success_page");
    } else {
      dispatch(
        cartActions.payWithMomo(
          GetTotalMoney.toString().replace(".", "")
        )
      );
    }
  };
  const handlePaymentMethodInputChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  return (
    <div className={classes.payment_method_zone}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#253528",
          borderRadius: "5px",
          height:'127px'
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ fontWeight: "700", fontSize: "17px", padding: "10px" }}>
            {t('Customer_Shopping_Payment.12')}
          </div>
        </div>
        <div style={{ backgroundColor: "#253528", height: "1px" }}></div>
        <CheckBox
          value={paymentMethod}
          onChange={handlePaymentMethodInputChange}
        />
      </div>
      <ListItemInPayment distanceAndFee={props.distanceAndFee}  style={{ marginTop: "40px" }} />
      <Button
        onClick={handleClick}
        variant="contained"
        style={{ width: "100%", marginTop: "10px",backgroundColor:"#8ba889",fontWeight:"600",color:'white' }}
        color="primary"
      >
        {t('Customer_Shopping_Payment.15')}
      </Button>
    </div>
  );
};

export default withRouter(PaymentMethod);