import * as Types from './../constants/ActionType'
import axios from 'axios'

export const addToCart = (item,amount) =>  {
    return {
        type: Types.ADD_TO_CART,
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
    await axios({
        
        method: 'post',
        url: `https://localhost:44352/api/ShoppingCarts/AddToCart`,
        headers: {}, 
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

export const getCartByUserIdRequest = (userId) => async (dispatch) => {

    await axios.get(`https://localhost:44352/api/ShoppingCarts/Get?userId=${userId}`)
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

export const deleteIntemInCartofCurrentUser = (userId,bookId) => async (dispatch) => {
    await axios({ 
        method: 'delete',
        url: `https://localhost:44352/api/ShoppingCarts/DeleteItemInCart?userId=${userId}&bookId=${bookId}`,
        headers: {}, 
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






