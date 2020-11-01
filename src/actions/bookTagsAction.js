import * as Types from '../constants/ActionType'
import axios from 'axios'

export const getBookTagsRequest =  () => async (dispatch) => {
    
    await axios.get('https://localhost:44352/api/Tags/GetAll')
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


