import * as Types from './../constants/ActionType'

export const addToCart = item => {
    return {
        type: Types.ADD_TO_CART,
        item: item
    }
};



