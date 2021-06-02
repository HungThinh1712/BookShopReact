import React, { useEffect } from "react";
import SideBarAdminPage from "../../common/SideBarAdminPage";
import { useSelector, useDispatch } from "react-redux";
import * as typeActions from "../../../actions/typesAction";
import * as publishHouseActions from "../../../actions/publishHouseAction";
import * as authorActions from "../../../actions/authorAction";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import * as bookActions from "../../../actions/booksAction";
import BreadCrumb from "../../common/Breadcrumbs";
import { useTranslation } from "react-i18next";
import * as bookTagAction from "../../../actions/bookTagsAction";
import { Input, InputNumber } from "antd";
import { Select } from "antd";
import { DatePicker } from "antd";
import { Button } from "antd";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;

const Book = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedBook = useSelector((state) =>
    state.books.selectedBook ? state.books.selectedBook : null
  );
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(bookActions.getBookByIdRequest(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(typeActions.getTypesRequest("", 1, 9999));
    dispatch(publishHouseActions.getPublishHousesRequest("", 1, 9999));
    dispatch(authorActions.getAuthorsRequest("", 1, 9999));
    dispatch(bookTagAction.getBookTagsRequest());
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
  //Get Data types,authors,publishhouse,
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

  const dateFormat = "YYYY-MM-DD";

  return (
    <div>
      {selectedBook ? (
        <div id="wrapper">
          <Header notShow="notShow" />
          <SideBarAdminPage />
          <div id="content-wrapper" style={{ marginTop: "100px", marginLeft: "250px" }}>
            <div className="container-fluid">
              <BreadCrumb
                breadcrumb={t("Admin_Book.5")}
                onClick={() => props.history.push("/admin")}
              ></BreadCrumb>
              <div className="card-body">
                <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="tm-block-title d-inline-block">
                        {t("Admin_Book.5")}
                      </h4>
                    </div>
                  </div>
                  <div className="row tm-edit-product-row">
                    <div className="col-xl-6 col-lg-6 col-md-12">
                      <div className="form-group mb-3">
                        <label for="name">{t("Admin_Book.6")}</label>
                        <Input disabled value={selectedBook.bookName} />
                      </div>
                      <div className="row">
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <label for="tag">{t("Admin_Book.7")}</label>

                          <Select
                            value={selectedBook.tagId}
                            disabled
                            style={{ width: "100%" }}
                          >
                            {showTags}
                          </Select>
                        </div>
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <label for="publishing_house">
                              {t("Admin_Book.9")}
                            </label>
                            <div style={{ flexGrow: "1" }}></div>
                          </div>
                          <Select
                          disabled
                            value={selectedBook.publishingHouseId}
                            style={{ width: "100%" }}
                          >
                            {showPublishHouses}
                          </Select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <label for="tag">{t("Admin_Book.10")}</label>
                            <div style={{ flexGrow: "1" }}></div>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <Select
                              disabled
                              value={selectedBook.typeId}
                              style={{ width: "100%" }}
                            >
                              {showTypes}
                            </Select>
                          </div>
                        </div>
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <label for="tag">{t("Admin_Book.11")}</label>
                            <div style={{ flexGrow: "1" }}></div>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <Select
                              disabled
                              value={selectedBook.authorId}
                              style={{ width: "100%" }}
                            >
                              {showAuthors}
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <label for="publish_date">{t("Admin_Book.12")}</label>
                          <DatePicker
                            format={dateFormat}
                            disabled
                            style={{ width: "100%" }}
                            value={moment(selectedBook.publishDate)}
                          />
                        </div>
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <label>{t("Admin_Book.13")}</label>
                          <InputNumber
                            disabled
                            value={selectedBook.amount}
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <label>{t("Admin_Book.14")}</label>
                          <InputNumber
                            disabled
                            value={selectedBook.price}
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <label>{t("Admin_Book.15")}</label>
                          <InputNumber
                            disabled
                            value={selectedBook.coverPrice}
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <label>{t("Admin_Book.16")}</label>
                          <InputNumber
                            disabled
                            value={selectedBook.pageAmount}
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <label>{t("Admin_Book.27")}</label>
                          <Input disabled value={selectedBook.size} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <label>{t("Admin_Book.18")}</label>
                          <Input
                            disabled
                            value={selectedBook.cover_Type}
                            name="size"
                            type="text"
                            className="form-control validate"
                            required
                          />
                        </div>
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <label for="name">{t("Admin_Book.17")}</label>

                          <Select
                            disabled
                            value={selectedBook.zoneType}
                            style={{ width: "100%" }}
                          >
                            <Option value="Sách tiếng việt">
                              {t("Customer_Home.2")}
                            </Option>
                            <Option value="Sách tiếng anh">
                              {t("Customer_Home.3")}
                            </Option>
                          </Select>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label for="description">Mô tả</label>
                        <TextArea
                          disabled
                          value={selectedBook.description}
                          rows="3"
                          required
                        ></TextArea>
                      </div>
                      <Button
                        size="large"
                        type="primary"
                        onClick={() =>
                          props.history.push("/admin/update_book", {
                            bookData: selectedBook,
                          })
                        }
                        className="btn btn-info form-group mb-3"
                        style={{ width: "100%" }}
                      >
                        {t("Admin_Book.20")}
                      </Button>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                      <div className="row">
                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <img
                            alt=""
                            src={selectedBook.imgUrl}
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
      ) : null}
    </div>
  );
};

export default Book;
