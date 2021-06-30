import React, { useEffect,useState } from 'react';
import queryString from 'query-string';
import { useDispatch,useSelector } from 'react-redux';
import * as CallApis from '../../constants/Apis'
import * as notificationActions from './../../actions/notificationAction'
import * as cartActions from './../../actions/cartAction'
import {useTranslation} from 'react-i18next'
import Header from "../common/Header"
import Footer from "../common/Footer";
import { Button } from "@material-ui/core";
import Cart from "../Images/cart.jpg"
import NoCart from "../Images/Nocart.jpg"

const OrderSuccessPage = (props) => {
    const { t } =  useTranslation();
    const dispatch = useDispatch();
    const errorCode = queryString.parse(props.history.location.search).errorCode
    const amount = queryString.parse(props.history.location.search).amount
    const shippingFee = queryString.parse(props.history.location.search).shippingFee

    const promotionCode = queryString.parse(props.history.location.search).promotionCode ? queryString.parse(props.history.location.search).promotionCode : null;
    
    useEffect(()=>{
        if(errorCode==='0'){
            const paymentType =2;
            dispatch(cartActions.payForCart(paymentType,amount,shippingFee,sendMessage,promotionCode));
        }
    },[dispatch,errorCode])
    
   

    
  
    const userId = useSelector(state=>state.auth.userData ? state.auth.userData.id: null)
    const userData = useSelector(state=>state.auth.userData ? state.auth.userData:null)
    
      const sendMessage = async () => {
       
        const chatMessage = {
            title: 'Đặt hàng',
            content: userData.fullName + " đã đặt một đơn hàng",
            senderId: userId,
  
        };
  
        try {
          const url = CallApis.API_URL.concat(`/Notification/SendNotiToAmin`)
          await  fetch(url, { 
              method: 'POST', 
              body: JSON.stringify(chatMessage),
              headers: {
                  'Content-Type': 'application/json'
              }
          });
      }
        catch(e) {
            console.log('Sending message failed.', e);
          }
    }
    return (
        <div style={{backgroundColor:"#EDECE7"}}>
            <Header/>
            <div  style={{display:'flex',alignContent:'center',justifyContent:'center',backgroundColor:"#EDECE7",paddingTop:'200px'}}>
            <div className="row">
                {errorCode==='0' || errorCode===undefined || errorCode===null ? <div className="col-md-12">
                    <div className="card">
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center"> <img src={Cart} alt="" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                <h3><strong>{t('Customer_Shopping_Payment.16')}</strong></h3>
                                <h4>{t('Customer_Shopping_Payment.17')}</h4>
                                <Button   style={{backgroundColor:"#1a936f",color:"#fff",fontWeight:'600'}}  onClick={() => props.history.push('/')}>{t('Customer_Shopping_Payment.18')}</Button>
                            </div>
                        </div>
                    </div>
                </div>:<div className="col-md-12">
                    <div className="card">
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center"> <img src={NoCart} alt="" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                <h3><strong>{t('Customer_Shopping_Payment.25')}</strong></h3>
                                <Button   style={{backgroundColor:"#1a936f",color:"#fff",fontWeight:'600'}}  onClick={() => props.history.push('/')}>{t('Customer_Shopping_Payment.18')}</Button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
        <div style={{marginTop:'300px'}} >
        <Footer />
      </div>
        </div>
    );
};

export default OrderSuccessPage;