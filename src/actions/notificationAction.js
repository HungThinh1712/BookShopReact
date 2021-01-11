import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'
import { toastMessage} from '../components/common/ToastHelper';


export const getNotificationsRequest =  (userId) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Notification?userId=${userId}`)
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



