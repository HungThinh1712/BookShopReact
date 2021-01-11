import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import * as authActions from './../../actions/authAction'
import * as cartActions from './../../actions/cartAction'
import { withRouter } from 'react-router-dom'


const UserPageNav = (props) => {

    const dispatch = useDispatch();
    const handleLogoutClick = () => {
        dispatch(authActions.logOut());
        dispatch(cartActions.clearStateCart())
        props.props.history.push('/')
    }
    const handleOrderHistoryClick = () => {

        props.history.push('/order_history')
    }
    const handleUserPageClick = () => {

        props.history.push('/user_page')
    }
    const handleUpdateAddressClick = () => {

        props.history.push('/update_address_page')
    }
    const hiddenFileInput = React.useRef(null);

    const handleUpLoadClick = event => {
        hiddenFileInput.current.click();
    };
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0]
            const reader = new FileReader();
            reader.onload = x => {
                setImageFile(imageFile);
                setImageSrc(x.target.result)
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setImageFile(null);
            setImageSrc(props.imgSrc);
        }
    };
    console.log(props);
    const handleSubmit =  () => {
        const formData = new FormData();  
        formData.append("imageFile", imageFile)

        //const bookData = {bookName,zoneType,publishHouseId,typeId,authorId,publishDate,amount,price,coverPrice,pageAmount,size,coverType,tagId,description,imageSrc,imageFile};
        dispatch(authActions.updateAvatarUser(formData));
        setImageFile(null);
    };
    const [imageSrc, setImageSrc] = useState(props.imgSrc)
    const [imageFile, setImageFile] = useState(null)
    return (
        <div className="col-xs-5 col-sm-4 col-md-3" >
            <div className="profile-sidebar">
            <div className="profile-userpic"> 
            <img src={imageSrc ? imageSrc : props.imageSrc} onClick={handleUpLoadClick} className="img-responsive" alt="Thông tin cá nhân"/> 
            <div style={{display:'none'}} className="custom-file mt-3 mb-3" >
                                                    <input id="fileInput" accept="image/*" type="file" style={{ display: 'none' }} ref={hiddenFileInput} onChange={showPreview} />
                                                </div>              
            </div>  
                <div className="profile-usertitle">
                    <div className="profile-usertitle-name">{props.name}</div>
                </div>
                <div className="profile-userbuttons">
                    {imageFile ?  <button onClick={handleSubmit} type="button" className="btn btn-success btn-sm">Lưu ảnh</button>:
                    <button onClick={()=>props.history.push('/')} type="button" className="btn btn-success btn-sm">Trang chủ</button>}
                    <button className="btn btn-danger btn-sm" onClick={handleLogoutClick}>Đăng xuất</button>
                </div>
                <div className="profile-usermenu">
                    <div className="nav flex-column nav-pills" aria-orientation="vertical" >
                        <a onClick={handleUserPageClick} className="nav-link " ><i className="fas fa-user"></i> Thông tin tài khoản</a>
                        <a onClick={handleOrderHistoryClick} className="nav-link" ><i className="fas fa-shopping-cart" ></i> Quản lý đơn hàng</a>
                        <a onClick={handleUpdateAddressClick} className="nav-link" ><i className="fas fa-tag"></i> Địa chỉ đã gán</a>
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(UserPageNav);