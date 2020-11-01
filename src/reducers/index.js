import {combineReducers} from 'redux';
import bookTagsReducer from '../reducers/bookTagsReducer'
import booksReducer from './booksReducer'
import cartReducer from './cartReducer'
import authReducer from './authReducer'

const appReducer = combineReducers({
    bookTags:bookTagsReducer,
    books:booksReducer,
    cart: cartReducer,
    auth: authReducer
});
export default appReducer;