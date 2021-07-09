import React, { useState, useEffect } from "react";
import SideBarAdminPage from "../../common/SideBarAdminPage";
import { useSelector, useDispatch } from "react-redux";
import * as typeActions from "../../../actions/typesAction";
import * as publishHouseActions from "../../../actions/publishHouseAction";
import * as authorActions from "../../../actions/authorAction";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import * as bookActions from "../../../actions/booksAction";
import Dialog from "../../common/Dialog";
import { toastMessage } from "./../../common/ToastHelper";
import {useTranslation} from "react-i18next"
import { Input, InputNumber } from "antd";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as bookTagAction from "../../../actions/bookTagsAction"
import { Select } from "antd";
import { Button } from "antd";
const { Option } = Select;
const { TextArea } = Input;

const UpdateBook = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const bookData = props.history.location.state.bookData
    ? props.history.location.state.bookData
    : [];
  useEffect(() => {
    dispatch(typeActions.getTypesRequest("", 1, 9999));
    dispatch(publishHouseActions.getPublishHousesRequest("", 1, 9999));
    dispatch(authorActions.getAuthorsRequest("", 1, 9999));
  }, [dispatch]);
  const types = useSelector((state) =>
    state.type.types.entities ? state.type.types.entities : []
  );
  const authors = useSelector((state) =>
    state.author.authors.entities ? state.author.authors.entities : []
  );
  const tags = useSelector((state) =>
  state.bookTags.bookTags ? state.bookTags.bookTags : []
);
  const publishHouses = useSelector((state) =>
    state.publishHouse.publishHouses.entities
      ? state.publishHouse.publishHouses.entities
      : []
  );
  //Get Data types, tags,authors,publishhouse,
  const showTypes = types.map((type, index) => (
    <Option key={index} value={type.id}>
      {type.name}
    </Option>
  ));
  const showTags = tags.map((tag, index) => (
    <Option key={index} value={tag.id}>
      {tag.name}
    </Option>
  ));
  const showAuthors = authors.map((author, index) => (
    <Option key={index} value={author.id}>
      {author.name}
    </Option>
  ));
  const showPublishHouses = publishHouses.map((publishHouse, index) => (
    <Option key={index} value={publishHouse.id}>
      {publishHouse.name}
    </Option>
  ));

  const hiddenFileInput = React.useRef(null);

  const handleUpLoadClick = (event) => {
    hiddenFileInput.current.click();
  };
  
  //Input
  const [bookName, setBookName] = useState(bookData.bookName);
  const [typeId, setTypeId] = useState(bookData.typeId);
  const [authorId, setAuthorId] = useState(bookData.authorId);
  const [publishDate, setPublishDate] = useState(bookData.publishDate);
  const [amount, setAmount] = useState(bookData.amount);
  const [publishHouseId, setPublishHouseId] = useState(
    bookData.publishingHouseId
  );
  const [price, setPrice] = useState(bookData.price);
  const [coverPrice, setCoverPrice] = useState(bookData.coverPrice);
  const [pageAmount, setPageAmount] = useState(bookData.pageAmount);
  const [size, setSize] = useState(bookData.size);
  const [coverType, setCoverType] = useState(bookData.cover_Type);
  const [tag, setbookTag] = useState(bookData.tagId);
  const [description, setDescription] = useState(bookData.description);
  const [imgUrl, setImgUrl] = useState(bookData.imgUrl);
  const [zoneType, setZoneType] = useState(bookData.zoneType);

  //HandelInputChange
  const handleNameInputChange = (e) => {
    setBookName(e.target.value);
  };
  const handleTypeInputChange = (e) => {
    setTypeId(e);
  };
  const handleAuthorInputChange = (e) => {
    setAuthorId(e);
  };
  const handlePublishDateInputChange = (e) => {
    setPublishDate(e.target.value);
  };
  const handleAmountInputChange = (e) => {
    setAmount(e);
  };
  const handlePublishHouseInputChange = (e) => {
    setPublishHouseId(e);
  };
  const handlePriceInputChange = (e) => {
    setPrice(e);
  };
  const handleCoverPriceInputChange = (e) => {
    setCoverPrice(e);
  };
  const handlePageAmountInputChange = (e) => {
    setPageAmount(e);
  };
  const handleSizeInputChange = (e) => {
    setSize(e.target.value);
  };
  const handleCoverTypeChange = (e) => {
    setCoverType(e.target.value);
  };
  const handleDescriptionInputChange = (e) => {
    setDescription(e.target.value);
  };
  const handleTagInputChange = (e) => {
    setbookTag(e);
  };
  const handleZoneInputChange = (e) => {
    setZoneType(e);
  };

  //Add book
  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("id", bookData.id);
    formData.append("bookName", bookName);
    formData.append("zoneType", zoneType);
    formData.append("publishHouseId", publishHouseId);
    formData.append("typeId", typeId);
    formData.append("authorId", authorId);
    formData.append("publishDate", publishDate);
    formData.append("amount", amount);
    formData.append(
      "price",
      price
    );
    formData.append(
      "coverPrice",
      coverPrice
    );
    formData.append("pageAmount", pageAmount);
    formData.append("size", size);
    formData.append("coverType", coverType);
    formData.append("tagId", tag);
    formData.append("description", description);
    formData.append("imgUrl", imgUrl);

    //const bookData = {bookName,zoneType,publishHouseId,typeId,authorId,publishDate,amount,price,coverPrice,pageAmount,size,coverType,tagId,description,imageSrc,imageFile};
    await dispatch(bookActions.updateBook(formData));
  };

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const handleClickOpen = (value) => {
    setOpen(true);
    setTag(value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleButtonAddClick = () => {
    if (name !== "") {
      if (tagType === "Thêm nhà xuất bản") {
        dispatch(publishHouseActions.addPublishHouse({ name: name }));
      } else if (tagType === "Thêm loại sách") {
        dispatch(typeActions.addType({ name: name }));
      } else {
        dispatch(authorActions.addAuthor({ name: name }));
      }
      setOpen(false);
      setName("");
    } else {
      toastMessage("Vui lòng nhập thẻ");
    }
  };

  const [loadingImg,setLoadingImg] =useState(0);

  let clientId = "5afd6b67306a4cb";
  // let clientSecret = "04608dcd172ef4ac90272149c4ed50f9f9f45f2f";
  let auth = "Client-ID " + clientId;
  const handleUploadImageToImgur = async (e) => {
    setLoadingImg(true)
    const formDataTest = new FormData();
    if (e.target.files && e.target.files[0]) {
      formDataTest.append("image", e.target.files[0]);
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
    }
  };

  const [tagType, setTag] = useState("");
  return (
    <div>
      <div id="wrapper">
        <Dialog
          open={open}
          onClick={handleButtonAddClick}
          onClose={handleClose}
          tagType={tagType}
          onChange={handleChangeName}
        ></Dialog>
        <Header />
        <SideBarAdminPage />
        <div id="content-wrapper" style={{ marginTop: "100px", marginLeft:'250px' }}>
          <div className="container-fluid">
            <div className="card-body">
              <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                <div className="row">
                  <div className="col-12">
                    <h4 className="tm-block-title d-inline-block">
                      {t('Admin_Book.20')}
                    </h4>
                  </div>
                </div>
                <div className="row tm-edit-product-row">
                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group mb-3">
                      <label for="name">{t('Admin_Book.6')}</label>
                      <Input
                        value={bookName}
                        onChange={handleNameInputChange}
                      />
                    </div>
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="name">{t('Admin_Book.7')}</label>

                        <Select
                          value={tag}
                          onChange={handleTagInputChange}
                          style={{ width: "100%" }}
                        >
                         {showTags}
                        </Select>
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label for="publishing_house">{t('Admin_Book.9')}</label>
                          <div style={{ flexGrow: "1" }}></div>
                          
                        </div>
                        <Select
                          value={publishHouseId}
                          onChange={handlePublishHouseInputChange}
                          style={{ width: "100%" }}
                        >
                          {showPublishHouses}
                        </Select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label for="tagType">{t('Admin_Book.10')}</label>
                          <div style={{ flexGrow: "1" }}></div>
                          
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Select
                            value={typeId}
                            onChange={handleTypeInputChange}
                            style={{ width: "100%" }}
                          >
                            {showTypes}
                          </Select>
                        </div>
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label for="tagType">{t('Admin_Book.11')}</label>
                          <div style={{ flexGrow: "1" }}></div>
                         
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Select
                            value={authorId}
                            onChange={handleAuthorInputChange}
                            style={{ width: "100%" }}
                          >
                            {showAuthors}
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="publish_date">{t('Admin_Book.12')}</label>
                        <Input
                          value={publishDate}
                          onChange={handlePublishDateInputChange}
                          type="date"
                        />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="amount">{t('Admin_Book.13')}</label>
                        <InputNumber
                          value={amount}
                          onChange={handleAmountInputChange}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="price">{t('Admin_Book.14')}</label>
                        <InputNumber
                          value={price}
                          onChange={handlePriceInputChange}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="price">{t('Admin_Book.15')}</label>
                        <InputNumber
                          value={coverPrice}
                          id="price"
                          onChange={handleCoverPriceInputChange}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="page_amount">{t('Admin_Book.16')}</label>
                        <InputNumber
                          value={pageAmount}
                          id="page_amount"
                          onChange={handlePageAmountInputChange}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="size">{t('Admin_Book.27')}</label>
                        <Input
                          value={size}
                          onChange={handleSizeInputChange}
                          name="size"
                          type="text"
                          className="form-control validate"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="cover_type">{t('Admin_Book.18')}</label>
                        <Input
                          value={coverType}
                          id="size"
                          onChange={handleCoverTypeChange}

                        />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="name">{t('Admin_Book.17')}</label>

                        <Select
                          value={zoneType}
                          onChange={handleZoneInputChange}
                          id="tagType"
                          style={{ width: "100%" }}
                        >
                          <Option value="Sách tiếng việt">
                            {t('Customer_Home.2')}
                          </Option>
                          <Option value="Sách tiếng anh">{t('Customer_Home.3')}</Option>
                        </Select>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label for="description">Mô tả</label>
                      <TextArea
                        value={description}
                        onChange={handleDescriptionInputChange}
                        className="form-control validate"
                        rows="3"
                        required
                      ></TextArea>
                    </div>
                    <Button
                      size="large"
                      type="primary"
                      onClick={handleSubmit}
                      className="btn btn-info form-group mb-3"
                      style={{ width: "100%" }}
                    >
                      {t('Admin_Book.20')}
                    </Button>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                    <div className="row">
                    <div className="form-group mb-3 col-xs-12 col-sm-6">
                        {
                          !loadingImg ? <img
                          alt=""
                          src={imgUrl}
                          onClick={handleUpLoadClick}
                          className="tm-product-img-dummy mx-auto"
                        ></img> : <div style={{marginTop:'100px',marginLeft:"150px"}}><CircularProgress/></div>
                        }
                        <div className="custom-file mt-3 mb-3">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
