import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'

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


