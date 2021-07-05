import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, DatePicker } from "antd";
import { Input } from "antd";
import * as userAction from "../../../actions/userAction";
import * as bookAction from "../../../actions/booksAction";
import * as promotionAction from "../../../actions/promontionAction";
import { Select } from "antd";
import {
  SaveOutlined,
  StopOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import SideBarAdminPage from "../../common/SideBarAdminPage";
import Header from "../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "antd";
import { Tooltip } from "antd";
import { Tabs } from "antd";
import { toastMessage } from "../../common/ToastHelper";
import moment from "moment";
import { Tag } from "antd";
import { Popconfirm } from "antd";
import { makeStyles } from "@material-ui/core/styles";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const useStyles = makeStyles((theme) => ({
  activeIcon: {
    padding: "5px",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#FFC074",
      cursor: "pointer",
    },
  },
}));

const AddPromotion = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const promotionId = props.match.params.id;
  useEffect(() => {
    dispatch(userAction.getAllUsersRequest());
    dispatch(bookAction.getAllBooksRequest());
    dispatch(promotionAction.getPromontion(promotionId));
  }, [dispatch, promotionId]);

  const selectedPromotion = useSelector((state) =>
    state.promotions.promotion ? state.promotions.promotion : null
  );

  const users = useSelector((state) =>
    state.users.allUsers ? state.users.allUsers : []
  );
  const books = useSelector((state) =>
    state.books.allBooks ? state.books.allBooks : []
  );
  const booksLength = books !== [] ? books.length : 0;
  const usersLength = users !== [] ? users.length : 0;
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
  const [id, setId] = useState(promotionId);
  const [promotionName, setPromotionName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [countApply, setCountApply] = useState(null);
  const [promotionType, setPromotionType] = useState(0);
  const [minMoney, setMinMoney] = useState(null);
  const [discountMoney, setDiscountMoney] = useState(null);
  const [description, setDescription] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    if (selectedPromotion) {
      setPromotionCode(selectedPromotion.promotionCode);
      setPromotionName(selectedPromotion.promotionName);
      setStartDate(moment(selectedPromotion.startDate).format("YYYY/MM/DD"));
      setEndDate(moment(selectedPromotion.endDate).format("YYYY/MM/DD"));
      console.log(startDate);
      setCountApply(selectedPromotion.countApply);
      setPromotionType(selectedPromotion.promotionType);
      setMinMoney(selectedPromotion.minMoney);
      setDiscountMoney(selectedPromotion.discountMoney);
      setDescription(selectedPromotion.description);
      setBookIds(selectedPromotion.bookIds);
      setCustomerIds(selectedPromotion.customerIds);
      setStatus(selectedPromotion.status);
      if (selectedPromotion.bookIds.length === booksLength) {
        setCheckedBook(true);
      }
      if (selectedPromotion.customerIds.length === usersLength) {
        setCheckedUser(true);
      }
    }
  }, [selectedPromotion]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePromotionCodeChange = (e) => {
    setPromotionCode(e.target.value);
  };
  const handlePromotionNameChange = (e) => {
    setPromotionName(e.target.value);
  };
  const handlePromotionStartDateChange = (date, dateString) => {
    setStartDate(dateString);
  };
  const handlePromotionEndDateChange = (date, dateString) => {
    setEndDate(dateString);
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
  const handleUpdatePromotion = () => {
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
        id,
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
      dispatch(promotionAction.updatePromotion(promotion, props.history));
    }
  };
  const showTag = () => {
    if (status === 0) {
      return (
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}
        >
          <Tag
            color="warning"
            style={{
              fontSize: "12px",
              borderRadius: "20px",
              fontWeight: "600",
              width: "100px",
              height: "30px",
              marginLeft: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Chưa kích hoạt
          </Tag>
          {selectedPromotion.status === 0 ? (
            <Tooltip title="Kích hoạt">
              <PoweroffOutlined
                className={classes.activeIcon}
                style={{
                  fontSize: "22px",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          ) : (
            <Popconfirm
              placement="bottom"
              title="Bạn có chắc muốn hủy mã khuyến mãi này?"
              onConfirm={() => confirm()}
              okText="Đồng ý"
              cancelText="Thoát"
            >
              <Tooltip title="Hủy khuyến mãi">
                <StopOutlined
                  className={classes.activeIcon}
                  style={{
                    fontSize: "22px",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </Popconfirm>
          )}
        </div>
      );
    }
    if (status === 1) {
      return (
     <div   style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
          <Tag
          color="#87d068"
          style={{
            fontSize: "12px",
            borderRadius: "20px",
            fontWeight: "600",
            width: "100px",
            height: "30px",
            marginLeft: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Đã kích hoạt
        </Tag>
        <Popconfirm
        placement="bottom"
        title="Bạn có chắc muốn hủy kích hoạt mã khuyến mãi này?"
        onConfirm={() => confirm()}
        okText="Đồng ý"
        cancelText="Thoát"
      >
        <Tooltip title="Hủy kích hoạt">
          <StopOutlined
            className={classes.activeIcon}
            style={{
              fontSize: "22px",
              marginRight: "5px",
              cursor: "pointer",
            }}
          />
        </Tooltip>
      </Popconfirm>
     </div>
      );
    }
    if (status === 2) {
      return (
        <Tag
          color="#108ee9"
          style={{
            fontSize: "12px",
            borderRadius: "20px",
            fontWeight: "600",
            width: "100px",
            height: "30px",
            marginLeft: "20px",
            marginBottom: "7px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Đang diễn ra
        </Tag>
      );
    }
    if (status === 3) {
      return (
        <Tag
          color="#f50"
          style={{
            fontSize: "12px",
            borderRadius: "20px",
            fontWeight: "600",
            width: "100px",
            height: "30px",
            marginLeft: "20px",
            marginBottom: "7px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Đã hủy
        </Tag>
      );
    }
  };

  const confirm = () => {
    const id = promotionId;
    dispatch(promotionAction.cancelPromotion(id, props.history));
  };
  const dateFormat = "YYYY/MM/DD";
  return (
    <div id="wrapper">
      <Header notShow="notShow" />
      <SideBarAdminPage />
      <div
        id="content-wrapper"
        style={{ marginTop: "100px", marginLeft: "250px" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4>Chi tiết khuyến mãi</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "66%",
            }}
          >
            {showTag()}
            <div>
              {status === 0 || status == 1 ? (
                <div>
                  <Tooltip title="Lưu">
                    <SaveOutlined
                      className={classes.activeIcon}
                      onClick={handleUpdatePromotion}
                      style={{
                        fontSize: "22px",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </div>
              ) : null}
            </div>
          </div>
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
                        value={moment(startDate, dateFormat)}
                        allowClear={false}
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
                        value={moment(endDate, dateFormat)}
                        allowClear={false}
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
                  <Tabs>
                    {promotionType === 0 ? (
                      <TabPane tab="Giảm số tiền">
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
                          <div className="form-group mb-3 col-xs-12 col-sm-12">
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
                    ) : (
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
                          <div className="form-group mb-3 col-xs-12 col-sm-12">
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
                    )}
                  </Tabs>

                  <div className="row"></div>
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
