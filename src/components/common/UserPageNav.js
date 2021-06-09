import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "./../../actions/authAction";
import * as cartActions from "./../../actions/cartAction";
import { withRouter } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

const UserPageNav = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(authActions.logOut());
    dispatch(cartActions.clearStateCart());
    props.props.history.push("/");
  };
  const handleOrderHistoryClick = () => {
    props.history.push("/order_history");
  };
  const handleCommentHistoryClick = () => {
    props.history.push("/comment_history");
  };
  const handleUserPageClick = () => {
    props.history.push("/user_page");
  };
  const handleUpdateAddressClick = () => {
    props.history.push("/update_address_page");
  };
  const hiddenFileInput = React.useRef(null);

  const handleUpLoadClick = (event) => {
    hiddenFileInput.current.click();
  };
  
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("imgUrl", imgUrl);

    //const bookData = {bookName,zoneType,publishHouseId,typeId,authorId,publishDate,amount,price,coverPrice,pageAmount,size,coverType,tagId,description,imageSrc,imageFile};
    dispatch(authActions.updateAvatarUser(formData));
  };
  const [imgUrl, setImgUrl] = useState(props.imgSrc);
  const [imgFile,setImgFile] = useState(null);
  const [loadingImg,setLoadingImg] =useState(false);

  let clientId = "5afd6b67306a4cb";
  // let clientSecret = "04608dcd172ef4ac90272149c4ed50f9f9f45f2f";
  let auth = "Client-ID " + clientId;
  const handleUploadImageToImgur = async (e) => {
    setLoadingImg(true)
    const formDataTest = new FormData();
    if (e.target.files && e.target.files[0]) {
      formDataTest.append("image", e.target.files[0]);
      let imageFile = e.target.files[0];
      setImgFile(imageFile)
      await axios("https://api.imgur.com/3/image", {
        method: "post",
        data: formDataTest,
        headers: {
          Authorization: auth,
          Accept: "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          setImgUrl(`https://i.imgur.com/${res.data.data.id}.png`)
          setLoadingImg(false)
        }
      });
    }else{
      setImgFile(null);
      setImgUrl(props.imgSrc)
    }
  };
  const handleCancelClick = ()=>{
    setImgUrl(props.imgSrc)
    setImgFile(null);
  }
  return (
    <div   className="col-xs-5 col-sm-4 col-md-3">
      <div style={{backgroundColor:"#c6dabf",height:'800px'}} className="profile-sidebar">
        <div className="profile-userpic">
          {
            imgUrl ? <img
            src={imgUrl}
            onClick={handleUpLoadClick}
            alt={t('Customer_Management.1')}
          />: <div style={{display:'flex',justifyContent:'center'}}><Avatar  onClick={handleUpLoadClick}  style={{width:'90px',height:'90px',fontSize:'50px',fontWeight:'500',color:'white',fontWeight:'600'}}>TH</Avatar></div>
          }
          <div style={{ display: "none" }} className="custom-file mt-3 mb-3">
            <input
              id="fileInput"
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={handleUploadImageToImgur}
            />
          </div>
        </div>
        <div className="profile-usertitle">
          <div className="profile-usertitle-name">{props.name}</div>
        </div>
        <div className="profile-userbuttons">
          {imgUrl !==props.imgSrc ? (
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-success btn-sm"
            >
              {t('Customer_Management.31')}
            </button>
          ) : (
            <button
              onClick={() => props.history.push("/")}
              type="button"
              className="btn btn-success btn-sm"
            >
              {t('Customer_Management.2')}
            </button>
          )}
          { imgUrl ===props.imgSrc ?
            <button className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
            {t('Customer_Management.3')}
            </button> :  <button
              onClick={handleCancelClick}
              type="button"
              className="btn btn-success btn-sm"
            >
              Hủy
            </button>
          }
        </div>
        <div className="profile-usermenu">
          <div
            className="nav flex-column nav-pills"
            aria-orientation="vertical"
          >
            <div onClick={handleUserPageClick} className="nav-link ">
              <i className="fas fa-user"></i> {t('Customer_Management.1')}
            </div>
            <div onClick={handleOrderHistoryClick} className="nav-link">
              <i className="fas fa-shopping-cart"></i> {t('Customer_Management.8')}
            </div>
            <div onClick={handleUpdateAddressClick} className="nav-link">
              <i className="fas fa-tag"></i> {t('Customer_Management.15')}
            </div>
            <div onClick={handleCommentHistoryClick} className="nav-link">
              <i className="fas fa-star-half-alt"></i> {t('Customer_Management.19')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserPageNav);
