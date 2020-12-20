import React,{useEffect} from 'react';


const ItemBookInAdmin = (props) => {

    
    return (
        <div className="col-md-3 col-sm-6" style={{marginTop:'20px'}}>
            <div className="product-grid6">
                <div className="product-image6">
                    <div >
                        <img className="pic-1" src={props.imageSrc} style={{marginTop:'20px'}} />
                    </div>
                </div>
                <div className="product-content">
                    <h3 className="title" ><div>{props.title}</div></h3>
                    <div className="price">{props.price} đ</div>
                </div>
                <ul className="social">
                    <li><a data-tip="Xem chi tiết"><i className="fa fa-search"></i></a></li>
                    <li><a data-tip="Chỉnh sửa"><i className="fas fa-edit"></i></a></li>
                    <li><a data-tip="Xóa"><i className="fas fa-trash"></i></a></li>
                </ul>
            </div>
        </div>
    );
};

export default ItemBookInAdmin;