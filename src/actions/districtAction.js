import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'

export const getDistrictsRequest =  (id) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Districts?id=${id}`)
    await axios.get(url)
        .then(res => {
            dispatch({
                type: Types.GET_DISTRICTS,  //this call test dispatch. to dispsatch to our reducer
                districts: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
    
};


