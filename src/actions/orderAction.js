import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'
import { toastMessage } from '../components/common/ToastHelper';

export const getOrdersRequest =  (page,pageSize) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Orders?page=${page}&pageSize=${pageSize}`)
    await axios.get(url)
        .then(res => {
           
            dispatch({
                type: Types.GET_ORDERS,  //this call test dispatch. to dispsatch to our reducer
                orders: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
};

export const getAllOrdersRequest =  (page,pageSize,value) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Orders/Admin?page=${page}&pageSize=${pageSize}&status=${value}`)
    await axios.get(url)
        .then(res => {
           
            dispatch({
                type: Types.GET_ORDERS,  //this call test dispatch. to dispsatch to our reducer
                orders: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
    
};

export const confirmOder = (orderId) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Orders/Admin/ConfirmOrder?orderId=${orderId}`);
    await axios.get(url).then(res =>  {  
        if (res.status===200 ) {
            toastMessage("Xác nhận thành công")
                   
        } 
        else{
            toastMessage("Đã có lỗi xảy ra trong quá trình xác nhận");   
        }
    })
    .catch(err => {
           
        }
    );
        
};

