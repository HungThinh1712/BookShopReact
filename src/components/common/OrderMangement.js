import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import * as orderActions from "./../../actions/orderAction";
import { withRouter } from "react-router-dom";
import * as CallApis from "../../constants/Apis";
import { useTranslation } from "react-i18next";
import { toastMessage } from "./ToastHelper";
import CancelIcon from "../Images/cancel.png";
import Delivery from "../Images/Delivery.png";
import Confirming from "../Images/Confirming.png";
import Deliveried from "../Images/Deliveried.png";
import Confirmed from "../Images/Confirmed.png";
import { Tabs } from "antd";
import { Modal } from "antd";
import { Input } from "antd";
import { Empty } from "antd";

const { TextArea } = Input;

const { TabPane } = Tabs;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: 600,
    fontFamily: "Roboto",
  },
  row: {
    "&:hover": {
      backgroundColor: "#f2f2f2",
      cursor: "pointer",
    },
  },
  cancel: {
    padding: "5px",
    borderRadius: "3px",
    flexWrap: "nowrap",
    "&:hover": {
      backgroundColor: "#fce38a",
      cursor: "pointer",
    },
  },
  confirm: {
    padding: "5px",
    borderRadius: "3px",
    flexWrap: "nowrap",
    "&:hover": {
      backgroundColor: "#fce38a",
      cursor: "pointer",
    },
  },
});

const BasicTable = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(0);
  const userData = useSelector((state) =>
    state.auth.userData ? state.auth.userData : null
  );
  useEffect(() => {
    dispatch(orderActions.getOrdersRequest(props.page, 4, status));
  }, [props.page, dispatch, status]);

  const rows = useSelector((state) =>
    state.order.orders.entities ? state.order.orders.entities : []
  );
  const handelRowClick = (row) => {
    props.history.push(`/order_details/${row.id}`);
  };

  const sendMessage = async () => {
    const chatMessage = {
      title: "Hủy đơn hàng",
      content: `${userData.fullName} đã hủy một  đơn hàng. Mã đơn hàng ${orderCode}. Lý do: ${reason}`,
      senderId: userData.id,
    };

    try {
      const url = CallApis.API_URL.concat(`/Notification/SendNotiToAmin`);
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(chatMessage),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log("Sending message failed.", e);
    }
  };

  const handleTabChange = (key) => {
    setStatus(key);
    props.setPage(1);
  };

  const showStatus = (status) => {
    if (status === 0) {
      return (
        <div>
          <img
            style={{ width: "40px", height: "30px", marginRight: "5px" }}
            src={Confirming}
          ></img>
          <span style={{ fontWeight: "800" }}>Chờ xác nhận</span>
        </div>
      );
    } else if (status === 1) {
      return (
        <div>
          <img
            style={{ width: "40px", height: "30px", marginRight: "5px" }}
            src={Confirmed}
          ></img>
          <span style={{ fontWeight: "800" }}>Đã xác nhận</span>
        </div>
      );
    } else if (status === 2) {
      return (
        <div>
          <img
            style={{ width: "40px", height: "30px", marginRight: "5px" }}
            src={Delivery}
          ></img>
          <span style={{ fontWeight: "800" }}>Đang giao hàng</span>
        </div>
      );
    } else if (status === 3) {
      return (
        <div>
          <img
            style={{ width: "40px", height: "30px", marginRight: "5px" }}
            src={Deliveried}
          ></img>
          <span style={{ fontWeight: "800" }}>Đã giao hàng</span>
        </div>
      );
    } else {
      return (
        <div>
          <img
            style={{ width: "40px", height: "30px", marginRight: "5px" }}
            src={CancelIcon}
          ></img>
          <span style={{ fontWeight: "800" }}>Đã hủy</span>
        </div>
      );
    }
  };
  const [reason, setReason] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderCode, setOrderCode] = useState(null);

  const handleResonChange = (e) => {
    setReason(e.target.value);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const handleCancelOrderClick = (row) => {
    setModalVisible(true);
    setOrderId(row.id);
    setOrderCode(row.orderId);
  };
  const handleOkClick = async () => {
    await dispatch(orderActions.cancelOder(orderId, reason));
    setModalVisible(false);
    props.setPage(1);
    await dispatch(orderActions.getOrdersRequest(props.page, 4, 0));
    sendMessage();
  };
  const handleConfirmOrderClick = async (row) => {
    await dispatch(orderActions.confirmOder(row.id, 3));
    await dispatch(orderActions.getOrdersRequest(props.page, 4, 2));
  };

  return (
    <div>
      <Modal
        title="Hủy đơn hàng"
        visible={modalVisible}
        style={{ top: 100 }}
        onOk={() => handleOkClick()}
        onCancel={() => setModalVisible(false)}
        okText="Xác nhận"
        cancelText="Thoát"
      >
        <label style={{ fontSize: "12px", fontWeight: "600" }}>Lý do hủy</label>
        <TextArea value={reason} onChange={handleResonChange} rows={4} />
      </Modal>
      <Tabs defaultActiveKey="0" onChange={handleTabChange}>
        <TabPane tab="Đang chờ xác nhận" key="0">
          <TableContainer component={Paper}>
            {rows.length > 0 ? (
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ height: "70px", fontWeight: "900" }}>
                    <TableCell className={classes.header}>
                      {t("Admin_Other.5")}
                    </TableCell>
                    <TableCell className={classes.header}>
                      {t("Admin_Other.6")}
                    </TableCell>
                    <TableCell className={classes.header}>
                      <span style={{ fontWeight: "900" }}>Sản phẩm</span>
                    </TableCell>
                    <TableCell className={classes.header}>
                      <span style={{ fontWeight: "900" }}>Tổng tiền</span>
                    </TableCell>
                    <TableCell className={classes.header}>
                      <span style={{ fontWeight: "900" }}>Trạng thái</span>
                    </TableCell>
                    <TableCell className={classes.header}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      onClick={() => handelRowClick(row)}
                      style={{ height: "80px" }}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ width: "150px" }}
                      >
                        {row.orderId}
                      </TableCell>
                      <TableCell style={{ width: "150px" }}>
                        {row.createAt}
                      </TableCell>
                      <TableCell style={{ width: "200px" }}>
                        {row.description}
                      </TableCell>
                      <TableCell>
                        {(row.totalMoney + row.shippingFee - row.discountMoney)
                          .toString()
                          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                        đ
                      </TableCell>
                      <TableCell>{showStatus(row.status)}</TableCell>
                      <TableCell style={{ minWidth: "150px" }}>
                        <span
                          onClick={(e) => {
                            handleCancelOrderClick(row);
                            e.stopPropagation();
                          }}
                          className={classes.cancel}
                          style={{ fontWeight: "600", color: "#114b5f" }}
                        >
                          Hủy đơn hàng
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Empty description="Chưa có đơn hàng" />
            )}
          </TableContainer>
        </TabPane>
        <TabPane tab="Đã xác nhận" key="1">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              {rows.length > 0 ? (
                <div>
                  {" "}
                  <TableHead>
                    <TableRow style={{ height: "80px", fontWeight: "900" }}>
                      <TableCell className={classes.header}>
                        {t("Admin_Other.5")}
                      </TableCell>
                      <TableCell className={classes.header}>
                        {t("Admin_Other.6")}
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Sản phẩm</span>
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Tổng tiền</span>
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Trạng thái</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        onClick={() => handelRowClick(row)}
                        style={{ height: "80px" }}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: "200px" }}
                        >
                          {row.orderId}
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {row.createAt}
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {row.description}
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {(
                            row.totalMoney +
                            row.shippingFee -
                            row.discountMoney
                          )
                            .toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                          đ
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {showStatus(row.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </div>
              ) : (
                <Empty description="Chưa có đơn hàng" />
              )}
            </Table>
          </TableContainer>
        </TabPane>
        <TabPane tab="Đang giao hàng" key="2">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              {rows.length > 0 ? (
                <div>
                  <TableHead>
                    <TableRow style={{ height: "80px", fontWeight: "900" }}>
                      <TableCell className={classes.header}>
                        {t("Admin_Other.5")}
                      </TableCell>
                      <TableCell className={classes.header}>
                        {t("Admin_Other.6")}
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Sản phẩm</span>
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Tổng tiền</span>
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Trạng thái</span>
                      </TableCell>
                      <TableCell className={classes.header}>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        onClick={() => handelRowClick(row)}
                        style={{ height: "80px" }}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: "150px" }}
                        >
                          {row.orderId}
                        </TableCell>
                        <TableCell style={{ width: "150px" }}>
                          {row.createAt}
                        </TableCell>
                        <TableCell style={{ width: "150px" }}>
                          {row.description}
                        </TableCell>
                        <TableCell style={{ width: "150px" }}>
                          {(
                            row.totalMoney +
                            row.shippingFee -
                            row.discountMoney
                          )
                            .toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                          đ
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {showStatus(row.status)}
                        </TableCell>
                        <TableCell style={{ minWidth: "180px" }}>
                          <span
                            onClick={(e) => {
                              handleConfirmOrderClick(row);
                              e.stopPropagation();
                            }}
                            className={classes.confirm}
                            style={{ fontWeight: "600", color: "#114b5f" }}
                          >
                            Xác nhận nhận hàng
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </div>
              ) : (
                <Empty description="Chưa có đơn hàng" />
              )}
            </Table>
          </TableContainer>
        </TabPane>
        <TabPane tab="Đã giao hàng" key="3">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              {rows.length > 0 ? (
                <div>
                  {" "}
                  <TableHead>
                    <TableRow style={{ height: "80px", fontWeight: "900" }}>
                      <TableCell className={classes.header}>
                        {t("Admin_Other.5")}
                      </TableCell>
                      <TableCell className={classes.header}>
                        {t("Admin_Other.6")}
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Sản phẩm</span>
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Tổng tiền</span>
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Trạng thái</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        onClick={() => handelRowClick(row)}
                        style={{ height: "80px" }}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: "200px" }}
                        >
                          {row.orderId}
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {row.createAt}
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {row.description}
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {(
                            row.totalMoney +
                            row.shippingFee -
                            row.discountMoney
                          )
                            .toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                          đ
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {showStatus(row.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </div>
              ) : (
                <Empty description="Chưa có đơn hàng" />
              )}
            </Table>
          </TableContainer>
        </TabPane>
        <TabPane tab="Đã hủy" key="4">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              {rows.length > 0 ? (
                <div>
                  {" "}
                  <TableHead>
                    <TableRow style={{ height: "80px", fontWeight: "900" }}>
                      <TableCell className={classes.header}>
                        {t("Admin_Other.5")}
                      </TableCell>
                      <TableCell className={classes.header}>
                        {t("Admin_Other.6")}
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Sản phẩm</span>
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Tổng tiền</span>
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Trạng thái</span>
                      </TableCell>
                      <TableCell className={classes.header}>
                        <span style={{ fontWeight: "900" }}>Lý do</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        onClick={() => handelRowClick(row)}
                        style={{ height: "80px" }}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: "200px" }}
                        >
                          {row.orderId}
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {row.createAt}
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {row.description}
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {(
                            row.totalMoney +
                            row.shippingFee -
                            row.discountMoney
                          )
                            .toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                          đ
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {showStatus(row.status)}
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {row.cancelReason}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </div>
              ) : (
                <Empty description="Chưa có đơn hàng"></Empty>
              )}
            </Table>
          </TableContainer>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default withRouter(BasicTable);
