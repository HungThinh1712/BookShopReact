import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'

export const getProvincesRequest =  () => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Provinces`)
    await axios.get(url)
        .then(res => {
            dispatch({
                type: Types.GET_PROVINCES,  //this call test dispatch. to dispsatch to our reducer
                provinces: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
    
};


