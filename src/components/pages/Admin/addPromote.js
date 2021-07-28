import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import { Input } from "antd";
import * as userAction from "../../../actions/userAction";
import * as bookAction from "../../../actions/booksAction";
import * as promotionAction from "../../../actions/promontionAction";
import { Select } from "antd";
import { DatePicker } from "antd";
import SideBarAdminPage from "../../common/SideBarAdminPage";
import Header from "../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "antd";
import { Tooltip } from "antd";
import { Tabs } from "antd";
import { toastMessage } from "../../common/ToastHelper";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const AddPromotion = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction.getAllUsersRequest());
    dispatch(bookAction.getAllBooksRequest());
  }, [dispatch]);

  const users = useSelector((state) =>
    state.users.allUsers ? state.users.allUsers : []
  );
  const books = useSelector((state) =>
    state.books.allBooks ? state.books.allBooks : []
  );

  const showUsers = users.map((user, index) => (
    <Option key={index} value={user.id}>
      {user.fullName}
    </Option>
  ));
  const showBooks = books.map((book, index) => (
    <Option key={index} value={book.id}>
      {book.bookName}
    </Option>
  ));
  const [customerIds, setCustomerIds] = useState([]);
  const [checkedUser, setCheckedUser] = useState(false);
  const handleCheckBoxAllChange = (e) => {
    if (e.target.checked === true) {
      setCustomerIds(users.map((x) => x.id));
      setCheckedUser(true);
    } else {
      setCustomerIds([]);
      setCheckedUser(false);
    }
  };
  const handleSelectUserChange = (value) => {
    setCustomerIds(value);
    if (value.length === users.length) {
      setCheckedUser(true);
    } else {
      setCheckedUser(false);
    }
  };
  //Books
  const [bookIds, setBookIds] = useState([]);
  const [checkedBook, setCheckedBook] = useState(false);
  const handleCheckBoxAllBooksChange = (e) => {
    if (e.target.checked === true) {
      setBookIds(books.map((x) => x.id));
      setCheckedBook(true);
    } else {
      setBookIds([]);
      setCheckedBook(false);
    }
  };
  const handleSelectBookChange = (value) => {
    setBookIds(value);
    if (value.length === books.length) {
      setCheckedBook(true);
    } else {
      setCheckedBook(false);
    }
  };

  //Input
  const [promotionCode, setPromotionCode] = useState(null);
  const [promotionName, setPromotionName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [countApply, setCountApply] = useState(null);
  const [promotionType, setPromotionType] = useState(0);
  const [minMoney, setMinMoney] = useState(null);
  const [discountMoney, setDiscountMoney] = useState(0);
  const [description, setDescription] = useState(null);

  const handleTabChange = (key) => {
    setPromotionType(key);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePromotionCodeChange = (e) => {
    setPromotionCode(e.target.value);
  };
  const handlePromotionNameChange = (e) => {
    setPromotionName(e.target.value);
  };
  const handlePromotionStartDateChange = (e) => {
    setStartDate(e);
    console.log(startDate);
  };
  const handlePromotionEndDateChange = (e) => {
    setEndDate(e);
  };
  const handleCountApplyChange = (e) => {
    setCountApply(e.target.value);
  };
  const handlePromotionMinMoneyChange = (e) => {
    setMinMoney(e.target.value);
  };
  const handleDiscountMoneyChange = (e) => {
    setDiscountMoney(e.target.value);
  };
  const handleAddPromotion = async () => {
    if (!promotionCode) {
      toastMessage("Vui lòng nhập mã khuyến mãi");
    } else if (!promotionName) {
      toastMessage("Vui lòng nhập tên khuyến mãi");
    } else if (!promotionCode) {
      toastMessage("Vui lòng nhập mã khuyến mãi");
    } else if (!customerIds) {
      toastMessage("Vui lòng chọn đối tượng áp dụng");
    } else if (!startDate) {
      toastMessage("Vui lòng chọn ngày bắt đầu");
    } else if (!endDate) {
      toastMessage("Vui lòng ngày kết thúc");
    } else if (!countApply) {
      toastMessage("Vui lòng nhập số lần áp dụng");
    } else if (promotionType === 0 && !discountMoney) {
      toastMessage("Vui lòng nhập số tiền giảm giá");
    } else if (!bookIds) {
      toastMessage("Vui lòng chọn sản phẩm");
    } else if (!minMoney) {
      toastMessage("Vui lòng nhập số tiền tối thiểu");
    } else {
      const promotion = {
        promotionCode,
        promotionName,
        customerIds,
        startDate,
        endDate,
        countApply,
        promotionType,
        description,
        minMoney,
        discountMoney,
        bookIds,
      };
      await dispatch(promotionAction.addPromotion(promotion, props.history));
      await dispatch(promotionAction.getPromontions(1, 10, 0));
    }
  };

  return (
    <div id="wrapper">
      <Header notShow="notShow" />
      <SideBarAdminPage />
      <div
        id="content-wrapper"
        style={{ marginTop: "100px", marginLeft: "250px" }}
      >
        <div>
          <h4>THÊM KHUYẾN MÃI</h4>
        </div>
        <div
          className="container-fluid"
          style={{ border: "1px solid #ccccb3" }}
        >
          <div className="card-body">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="form-group mb-3">
                <h6>Thông tin chung</h6>
              </div>
              <div className="row tm-edit-product-row">
                <div className="col-xl-10 col-lg-10 col-md-12">
                  <div className="row">
                    <div className="form-group mb-3 col-xs-12 col-sm-4">
                      <label>
                        <span
                          style={{
                            color: "red",
                            fontSize: "5px",
                            marginRight: "5px",
                            marginTop: "-5px",
                          }}
                        >
                          <i className="fas fa-star-of-life"></i>
                        </span>
                        Mã khuyến mãi
                      </label>
                      <Input
                        value={promotionCode}
                        onChange={handlePromotionCodeChange}
                      />
                    </div>
                    <div className="form-group mb-3 col-xs-12 col-sm-4">
                      <label>
                        <span
                          style={{
                            color: "red",
                            fontSize: "5px",
                            marginRight: "5px",
                            marginTop: "-5px",
                          }}
                        >
                          <i className="fas fa-star-of-life"></i>
                        </span>
                        Tên khuyến mãi
                      </label>
                      <Input
                        value={promotionName}
                        onChange={handlePromotionNameChange}
                      />
                    </div>
                    <div className="form-group mb-3 col-xs-12 col-sm-4">
                      <label>
                        <span
                          style={{
                            color: "red",
                            fontSize: "5px",
                            marginRight: "5px",
                            marginTop: "-5px",
                          }}
                        >
                          <i className="fas fa-star-of-life"></i>
                        </span>
                        <Tooltip title="Tất cả khách hàng">
                          <Checkbox
                            checked={checkedUser}
                            onChange={handleCheckBoxAllChange}
                            style={{ marginRight: "5px" }}
                          />
                        </Tooltip>
                        Đối tượng áp dụng
                      </label>

                      <Select
                        value={customerIds}
                        onChange={handleSelectUserChange}
                        showArrow
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Chọn đối tượng"
                      >
                        {showUsers}
                      </Select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group mb-3 col-xs-12 col-sm-4">
                      <label>
                        <span
                          style={{
                            color: "red",
                            fontSize: "5px",
                            marginRight: "5px",
                            marginTop: "-5px",
                          }}
                        >
                          <i className="fas fa-star-of-life"></i>
                        </span>
                        Ngày bắt đầu
                      </label>
                      <DatePicker
                        value={startDate}
                        onChange={handlePromotionStartDateChange}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="form-group mb-3 col-xs-12 col-sm-4">
                      <label>
                        <span
                          style={{
                            color: "red",
                            fontSize: "5px",
                            marginRight: "5px",
                            marginTop: "-5px",
                          }}
                        >
                          <i className="fas fa-star-of-life"></i>
                        </span>
                        Ngày kết thúc
                      </label>
                      <DatePicker
                        value={endDate}
                        onChange={handlePromotionEndDateChange}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="form-group mb-3 col-xs-12 col-sm-4">
                      <label>
                        <span
                          style={{
                            color: "red",
                            fontSize: "5px",
                            marginRight: "5px",
                            marginTop: "-5px",
                          }}
                        >
                          <i className="fas fa-star-of-life"></i>
                        </span>
                        Số lần áp dụng
                      </label>
                      <Input
                        value={countApply}
                        onChange={handleCountApplyChange}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group mb-3 col-xs-12 col-sm-12">
                      <label>
                        <span
                          style={{
                            color: "red",
                            fontSize: "5px",
                            marginRight: "5px",
                            marginTop: "-5px",
                          }}
                        >
                          <i className="fas fa-star-of-life"></i>
                        </span>
                        Mô tả
                      </label>
                      <TextArea
                        value={description}
                        onChange={handleDescriptionChange}
                        style={{ minHeight: "100px" }}
                        row={5}
                      ></TextArea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container-fluid"
          style={{ border: "1px solid #ccccb3", marginTop: "10px" }}
        >
          <div className="card-body">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="form-group mb-3">
                <h6>Chương trình khuyến mãi</h6>
              </div>
              <div className="row tm-edit-product-row">
                <div className="col-xl-10 col-lg-10 col-md-12">
                  <Tabs defaultActiveKey="0" onChange={handleTabChange}>
                    <TabPane tab="Giảm số tiền" key="0">
                      <div
                        className="form-group mb-3"
                        style={{ marginTop: "20px" }}
                      >
                        <h6>Điều kiện áp dụng</h6>
                      </div>
                      <div className="row">
                        <div className="form-group mb-3 col-xs-12 col-sm-4">
                          <label>
                            <span
                              style={{
                                color: "red",
                                fontSize: "5px",
                                marginRight: "5px",
                                marginTop: "-5px",
                              }}
                            >
                              <i className="fas fa-star-of-life"></i>
                            </span>
                            Tổng tiền đơn hàng tối thiểu
                          </label>
                          <Input
                            value={minMoney}
                            onChange={handlePromotionMinMoneyChange}
                            placeholder="Nhập số tiền"
                          />
                        </div>
                        <div className="form-group mb-3 col-xs-12 col-sm-4">
                          <label>
                            <span
                              style={{
                                color: "red",
                                fontSize: "5px",
                                marginRight: "5px",
                                marginTop: "-5px",
                              }}
                            >
                              <i className="fas fa-star-of-life"></i>
                            </span>
                            Số tiền được giảm
                          </label>
                          <Input
                            value={discountMoney}
                            onChange={handleDiscountMoneyChange}
                            placeholder="Nhập số tiền"
                          />
                        </div>
                      </div>
                      <div
                        className="form-group mb-3"
                        style={{ marginTop: "20px" }}
                      >
                        <h6>Danh sách sản phẩm</h6>
                      </div>
                      <div className="row">
                        <div className="form-group mb-3 col-xs-12 col-sm-4">
                          <Tooltip title="Tất cả sản phẩm">
                            <Checkbox
                              checked={checkedBook}
                              onChange={handleCheckBoxAllBooksChange}
                              style={{ marginRight: "5px" }}
                            />
                          </Tooltip>
                          <label>Sản phẩm</label>
                          <Select
                            onChange={handleSelectBookChange}
                            value={bookIds}
                            mode="multiple"
                            placeholder="Chọn sản phẩm"
                            style={{ width: "100%" }}
                          >
                            {showBooks}
                          </Select>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab="Miễn phí giao hàng" key="1">
                      <div
                        className="form-group mb-3"
                        style={{ marginTop: "20px" }}
                      >
                        <h6>Điều kiện áp dụng</h6>
                      </div>
                      <div className="row">
                        <div className="form-group mb-3 col-xs-12 col-sm-4">
                          <label>Tổng tiền đơn hàng tối thiểu</label>
                          <Input
                            value={minMoney}
                            onChange={handlePromotionMinMoneyChange}
                            placeholder="Nhập số tiền"
                          />
                        </div>
                      </div>
                      <div
                        className="form-group mb-3"
                        style={{ marginTop: "20px" }}
                      >
                        <h6>Danh sách sản phẩm</h6>
                      </div>
                      <div className="row">
                        <div className="form-group mb-3 col-xs-12 col-sm-4">
                          <Tooltip title="Tất cả khách hàng">
                            <Checkbox
                              checked={checkedBook}
                              onChange={handleCheckBoxAllBooksChange}
                              style={{ marginRight: "5px" }}
                            />
                          </Tooltip>
                          <label>Sản phẩm</label>
                          <Select
                            onChange={handleSelectBookChange}
                            value={bookIds}
                            mode="multiple"
                            placeholder="Chọn sản phẩm"
                            style={{ width: "100%" }}
                          >
                            {showBooks}
                          </Select>
                        </div>
                      </div>
                    </TabPane>
                  </Tabs>

                  <div className="row">
                    <Button
                      type="primary"
                      onClick={handleAddPromotion}
                      style={{ width: "15%", marginLeft: "15px" }}
                    >
                      <i className="fas fa-plus"></i>Thêm mới
                    </Button>
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

export default withRouter(AddPromotion);
