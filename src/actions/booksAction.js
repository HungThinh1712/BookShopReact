import * as Types from '../constants/ActionType'
import axios from 'axios'
import * as backdropAction from './../actions/backdropAction'
import * as CallApis from './../constants/Apis'
import {toastMessage} from './../components/common/ToastHelper'
export const getBooksRequest = (indexPage) => async (dispatch) => {
    dispatch(backdropAction.setOpenBackDrop)
    const url = CallApis.API_URL.concat(`/Books?index=${indexPage}`)
    await axios.get(url)
        .then(res => {
            dispatch(backdropAction.setCloseBackDrop)
            dispatch({
                type: Types.GET_ALLBOOK,  //this call test dispatch. to dispsatch to our reducer
                books: res.data
            });
        })
        .catch(err => {
            dispatch(backdropAction.setCloseBackDrop)
            console.log('Error' + err);
        }
        );

}

export const getBooksByZoneVnRequest = (indexPage,zone) => async (dispatch) => {
    dispatch(backdropAction.setOpenBackDrop)
    const url = CallApis.API_URL.concat(`/Books/GetBookByZone?index=${indexPage}&zoneType=${zone}`)
    await axios.get(url)
        .then(res => {
            dispatch(backdropAction.setCloseBackDrop)

            dispatch({
                type: Types.GET_BOOK_BY_ZONE_VN,  //this call test dispatch. to dispsatch to our reducer
                booksInZoneVn: res.data
            });
        })
        .catch(err => {
            dispatch(backdropAction.setCloseBackDrop)
            console.log('Error' + err);
        }
        );

}

export const getBooksByZoneEngRequest = (indexPage,zone) => async (dispatch) => {
    dispatch(backdropAction.setOpenBackDrop)
    const url = CallApis.API_URL.concat(`/Books/GetBookByZone?index=${indexPage}&zoneType=${zone}`)
    await axios.get(url)
        .then(res => {
            dispatch(backdropAction.setCloseBackDrop)
            dispatch({
                type: Types.GET_BOOK_BY_ZONE_ENG,  //this call test dispatch. to dispsatch to our reducer
                booksInZoneEng: res.data
            });
        })
        .catch(err => {
            dispatch(backdropAction.setCloseBackDrop)
            console.log('Error' + err);
        }
        );

}

export const getBookByIdRequest = (id) => async (dispatch) => {
    console.log("aa",id);
    const url = CallApis.API_URL.concat(`/Books/Get?id=${id}`)
    await axios.get(url)
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

export const getBookByTypeIdRequest = (typeId,bookId) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Books/GetBookByTypeId?typeId=${typeId}&bookId=${bookId}`)
    await axios.get(url)
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

export const searchBookByNameRequest = (name,typeId,sortPrice,publishHouseId,authorId,tagId,page) => async (dispatch) => {
    let url =  CallApis.API_URL.concat(`/Books/SearchBookByName?name=${name}`)
    if(typeId !=null)
        url = url.concat(`&typeId=${typeId}`)
    if(sortPrice !=null)
        url = url.concat(`&sortPrice=${sortPrice}`)
    if(publishHouseId!=null)
        url = url.concat(`&publishHouseId=${publishHouseId}`)
    if(authorId!=null){
        url = url.concat(`&authorId=${authorId}`)
    }
    if(tagId!=null){
        url = url.concat(`&tagId=${tagId}`)
    }
    url =url.concat(`&page=${page}`)
    dispatch(backdropAction.setOpenBackDrop)
    await axios.get(url)
        .then(res => {
            dispatch(backdropAction.setCloseBackDrop)
            dispatch({
                type: Types.SEARCH_BOOK,  //this call test dispatch. to dispsatch to our reducer
                searchedResultBooks: res.data
            });
        })
        .catch(err => {
            dispatch(backdropAction.setCloseBackDrop)
            console.log('Error' + err);
        }
        );

}


export const addBook = (bookData) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Books/Create`)
   
   
    await axios.post(url, bookData)
        .then(res =>  {  
            if (res.status===200 ) {
               toastMessage("Thêm thành công")
               dispatch({
                type: Types.ADD_BOOK,  //this call test dispatch. to dispsatch to our reducer
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
            console.log(err)
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err //sets payload to errors coming from server
                })
            }
        );
};


export const updateBook = (bookData) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/Books/Update`)
    await axios.put(url, bookData)
        .then(res =>  {  
            if (res.status===200 ) {
               
                toastMessage("Cập nhật thành công")           
            
            }else {
                console.log(res)
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: "Vui lòng kiểm tra lại thông tin" //sets payload to errors coming from server
                })
            }
        })
        .catch(err => {
            console.log(err)
                dispatch({
                    type: Types.GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: "Vui lòng kiểm tra lại thông tin" //sets payload to errors coming from server
                })
            }
        );
};


export const getBooksAdminRequest = (name,indexPage) => async (dispatch) => {
    dispatch(backdropAction.setOpenBackDrop)
    const url = CallApis.API_URL.concat(`/Books/SearchBookByNameAdmin?name=${name}&page=${indexPage}`)
    await axios.get(url)
        .then(res => {
            console.log("aaaaaaa",res.data)
            dispatch(backdropAction.setCloseBackDrop)
            dispatch({
                type: Types.GET_BOOKS_ADMIN,  //this call test dispatch. to dispsatch to our reducer
                booksAdmin: res.data
            });
        })
        .catch(err => {
            dispatch(backdropAction.setCloseBackDrop)
            console.log('Error' + err);
        }
        );

}