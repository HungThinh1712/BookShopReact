import {ADD_TO_CART} from './../actions/cartAction'
import CartItem from './../models/CartItem';
import * as Types from './../constants/ActionType'

const cartItemInLocal = JSON.parse(localStorage.getItem('cart')) !=null ?  JSON.parse(localStorage.getItem('cart')).items : []
const initialState = {
  
    items:cartItemInLocal,
    totalAmount: 0
};



export default (state=initialState, action)=>{
    switch (action.type) {
        case Types.ADD_TO_CART:
            const addedBook = action.item;
            const price = addedBook.price;
            const coverPrice = addedBook.coverPrice;
            const name = addedBook.title;
            const authorName = addedBook.authorName;
            const bookId = addedBook.id;
            const image = addedBook.image;
            const discount = Math.ceil(((coverPrice - price) / coverPrice) * 100);

            let updatedOrNewCartItem;
            if(state.items[bookId] ){
                // already have the item in the cart
                updatedOrNewCartItem= new CartItem(
                    name,
                    price,
                    coverPrice,
                    discount,
                    authorName,
                    state.items[addedBook.id].amount +1,
                    state.items[addedBook.id].amount * price,               
                    bookId,
                    image
                );
            }else{
                // add new item
                updatedOrNewCartItem = new CartItem(name, price, coverPrice,discount, authorName, 1, 1*price, bookId,image);
            }
            let st =  {
                ...state,
                items: {...state.items, [bookId]: updatedOrNewCartItem}
            };
            localStorage.setItem('cart', JSON.stringify(st));
            return st;

        default:
            return {
                ...state
            }
    }
}
