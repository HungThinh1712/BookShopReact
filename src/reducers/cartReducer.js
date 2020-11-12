import CartItem from './../models/CartItem';
import * as Types from './../constants/ActionType'


const cartItemInLocal = JSON.parse(localStorage.getItem('cart')) !=null ?  JSON.parse(localStorage.getItem('cart')).items : []
const initialState = {
  
    items:cartItemInLocal,
};



export default (state=initialState, action) =>{
    const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).id : null
    switch (action.type) {
        case Types.ADD_TO_CART:

            const addedBook = action.item;
            const price = addedBook.price;
            const coverPrice = addedBook.coverPrice;
            const name = addedBook.name;
            const authorName = addedBook.authorName;
            const bookId = addedBook.bookId;
            const image = addedBook.image;
            const discount = Math.ceil(((coverPrice - price) / coverPrice) * 100);
            
           

            let updatedOrNewCartItem;
            if(userId==null){
                if(state.items[bookId] ){
                    // already have the item in the cart
                    updatedOrNewCartItem= new CartItem(
                        name,
                        price,
                        coverPrice,
                        discount,
                        authorName,
                        state.items[addedBook.bookId].amount +action.amount,            
                        bookId,
                        image
                    );
                }else{
                    // add new item
                    updatedOrNewCartItem = new CartItem(name, price, coverPrice,discount, authorName, action.amount, bookId,image);
                }
                let st =  {
                    ...state,
                    items: {...state.items, [bookId]: updatedOrNewCartItem},
                };
                localStorage.setItem('cart', JSON.stringify(st));
                return st;
            }else{
                let flag =false
                let st =[];
                for (let i = 0; i < state.items.length; i++) {
                    if(bookId===state.items[i].bookId){
                        console.log(state.items[i].bookId);
                        flag =true

                        updatedOrNewCartItem= new CartItem(
                        name,
                        price,
                        coverPrice,
                        discount,
                        authorName,
                        action.amount,            
                        bookId,
                        image
                        );
                        let newArray = [...state.items]
                        newArray[i] = {...newArray[i], amount: newArray[i].amount + action.amount}
                        st =  {
                            ...state,
                            items: newArray,
                        };

                        
                    }
                }
                if(flag===false ){

                    updatedOrNewCartItem = new CartItem(name, price, coverPrice,discount, authorName, action.amount, bookId,image);
                    st =  {
                        ...state,
                        items: {...state.items,  updatedOrNewCartItem},
                    };
                }
                return st;
                
            }    
            
           
        case Types.GET_CART_BY_USER_ID:
            if (action.items != null) {
                return {
                    ...state,
                    items: action.items,
                }
            } else {
                return {
                    ...state
                }
            }
        case Types.DELETE_FROM_CART:
            let updatedCartItems_;

         
            // erase it
           if(userId==null){
            updatedCartItems_ = { ...state.items };
            delete updatedCartItems_[action.bookId];     // delete product from object
            let st__ = {
                ...state,
                items: updatedCartItems_,
            };
            localStorage.setItem('cart', JSON.stringify(st__));
            return st__;
           }else{
                for (let i = 0; i < state.items.length; i++) {
                    if(action.bookId===state.items[i].bookId){
                        updatedCartItems_ = [...state.items ];
                        //delete updatedCartItems_[i];
                             // delete product from object
                      
                        updatedCartItems_.splice(i,1)
                        let st__ = {
                            ...state,
                            items: updatedCartItems_,
                        };
                        return st__;
                    }
                }
           }

        default:
            return {
                ...state
            }
    }
}
