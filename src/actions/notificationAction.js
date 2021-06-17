import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'


export const getNotificationsRequest =  () => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Notification`)
    await axios.get(url)
        .then(res => {
            dispatch({
                type: Types.GET_NOTIFICATIONS,  //this call test dispatch. to dispsatch to our reducer
                notifications: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
    
};



