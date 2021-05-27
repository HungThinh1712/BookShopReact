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
import BreadCrumb from "../../common/Breadcrumbs";
import { withRouter } from "react-router-dom";
import { Input, InputNumber } from "antd";
import { Select } from "antd";
import { DatePicker } from "antd";
import { Button } from "antd";
const { Option } = Select;
const { TextArea } = Input;

const Book = (props) => {
  const dispatch = useDispatch();
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
  const publishHouses = useSelector((state) =>
    state.publishHouse.publishHouses.entities
      ? state.publishHouse.publishHouses.entities
      : []
  );
  //Get Data types,authors,publishhouse,
  const showTypes = types.map((type, index) => (
    <Option key={index} value={type.id}>
      {type.name}
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

  //Show review Image
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageFile(imageFile);
        setImageSrc(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageFile(null);
      setImageSrc("/img/a.jpg");
    }
  };
  //Input
  const [bookName, setBookName] = useState("");
  const [typeId, setTypeId] = useState("0");
  const [authorId, setAuthorId] = useState("0");
  const [publishDate, setPublishDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [publishHouseId, setPublishHouseId] = useState("0");
  const [price, setPrice] = useState("");
  const [coverPrice, setCoverPrice] = useState("");
  const [pageAmount, setPageAmount] = useState(0);
  const [size, setSize] = useState("");
  const [coverType, setCoverType] = useState("");
  const [tag, setbookTag] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("/img/a.jpg");
  const [imageFile, setImageFile] = useState(null);
  const [zoneType, setZoneType] = useState("");

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
    setPublishDate(e.toISOString());
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
    formData.append("bookName", bookName);
    formData.append("zoneType", zoneType);
    formData.append("publishHouseId", publishHouseId);
    formData.append("typeId", typeId);
    formData.append("authorId", authorId);
    formData.append("publishDate", publishDate);
    formData.append("amount", amount);
    formData.append("price", price);
    formData.append("coverPrice", coverPrice);
    formData.append("pageAmount", pageAmount);
    formData.append("size", size);
    formData.append("coverType", coverType);
    formData.append("tag", tag);
    formData.append("description", description);
    formData.append("imageFile", imageFile);

    //const bookData = {bookName,zoneType,publishHouseId,typeId,authorId,publishDate,amount,price,coverPrice,pageAmount,size,coverType,tagId,description,imageSrc,imageFile};
    await dispatch(bookActions.addBook(formData));
  };

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const handleClickOpen = (value) => {
    setOpen(true);
    setTagType(value);
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
    }
  };
  const [tagType, setTagType] = useState("");
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
        <Header notShow="notShow" />
        <SideBarAdminPage />
        <div id="content-wrapper" style={{ marginTop: "100px" }}>
          <div className="container-fluid">
            <BreadCrumb
              breadcrumb="Thêm sách"
              onClick={() => props.history.push("/admin")}
              onClick2={() => props.history.push("/admin/add_book_page")}
            ></BreadCrumb>
            <div className="card-body">
              <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                <div className="row">
                  <div className="col-12">
                    <h4 className="tm-block-title d-inline-block">THÊM SÁCH</h4>
                  </div>
                </div>
                <div className="row tm-edit-product-row">
                  <div className="col-xl-6 col-lg-6 col-md-12">
                    <div className="form-group mb-3">
                      <label for="name">Tên sách</label>
                      <Input
                        id="name"
                        onChange={handleNameInputChange}
                        name="name"
                        type="text"
                        className="form-control validate"
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="name">Loại thẻ</label>

                        <Select
                          onChange={handleTagInputChange}
                          style={{ width: "100%" }}
                        >
                          <Option value="Sách bán chạy trong tuần">
                            Sách bán chạy trong tuần
                          </Option>
                          <Option value="Sách bán chạy trong tháng">
                            Sách bán chạy trong tháng
                          </Option>
                          <Option value="Sách bán chạy trong năm">
                            Sách bán chạy trong năm
                          </Option>
                        </Select>
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label for="publishing_house">Nhà xuất bản</label>
                          <div style={{ flexGrow: "1" }}></div>
                          <i
                            onClick={() => handleClickOpen("Thêm nhà xuất bản")}
                            style={{
                              display: "flex",
                              marginTop: "4px",
                              color: "blue",
                            }}
                            className="fas fa-plus-circle"
                          ></i>
                        </div>
                        <Select
                          onChange={handlePublishHouseInputChange}
                          style={{ width: "100%" }}
                          id="category"
                        >
                          {showPublishHouses}
                        </Select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label for="tagType">Loại sách</label>
                          <div style={{ flexGrow: "1" }}></div>
                          <i
                            onClick={() => handleClickOpen("Thêm loại sách")}
                            style={{
                              display: "flex",
                              marginLeft: "5px",
                              marginTop: "4px",
                              color: "blue",
                            }}
                            className="fas fa-plus-circle"
                          ></i>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Select
                            onChange={handleTypeInputChange}
                            style={{ width: "100%" }}
                          >
                            {showTypes}
                          </Select>
                        </div>
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label for="tagType">Tác giả</label>
                          <div style={{ flexGrow: "1" }}></div>
                          <i
                            onClick={() => handleClickOpen("Thêm tác giả")}
                            style={{
                              display: "flex",
                              marginLeft: "5px",
                              marginTop: "4px",
                              color: "blue",
                            }}
                            className="fas fa-plus-circle"
                          ></i>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Select
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
                        <label for="publish_date">Ngày xuất bản</label>
                        <DatePicker
                          onChange={handlePublishDateInputChange}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="amount">Số lượng</label>
                        <InputNumber
                          onChange={handleAmountInputChange}
                          style={{ width: "100%" }}
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="price">Giá</label>
                        <InputNumber
                          onChange={handlePriceInputChange}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="price">Giá bìa</label>
                        <InputNumber
                          onChange={handleCoverPriceInputChange}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="page_amount">Số trang</label>
                        <InputNumber
                          onChange={handlePageAmountInputChange}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="size">Kích thước</label>
                        <Input
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
                        <label for="cover_type">Loại bìa</label>
                        <input
                          id="size"
                          onChange={handleCoverTypeChange}
                          name="size"
                          type="text"
                          className="form-control validate"
                          required
                        />
                      </div>
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <label for="name">Khu vực</label>

                        <Select
                          onChange={handleZoneInputChange}
                          style={{ width: "100%" }}
                        >
                          <Option value="Sách tiếng việt">
                            Sách tiếng việt
                          </Option>
                          <Option value="Sách tiếng anh">Sách tiếng anh</Option>
                        </Select>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label for="description">Mô tả</label>
                      <TextArea
                        onChange={handleDescriptionInputChange}
                        rows="3"
                      ></TextArea>
                    </div>
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleSubmit}
                      style={{ width: "100%" }}
                    >
                      Thêm sản phẩm
                    </Button>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                    <div className="row">
                      <div className="form-group mb-3 col-xs-12 col-sm-6">
                        <img
                          alt=""
                          src={imageSrc}
                          onClick={handleUpLoadClick}
                          className="tm-product-img-dummy mx-auto"
                        >
                          {/* <i className="fas fa-cloud-upload-alt tm-upload-icon" onClick={handleClick} ></i> */}
                        </img>
                        <div className="custom-file mt-3 mb-3">
                          <input
                            id="fileInput"
                            accept="image/*"
                            type="file"
                            style={{ display: "none" }}
                            ref={hiddenFileInput}
                            onChange={showPreview}
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
      <div style={{ paddingTop: "180px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default withRouter(Book);
