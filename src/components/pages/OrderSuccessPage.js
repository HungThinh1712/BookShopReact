import React, { useEffect,useState,useRef } from 'react';
import queryString from 'query-string';
import { useDispatch,useSelector } from 'react-redux';
import { HubConnectionBuilder } from '@microsoft/signalr';
import * as CallApis from '../../constants/Apis'
import * as notificationActions from './../../actions/notificationAction'
import * as cartActions from './../../actions/cartAction'
import {useTranslation} from 'react-i18next'

const OrderSuccessPage = (props) => {
    const { t } =  useTranslation();
    const dispatch = useDispatch();
    const errorCode = queryString.parse(props.history.location.search).errorCode
    
    useEffect(()=>{
        if(errorCode==='0'){
            const paymentType =2;
            dispatch(cartActions.payForCart(paymentType));
            sendMessage()
        }
    },[dispatch,errorCode])
    
    const [ connection, setConnection ] = useState(null);
   

    useEffect(() => {
          const url = CallApis.API_URL.concat(`/hubs/notification`)
        const newConnection = new HubConnectionBuilder()
            .withUrl(url)
            .withAutomaticReconnect()
            .build();
  
        setConnection(newConnection);
    }, []);
  
    const userId = useSelector(state=>state.auth.userData ? state.auth.userData.id: null)
    const userData = useSelector(state=>state.auth.userData ? state.auth.userData:null)
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('ReceiveMessage', message => {
                        if(message!==null && message.userId ===userId){
                          dispatch(notificationActions.getNotificationsRequest(userId))
                        }
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, []);
    
      const sendMessage = async () => {
       
        const chatMessage = {
            title: 'Đặt hàng',
            content: userData.fullName + " đã đặt một đơn hàng",
  
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
        <div className="container-fluid mt-100">
            <div className="row">
                {errorCode==='0' || errorCode===undefined || errorCode===null ? <div className="col-md-12">
                    <div className="card">
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center"> <img src="https://i.imgur.com/dCdflKN.png" alt="" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                <h3><strong>Đơn hàng của bạn đã được ghi nhận</strong></h3>
                                <h4>Cảm ơn quý đọc giả đã tin tưởng sử dụng dịch vụ của chúng tôi</h4> <button  className="btn btn-primary cart-btn-transform m-3" onClick={() => props.history.push('/')}>Tiếp tục mua sắm</button>
                            </div>
                        </div>
                    </div>
                </div>:<div className="col-md-12">
                    <div className="card">
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center"> <img src="https://i.imgur.com/dCdflKN.png" alt="" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                <h3><strong>Thanh toán không thành công</strong></h3>
                                <button  className="btn btn-primary cart-btn-transform m-3" onClick={() => props.history.push('/')}>Tiếp tục mua sắm</button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default OrderSuccessPage;