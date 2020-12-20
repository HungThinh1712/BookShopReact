import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'
import { toastMessage} from '../components/common/ToastHelper';
export const getAuthorRequest =  () => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Authors`)
    await axios.get(url)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: Types.GET_AUTHORS,  //this call test dispatch. to dispsatch to our reducer
                authors: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
    
};


export const addAuthor = (author) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Authors/Create`)
   
   
    await axios.post(url, author)
        .then(res =>  {  
            if (res.status===200 ) {
               toastMessage("Thêm thành công")
               dispatch({
                type: Types.ADD_AUTHOR,  //this call test dispatch. to dispsatch to our reducer
                item: res.data
            });

            }else {
                let error = Object.values(res.data.errors)[0].toString();
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: error //sets payload to errors coming from server
                })
            }
        })
        .catch(err => {
            console.log(err);
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err //sets payload to errors coming from server
                })
            }
        );
};

