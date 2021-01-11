import React, {useEffect} from 'react';
import queryString from 'query-string';
import * as cartActions from './../../actions/cartAction'
import {useDispatch} from 'react-redux'

const ConfirmMomoPage = (props) => {
    const dispatch = useDispatch();
    const statusCode = queryString.parse(props.history.location.search).status_Code
    console.log("aaaa",props.history.location.search)
    useEffect(()=>{
        if(statusCode===0){
            dispatch(cartActions.payForCart());
        }
    },[dispatch])

    return (
        <div className="container-fluid mt-100">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center"> <img src="https://i.imgur.com/dCdflKN.png" alt="" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                <h3><strong>Bạn đang cố truy cập vào một trang web không tồn tại</strong></h3>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmMomoPage;