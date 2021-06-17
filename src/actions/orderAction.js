import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'
import { toastMessage } from '../components/common/ToastHelper';
import { useTranslation } from "react-i18next"
import * as backDropAction from "../actions/backdropAction"

export const getOrdersRequest =  (page,pageSize,status) => async (dispatch) => {
    let url = CallApis.API_URL.concat(`/Orders?page=${page}&pageSize=${pageSize}`)
    if(status){
        url = url.concat(`&status=${status}`)
    }
    dispatch(backDropAction.setOpenBackDrop)

    await axios.get(url)
        .then(res => {
           dispatch(backDropAction.setCloseBackDrop)
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
export const getOrderRequest =  (id) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Orders/GetOrder?id=${id}`)
    dispatch(backDropAction.setOpenBackDrop)

    await axios.get(url)

        .then(res => {
            dispatch(backDropAction.setCloseBackDrop)
            dispatch({
                type: Types.GET_ORDER,  //this call test dispatch. to dispsatch to our reducer
                order: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
};


export const getAllOrdersRequest =  (page,pageSize,value) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Orders/Admin?page=${page}&pageSize=${pageSize}&status=${value}`)
    
    dispatch(backDropAction.setOpenBackDrop)
    await axios.get(url)
        .then(res => {
            dispatch(backDropAction.setCloseBackDrop)

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

export const confirmOder = (orderId,status) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Orders/Admin/ConfirmOrder?orderId=${orderId}&status=${status}`);
    dispatch(backDropAction.setOpenBackDrop)
    await axios.get(url).then(res =>  {  
        dispatch(backDropAction.setCloseBackDrop)
        if (res.status===200 ) {
           toastMessage("Thành công")
                   
        } 
        else{
            toastMessage('Thất bại');   
        }
    })
    .catch(err => {
           
        }
    );
        
};
export const cancelOder = (orderId,reason) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Orders/CancelOrder?orderId=${orderId}&reason=${reason}`);
    dispatch(backDropAction.setOpenBackDrop)
    await axios.get(url).then(res =>  {  
        dispatch(backDropAction.setCloseBackDrop)
        if (res.status===200 ) {
            toastMessage("Hủy thành công");
                   
        } 
        else{
            toastMessage('Thất bại');   
        }
    })
    .catch(err => {
           
        }
    );
        
};

