import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'
export const getCommentsRequest =  (bookId,page) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Comments?bookId=${bookId}&page=${page}`)
    await axios.get(url)
        .then(res => {
           
            dispatch({
                type: Types.GET_COMMENTS,  //this call test dispatch. to dispsatch to our reducer
                comments: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
};

export const getCommentsUserRequest =  (userId) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Comments/GetCommentsByUserId?userId=${userId}`)
    await axios.get(url)
        .then(res => {
           
            dispatch({
                type: Types.GET_COMMENTS,  //this call test dispatch. to dispsatch to our reducer
                comments: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
};


export const getRatingRequest=  (bookId) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Comments/GetRatings?bookId=${bookId}`)
    await axios.get(url)
        .then(res => {
            dispatch({
                type: Types.GET_RATINGS,  //this call test dispatch. to dispsatch to our reducer
                ratings: res.data
            });
        })
        .catch(err => {
                console.log('Error' + err);
            }
        );
    
};

export const addComment = (comment) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Comments/Create`)
    //dispatch(backdropAction.setOpenBackDrop)
    await axios.post(url, comment)
        .then(res =>  {  
            if (res.status===200 ) {
               
            }else {
                let error;    
                //dispatch(backdropAction.setCloseBackDrop)            
                error = Object.values(res.data.errors)[0].toString();
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: error //sets payload to errors coming from server
                });
            }
        })
        .catch(err => {
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err //sets payload to errors coming from server
                })
            }
        );
};


export const updateComment = (comment) => async (dispatch) => {

    const url = CallApis.API_URL.concat(`/Comments`)
    await axios.put(url, comment).then(res =>  {  
        if (res.status===200 ) {

           
            dispatch({
                type: Types.UPDATE_COMMENT,  //this call test dispatch. to dispsatch to our reducer
                payload: res.data
            });
        } else {
           
        }
    })
    .catch(err => {
           
        }
    );
        
};


export const deleteComment = (id,bookId,page) => async (dispatch) => {

    const url = CallApis.API_URL.concat(`/Comments?id=${id}&bookId=${bookId}`)
    await axios.delete(url).then(res =>  {  
        if (res.status===200 ) {
     
            dispatch({
                type: Types.DELETE_COMMENT,  //this call test dispatch. to dispsatch to our reducer
                payload: res.data
            });
        } else {
           
        }
    })
    .catch(err => {
           
        }
    );
};

