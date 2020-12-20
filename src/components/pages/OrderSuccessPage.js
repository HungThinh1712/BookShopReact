import React from 'react';

const OrderSuccessPage = (props) => {
    return (
        <div class="container-fluid mt-100">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body cart">
                            <div className="col-sm-12 empty-cart-cls text-center"> <img src="https://i.imgur.com/dCdflKN.png" alt="" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                <h3><strong>Đơn hàng của bạn đã được ghi nhận</strong></h3>
                                <h4>Cảm ơn quý đọc giả đã tin tưởng sử dụng dịch vụ của chúng tôi</h4> <button  class="btn btn-primary cart-btn-transform m-3" onClick={() => props.history.push('/')}>Tiếp tục mua sắm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;