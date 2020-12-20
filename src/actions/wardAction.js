import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'

export const getWardsRequest =  (id) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Wards?id=${id}`)
    await axios.get(url)
        .then(res => {
            dispatch({
                type: Types.GET_WARDS,  //this call test dispatch. to dispsatch to our reducer
                wards: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
    
};


