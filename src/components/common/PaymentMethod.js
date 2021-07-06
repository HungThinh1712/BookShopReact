import React, { useState, useEffect } from "react";
import CheckBox from "./../common/CheckBox";
import { makeStyles } from "@material-ui/core/styles";
import ListItemInPayment from "./ListItemInPayment";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../actions/cartAction";
import { withRouter } from "react-router-dom";
import * as notificationActions from "../../actions/notificationAction";
import * as CallApis from "../../constants/Apis";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Empty, Modal } from "antd";
import { Input } from "antd";
import * as promotionActions from "../../actions/promontionAction";
import ItemPromotion from "../common/PromotionItem";
import {
  CloseOutlined
} from "@ant-design/icons";

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
  const totalMoney = Object.values(cartItems.items).reduce(
    (totalMoney, cartItem) => totalMoney + cartItem.amount * cartItem.price,
    0
  );
  const [totalMoneyAfterDisCount,setTotalMoneyAfterDisCount] =useState(null );
  const [discountMoney,setDiscountMoney] = useState(null);
  const bookIds = cartItems.items.map((x) => x.bookId);
  const [paymentMethod, setPaymentMethod] = useState(1);


  //get protionsByMe
  useEffect(() => {
    dispatch(promotionActions.getPromontionsByMe(totalMoney, bookIds));
  }, [totalMoney]);

  const promotionsByMe = useSelector((state) =>
    state.promotions.promotionsByMe ? state.promotions.promotionsByMe : []
  );
  const [promotionId, setPromotionId] = useState(null);
  const [promotionCode,setPromotionCode] = useState(null)
  const handlePromotionClick = (promotion) => {
    if (promotion.id === promotionId) {
      setPromotionId(null);
      setPromotionCode(null)
    } else {
      setPromotionId(promotion.id);
      setPromotionCode(promotion.promotionCode)
      console.log(promotion.promotionCode)
    }
  };

  const showPromotions = promotionsByMe.map((promotion, index) => (
    <div>
      {promotionId === promotion.id ? (
        <ItemPromotion
          tag="Checked"
          onClick={() => handlePromotionClick(promotion)}
          promotion={promotion}
          key={index}
        />
      ) : (
        <ItemPromotion
          tag="UnChecked"
          promotion={promotion}
          onClick={() => handlePromotionClick(promotion)}
          key={index}
        />
      )}
    </div>
  ));

 

  const userData = useSelector((state) =>
    state.auth.userData ? state.auth.userData : null
  );
  


  const sendMessage = async (orderId) => {
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
  const shippingFee = props.distanceAndFee
    ? props.distanceAndFee.shippingFee
    : null;
  const [shippingFeeAfterDiscount,setShippingFeeAfterDiscount] = useState(null);
  const distance = props.distanceAndFee ? props.distanceAndFee.distance : null;

  const handleClick = () => {
    if (paymentMethod === 1) {
      const paymentType = 1;
      dispatch(
        cartActions.payForCart(
          paymentType,
          totalMoney,
          shippingFee,
          sendMessage,
          promotionCode
        )
      );

      props.history.push("/order_success_page");
    } else {
      dispatch(
        cartActions.payWithMomo(totalMoney ,shippingFee,discountMoney,promotionCode)
      );
    }
  };
  const handlePaymentMethodInputChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleApplyPromotion = async () => {
    if(promotionCode){
      const url = CallApis.API_URL.concat("/Promotion/Apply")
    const promotionModel = {promotionCode,totalMoney,bookIds}
    await axios(url, {
      method: "post",
      data: promotionModel,
    
    }).then(async (res) => {
      if (res.status === 200) {
        setIsModalVisible(false);
        
         if(res.data.promotionType===0){
          setDiscountMoney(res.data.discountMoney);
          setTotalMoneyAfterDisCount(totalMoney - res.data.discountMoney);
          setShippingFeeAfterDiscount(null);
         }
         if(res.data.promotionType===1){
           setShippingFeeAfterDiscount(shippingFee);
           setDiscountMoney(null);
           setTotalMoneyAfterDisCount(null);

         }
      }
    })
    }else{
          setDiscountMoney(null);
          setTotalMoneyAfterDisCount(null);
          setShippingFeeAfterDiscount(null);
          setIsModalVisible(false);
    }
  };

 
  return (
    <div className={classes.payment_method_zone}>
      <Modal
        bodyStyle={{ backgroundColor: "#EDECE7" }}
        footer={null}
        closable={false}
        visible={isModalVisible}
      >
        <CloseOutlined onClick={()=>setIsModalVisible(false)} style ={{display:'flex',justifyContent:'flex-end',paddingBottom:'15px',cursor:'pointer'}}/>
        <div style={{ display: "flex", marginBottom: "15px" }}>
          <Input value ={promotionCode} placeholder="Nhập mã khuyến mãi" />
          <Button
            variant="contained"
            onClick ={handleApplyPromotion}
            style={{
              backgroundColor: "#8ba889",
              fontWeight: "600",
              color: "white",
              minWidth: "100px",
              marginLeft: "5px",
            }}
            color="primary"
          >
            Áp dụng
          </Button>
        </div>
       {promotionsByMe.length > 0 ?  <div style={{ maxHeight: "400px", overflow: "auto" }}>
          {showPromotions}
        </div>: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có mã khuyến mãi phù hợp"/>}
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "#253528",
          borderRadius: "5px",
          height: "127px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ fontWeight: "700", fontSize: "17px", padding: "10px" }}>
            {t("Customer_Shopping_Payment.12")}
          </div>
        </div>
        <div style={{ backgroundColor: "#253528", height: "1px" }}></div>
        <CheckBox
          value={paymentMethod}
          onChange={handlePaymentMethodInputChange}
        />
      </div>
      <ListItemInPayment
        showModal={showModal}
        totalMoney={totalMoney}
        totalMoneyAfterDisCount={totalMoneyAfterDisCount}
        shippingFee={shippingFee}
        shippingFeeAfterDiscount ={shippingFeeAfterDiscount}
        distance={distance}
        discountMoney ={discountMoney}
        style={{ marginTop: "40px" }}
      />
      <Button
        onClick={handleClick}
        variant="contained"
        style={{
          width: "100%",
          marginTop: "10px",
          backgroundColor: "#8ba889",
          fontWeight: "600",
          color: "white",
        }}
        color="primary"
      >
        {t("Customer_Shopping_Payment.15")}
      </Button>
    </div>
  );
};

export default withRouter(PaymentMethod);
