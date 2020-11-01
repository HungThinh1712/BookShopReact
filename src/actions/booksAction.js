import * as Types from '../constants/ActionType'
import axios from 'axios'

export const getBooksRequest = (indexPage) => async (dispatch) => {

    await axios.get(`https://localhost:44352/api/Books?index=${indexPage}`)
        .then(res => {
            dispatch({
                type: Types.GET_ALLBOOK,  //this call test dispatch. to dispsatch to our reducer
                books: res.data
            });
        })
        .catch(err => {
            console.log('Error' + err);
        }
        );

}

export const getBookByIdRequest = (id) => async (dispatch) => {
    
    await axios.get(`https://localhost:44352/api/Books/Get?id=${id}`)
        .then(res => {
            dispatch({
                type: Types.GET_BOOK_BY_ID,  //this call test dispatch. to dispsatch to our reducer
                selectedBook: res.data
            });
        })
        .catch(err => {
            console.log('Error' + err);
        }
        );

}

export const getBookByTypeIdRequest = (typeId) => async (dispatch) => {
    console.log(typeId)
    await axios.get(`https://localhost:44352/api/Books/GetBookByTypeId?typeID=${typeId}`)
        .then(res => {
            dispatch({
                type: Types.GET_BOOK_BY_TYPE_ID,  //this call test dispatch. to dispsatch to our reducer
                suggestedBooks: res.data
            });
        })
        .catch(err => {
            console.log('Error' + err);
        }
        );

}

