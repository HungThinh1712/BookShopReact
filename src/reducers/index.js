import {combineReducers} from 'redux';
import bookTagsReducer from '../reducers/bookTagsReducer'
import booksReducer from './booksReducer'
import cartReducer from './cartReducer'
import authReducer from './authReducer'
import backdropReducer from './backdropReducer'
import typeReducer from './typeReducer'
import publishHouseReducer from './publishHouseReducer'
import authorReducer from './authorReducer'
import commentReducer from './commentReducer'
import orderReducer from './orderReducer'
import provinceReducer from './provinceReducer'
import districtReducer from './districtReducer'
import wardReducer from './wardReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'
import statisticReducer from './statisticReducer'
import promotionReducer from './promotionReducer'


const appReducer = combineReducers({
    bookTags:bookTagsReducer,
    books:booksReducer,
    cart: cartReducer,
    auth: authReducer,
    backdrop:backdropReducer,
    type:typeReducer,
    publishHouse:publishHouseReducer,
    author:authorReducer,
    comment: commentReducer,
    order : orderReducer,
    province: provinceReducer,
    district:districtReducer,
    ward:wardReducer,
    notifications:notificationReducer,
    users:userReducer,
    statistics:statisticReducer,
    promotions:promotionReducer,
});
export default appReducer;