import * as Types from './../constants/ActionType'
import axios from 'axios'
import * as CallApis from './../constants/Apis'
import { toastMessage} from '../components/common/ToastHelper';
import * as backdropAction from './../actions/backdropAction'
import { useTranslation } from "react-i18next"

export const addToCart = (item,amount) =>  {
    return {
        type: Types.ADD_TO_CART,
        item: item,
        amount:amount
    }
};
export const updateAmountBookCurrentUser_Local = (item,amount) =>  {
    return {
        type: Types.UPDATE_AMOUNT_CURENTBOOK_IN_CART_LOCAL,
        item: item,
        amount:amount
    }
};
export const deleteFromCart = bookId => {
    return {
        type: Types.DELETE_FROM_CART,
        bookId: bookId
    }
};

export const addToCartofCurrentUser = (shoppingCartData) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/ShoppingCarts/AddToCart`)
    await axios({
        
        method: 'post',
        url: url,
        data: {
             shoppingCartData
        }
      }).then(res =>  {  
        if (res.status===200 ) {
            localStorage.removeItem('cart')
        } else {
           
        }
    })
    .catch(err => {
           
        }
    );
        
};

export const getCartByUserIdRequest = () => async (dispatch) => {

    const url = CallApis.API_URL.concat(`/ShoppingCarts/Get`)
    await axios.get(url)
        .then(res => {
            dispatch({
                type: Types.GET_CART_BY_USER_ID,  //this call test dispatch. to dispsatch to our reducer
                items: res.data
            });
        })
        .catch(err => {
            console.log('Error' + err);
        }
        );

}

export const deleteIntemInCartofCurrentUser = (bookId) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/ShoppingCarts/DeleteItemInCart?bookId=${bookId}`)
    await axios({ 
        method: 'delete',
        url: url,
      }).then(res =>  {  
        if (res.status===200 ) {
            localStorage.removeItem('cart')
        } else {
           
        }
    })
    .catch(err => {
           
        }
    );
        
};

export const payForCart = (paymentType) => async (dispatch) => {
    console.log(paymentType)
    const url = CallApis.API_URL.concat(`/ShoppingCarts/PayForCart?paymentType=${paymentType}`)
    await axios.get(url).then(res =>  {  
        if (res.status===200 ) {
            dispatch(getCartByUserIdRequest())
        } else {
           
        }
    })
    .catch(err => {
           
        }
    );
        
};

export const clearStateCart = () => (dispatch) => {
    dispatch( {
        type: Types.CLEAR_CART_STATE,
        payload: []
    })
        
};

export const updateBookAmount = (shoppingCartData) => async (dispatch) => {
    const { t } = useTranslation();
    dispatch(backdropAction.setOpenBackDrop)
    const url = CallApis.API_URL.concat(`/ShoppingCarts/UpdateAmountCartItemEqualsToDB`)
    await axios({
        
        method: 'put',
        url: url,
        data: {
             shoppingCartData
        }
      }).then(res =>  {  
        if (res.status===200 ) {
            dispatch(backdropAction.setCloseBackDrop)
            toastMessage(t('Toast_Message.5'))
           
            dispatch({
                type: Types.UPDATE_BOOK_AMOUNT,  //this call test dispatch. to dispsatch to our reducer
                items: res.data
            });
        } else {
            dispatch(backdropAction.setCloseBackDrop)
        }
    })
    .catch(err => {
           
        }
    );
        
};

export const updateAmountBookCurrentUser_Server = (bookId,amount) => async (dispatch) => {
    dispatch(backdropAction.setOpenBackDrop)
    const url = CallApis.API_URL.concat(`/ShoppingCarts/IncreaseOrDecreaseItemAmount?bookId=${bookId}&amount=${amount}`)
    await axios({
        
        method: 'put',
        url: url,
        data: {
             bookId
        }
      }).then(res =>  {  
        if (res.status===200 ) {
            dispatch(backdropAction.setCloseBackDrop)
          
            dispatch({
                type: Types.UPDATE_AMOUNT_CURENTBOOK_IN_CART_SERVER,  //this call test dispatch. to dispsatch to our reducer
                items: res.data
            });
        } else {
            dispatch(backdropAction.setCloseBackDrop)
        }
    })
    .catch(err => {
           
        }
    );
        
};

export const payWithMomo = (money) => async (dispatch) => {
    const url = CallApis.API_URL.concat(`/ShoppingCarts/PayByMomo?totalMoney=${money}`)
    await axios({
        
        method: 'get',
        url: url,
      }).then(res =>  {  
        if (res.status===200 ) {
            window.open(res.data,"_self")
        } else {
            
        }
    })
    .catch(err => {
           
        }
    );
        
};





