import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'
import { toastMessage} from '../components/common/ToastHelper';
import { useTranslation } from "react-i18next"

export const getBookTagsRequest =  () => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Tags/GetAll`)
    await axios.get(url)
        .then(res => {
            dispatch({
                type: Types.GET_BOOKTAGS,  //this call test dispatch. to dispsatch to our reducer
                bookTags: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
    
};

export const addBookTag = (bookTag) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Tags/Create`)
    const { t } = useTranslation();
   
    await axios.post(url, bookTag)
        .then(res =>  {  
            if (res.status===200 ) {
               toastMessage(t('Toast_Message.4'))
               dispatch({
                type: Types.ADD_BOOK_TAG,  //this call test dispatch. to dispsatch to our reducer
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



