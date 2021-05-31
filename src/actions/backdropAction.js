
import * as Types from '../constants/ActionType'


export const setOpenBackDrop= (dispatch) => {

    dispatch( {
        type: Types.OPEN_BACKDROP,
        open: true
    })             
};

export const setCloseBackDrop= (dispatch) => {

    dispatch( {
        type: Types.OPEN_BACKDROP,
        open: false
    })             
};


