import React, { useState } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import SideBarAdminPage from "../../common/SideBarAdminPage";
import { withRouter } from "react-router-dom";
import * as userAction from "../../../actions/userAction"
import UserManageAdmin from "./../../common/UserManageAdmin";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import BreadCrumb from "../../common/Breadcrumbs";
import {userDispatch} from 'react-redux'
import { useTranslation } from "react-i18next";
import { Modal, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { toastMessage } from "../../common/ToastHelper";
const { Option } = Select;
const useStyles = makeStyles((theme) => ({
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "30%",
    backgroundColor: "white",
    borderRadius: theme.shape.borderRadius,
    border: "solid",
    borderWidth: "1px",
    height: "35px",
    [theme.breakpoints.down("xs")]: {
      width: "80ch",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "80%",
    pointerEvents: "none",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  inputRoot: {
    color: "black",
    marginLeft: "10px",
    flex: 26,
    [theme.breakpoints.up("sm")]: {
      width: "80ch",
    },
  },
}));

const OrderManagementPageAdmin = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch()
  const [searchString, setSearchString] = useState("");
  const handleInputChange = (e) => {
    setSearchString(e.target.value);
  };
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isTopAdmin, setIsTopAdmin] = useState(false);

  const onNameChange = (e) => {
    setFullName(e.target.value);
  };
  const onPhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onIsTopAdminChange = (e) => {
    setIsTopAdmin(e);
  };
  

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if(fullName ==="" || email==="" || phoneNumber ===""){
        toastMessage("Vui lòng nhập đầy đủ thông tin")
    }else{

    const admin = {fullName,email,phoneNumber,isTopAdmin}
    await dispatch(userAction.createAdmin(admin,setIsModalVisible))
    await dispatch(userAction.getAdminUsersRequest(""))
    setFullName("");
    setEmail("")
    setPhoneNumber("")
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div id="wrapper">
        <Header notShow="notShow" />
        <SideBarAdminPage />
        <Modal
          width="400px"
          title="Thêm tài khoản"
          visible={isModalVisible}
          closable={false}
          onOk={handleOk}
          cancelText="Hủy"
          okText="Thêm"
          onCancel={handleCancel}
        >
          <label>Họ và tên</label>
          <Input
            value={fullName}
            onChange={onNameChange}
            style={{ marginBottom: "8px" }}
            placeholder="Nhập họ tên"
          />
          <label>Email</label>
          <Input
            value={email}
            onChange={onEmailChange}
            style={{ marginBottom: "8px" }}
            placeholder="Nhập email"
          />
          <label>Số điện thoại</label>
          <Input
            value={phoneNumber}
            onChange={onPhoneChange}
            style={{ marginBottom: "8px" }}
            placeholder="Nhập số điện thoại"
          />

          <label>Vai trò</label>
          <Select
            value={isTopAdmin}
            onChange={onIsTopAdminChange}
            style={{ width: "100%", marginBottom: "8px" }}
            placeholder="Chọn vai trò"
          >
            <Option value={false}>Admin</Option>
            <Option value={true}>TopAdmin</Option>
          </Select>
        </Modal>

        <div
          id="content-wrapper"
          style={{ marginTop: "100px", marginLeft: "250px" }}
        >
          <div className="container-fluid">
            <BreadCrumb
              breadcrumb="Quản lý tài khoản"
              onClick={() => props.history.push("/admin")}
              onClick2={() => props.history.push("/admin/usermanagement_page")}
            ></BreadCrumb>
            <div className="card mb-3">
              <div className="card-body">
                <div className="table-wrapper">
                  <div className="table-title">
                    <div className="row">
                      <div className="col-sm-8">
                        <h2>Quản lý tài khoản</h2>
                      </div>
                      <div className="col-sm-4">
                        <div>
                          <button
                            onClick={() => setIsModalVisible(true)}
                            type="button"
                            className="btn btn-info add-new"
                          >
                            <i className="fa fa-plus"></i> Thêm tài khoản
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className={classes.search}>
                        <InputBase
                          placeholder={t("Admin_Other.14")}
                          value={searchString}
                          onChange={handleInputChange}
                          classes={{
                            root: classes.inputRoot,
                          }}
                        />
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div style={{paddingBottom:'230px'}} className="row">
                      <UserManageAdmin searchString={searchString} />
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

export default withRouter(OrderManagementPageAdmin);
