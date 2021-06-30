import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'
export const getUsersRequest =  (page,name) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Users/Admin/GetUser?name=${name}&page=${page}`)
    await axios.get(url)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: Types.GET_USERS,  //this call test dispatch. to dispsatch to our reducer
                users: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
    
};

export const getAllUsersRequest =  () => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Users/GetAll`)
    await axios.get(url)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: Types.GET_All_USERS,  //this call test dispatch. to dispsatch to our reducer
                users: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );  
};