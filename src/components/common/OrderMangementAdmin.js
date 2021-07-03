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
import * as orderActions from "../../actions/orderAction";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import { Tag, Tooltip } from "antd";
import Button from "@material-ui/core/Button";
import Pagination from "../common/Pagination";
import * as CallApis from "../../constants/Apis";
import Dialog from "../common/DialogDetailItemAdmin";
import { useTranslation } from "react-i18next";
import CancelIcon from "../Images/cancel.png";
import { Tabs } from "antd";
import { Input } from "antd";

const { TextArea } = Input;
const { TabPane } = Tabs;

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 1000,
    border: "solid",
    borderWidth: "2px",
  },
  header: {
    fontWeight: 600,
  },

  confirm: {
    backgroundColor: "#fce38a",
    border: "none !important",
    color: "black",
    "&:hover": {
      backgroundColor: "#f3819",
      cursor: "pointer",
      color: "black",
    },
  },
  cancelButton: {
    backgroundColor: "#f38181",
    border: "none !important",
    color: "black",
    "&:hover": {
      backgroundColor: "#f3819",
      cursor: "pointer",
      color: "black",
    },
  },
  delivery: {
    backgroundColor: "#fce38a",
    border: "none !important",
    color: "black",
    "&:hover": {
      backgroundColor: "#f38181",
      cursor: "pointer",
      color: "black",
    },
  },

  row: {
    "&:hover": {
      backgroundColor: "#f2f2f2",
      cursor: "pointer",
    },
    pagination: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: "auto",
        marginRight: "120px",
      },
      [theme.breakpoints.up("lg")]: {
        marginLeft: "auto",
        marginRight: "120px",
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: "auto",
        marginRight: "0",
      },
    },
  },
}));

const BasicTable = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [statusKey, setStatusKey] = useState(0);

  const total = useSelector((state) =>
    state.order.orders.total ? state.order.orders.total : 0
  );
  const paging = total % 10 === 0 ? total / 10 : Math.floor(total / 10) + 1;
  useEffect(() => {
    dispatch(orderActions.getAllOrdersRequest(page, 10, statusKey));
  }, [dispatch, page, statusKey]);

  const handleTabChange = (key) => {
    setStatusKey(key);
    setPage(1);
  };

  const rows = useSelector((state) =>
    state.order.orders.entities ? state.order.orders.entities : []
  );

  //Cancel
  const [reason, setReason] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [userId,setUserId] = useState(null);
  const [orderCode, setOrderCode] = useState(null);

  const handleResonChange = (e) => {
    setReason(e.target.value);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const handleCancelOrderClick = (row) => {
    setModalVisible(true);
    setOrderId(row.id);
    setOrderCode(row.orderId);
    setUserId(row.userId)
  };
  const handleOkClick = async () => {
    await dispatch(orderActions.cancelOder(orderId, reason));
    setModalVisible(false);
    setPage(1);
    await dispatch(orderActions.getOrdersRequest(page, 4, 0));
    sendMessage(userId,orderId,orderCode,4);
  };
 

  const sendMessage = async (userId, id, orderId, status) => {
    let chatMessage = null;
    if (status === 1) {
      chatMessage = {
        title: "Xác nhận đơn hàng",
        content: `Đơn hàng của bạn đã được xác nhận bởi quản trị viên. Mã đơn hàng: ${orderId}`,
        userId: userId,
        orderCode: orderId,
        orderId: id,
        type: "Confirm",
      };
    } else if (status === 2) {
      chatMessage = {
        title: "Shipper đang giao hàng",
        content: `Đơn hàng của bạn đã được nhận bởi Shipper. Mã đơn hàng: ${orderId}. Dự kiến giao hàng từ 3-5 ngày kể từ lúc nhận thông báo này.`,
        userId: userId,
        orderCode: orderId,
        orderId: id,
        type: "Delivery",
      };
    } else if (status === 3) {
      chatMessage = {
        title: "Đã giao hàng",
        content: `Đơn hàng của bạn đã được giao. Mã đơn hàng: ${orderId}. Bạn vui lòng xác nhận nhận hàng nếu sản phẩm đúng như mong muốn của bạn. Hệ thống sẽ tự cập nhật trạng thái đơn hàng sau 2 ngày kể từ lúc nhận thông báo này.`,
        userId: userId,
        orderCode: orderId,
        orderId: id,
        type: "ConfirmDelivery",
      };
    } else if (status === 4) {
      chatMessage = {
        title: "Hủy đơn hàng",
        content: `Đơn hàng của bạn bị hủy bởi quản trị viên. Mã đơn hàng: ${orderId}. Lí do: ${reason}`,
        userId: userId,
        orderCode: orderId,
        orderId: id,
        type:"Cancel"
      };
    }

    try {
      const url = CallApis.API_URL.concat(`/Notification/messages`);
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(chatMessage),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(status!==4)
        {
          await dispatch(orderActions.confirmOder(id, status));
        }
      await dispatch(orderActions.getAllOrdersRequest(page, 10, statusKey));
    } catch (e) {
      console.log("Sending message failed.", e);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (value) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [items, setItems] = useState([]);

  const handelRowClick = (row) => {
    setItems(row.items);
    handleClickOpen();
  };
  const hanldeTooltip = (row) => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{`Phí ship: ${row.shippingFee
          .toString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`}</span>
        <span>{`Tổng tiền: ${row.totalMoney
          .toString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`}</span>
      </div>
    );
  };

  const showConfirmStatus = (row) => {
    if (row.confirmStatus === 0) {
      return (
        <Button
          variant="contained"
          style={{ fontWeight: "600" }}
          size="small"
          onClick={() => sendMessage(row.userId, row.id, row.orderId, 3)}
          className={classes.delivery}
        >
          Xác nhận giao hàng
        </Button>
      );
    } else if (row.confirmStatus === 1) {
      return (
        <Tag style={{ backgroundColor: "#fce38a", color: "black" }}>
          Shipper đã giao hàng
        </Tag>
      );
    }
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
      <Dialog open={open} onClose={handleClose} items={items}></Dialog>
      <Tabs defaultActiveKey="0" onChange={handleTabChange}>
        <TabPane tab="Đang chờ xác nhận" key="0">
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow
                  style={{
                    height: "80px",
                    borderBottomStyle: "solid !important",
                  }}
                >
                  <TableCell
                    className={classes.header}
                    style={{ width: "120px" }}
                  >
                    {t("Admin_Other.5")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    {t("Admin_Other.6")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    {t("Admin_Other.7")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    {t("Admin_Other.9")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    Số điện thoại
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    Địa chỉ giao hàng
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "100px" }}
                  >
                    {t("Admin_Other.10")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "50px" }}
                  >
                    {t("Admin_Other.11")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    onDoubleClick={() => handelRowClick(row)}
                    style={{ height: "80px" }}
                    hover
                    key={index}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "120px" }}
                    >
                      {row.orderId}
                    </TableCell>
                    <TableCell style={{ width: "250px" }}>
                      {row.createAt}
                    </TableCell>
                    <TableCell style={{ width: "300px" }}>
                      {row.description}
                    </TableCell>
                    <TableCell style={{ width: "150px" }}>
                      {row.userName}
                    </TableCell>
                    <TableCell style={{ width: "200px" }}>
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell style={{ width: "400px" }}>
                      {row.userAddress}
                    </TableCell>
                    <TableCell style={{ width: "100px" }}>
                      <Tooltip
                        style={{ fontSize: "10px" }}
                        title={() => hanldeTooltip(row)}
                        size="small"
                      >
                        {(row.totalMoney + row.shippingFee)
                          .toString()
                          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                        đ
                      </Tooltip>
                    </TableCell>
                    <TableCell style={{ width: "300px" }}>
                     <div style={{display:'flex'}}>
                     <Button
                        variant="contained"
                        style={{ fontWeight: "600",marginRight:'10px' }}
                        size="small"
                        onClick={() =>
                          sendMessage(row.userId, row.id, row.orderId, 1)
                        }
                        className={classes.confirm}
                      >
                        Xác nhận
                      </Button>
                      <Button
                        variant="contained"
                        style={{ fontWeight: "600" }}
                        size="small"
                        onClick={()=>handleCancelOrderClick(row)}
                        className={classes.cancelButton}
                      >
                        Hủy
                      </Button>
                     </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {total > 10 ? (
              <div className={classes.pagination} style={{ marginTop: "10px" }}>
                <Pagination
                  total={paging}
                  onChange={handlePageChange}
                  page={page}
                />
              </div>
            ) : null}
          </TableContainer>
        </TabPane>
        <TabPane tab="Đã xác nhận" key="1">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow style={{ height: "80px", fontWeight: "600" }}>
                  <TableCell
                    className={classes.header}
                    style={{ width: "120px" }}
                  >
                    {t("Admin_Other.5")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "250px" }}
                  >
                    {t("Admin_Other.6")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "250px" }}
                  >
                    {t("Admin_Other.7")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "280px" }}
                  >
                    {t("Admin_Other.9")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    Số điện thoại
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "300px" }}
                  >
                    Địa chỉ giao hàng
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "100px" }}
                  >
                    {t("Admin_Other.10")}
                  </TableCell>
                  
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    {t("Admin_Other.11")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    onDoubleClick={() => handelRowClick(row)}
                    style={{ height: "80px" }}
                    hover
                    key={index}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "120px" }}
                    >
                      {row.orderId}
                    </TableCell>
                    <TableCell style={{ width: "200px" }}>
                      {row.createAt}
                    </TableCell>
                    <TableCell style={{ width: "300px" }}>
                      {row.description}
                    </TableCell>
                    <TableCell style={{ width: "150px" }}>
                      {row.userName}
                    </TableCell>
                    <TableCell style={{ width: "200px" }}>
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell style={{ width: "400px" }}>
                      {row.userAddress}
                    </TableCell>
                    <TableCell style={{ width: "100px" }}>
                      <Tooltip
                        style={{ fontSize: "10px" }}
                        title={() => hanldeTooltip(row)}
                        size="small"
                      >
                        {(row.totalMoney + row.shippingFee)
                          .toString()
                          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                        đ
                      </Tooltip>
                    </TableCell>                   
                    <TableCell style={{ width: "250px" }}>
                      <Button
                        variant="contained"
                        style={{ fontWeight: "600" }}
                        size="small"
                        onClick={() =>
                          sendMessage(row.userId, row.id, row.orderId, 2)
                        }
                        className={classes.delivery}
                      >
                        Giao hàng
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {total > 10 ? (
              <div className={classes.pagination} style={{ marginTop: "10px" }}>
                <Pagination
                  total={paging}
                  onChange={handlePageChange}
                  page={page}
                />
              </div>
            ) : null}
          </TableContainer>
        </TabPane>
        <TabPane tab="Đang giao hàng" key="2">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow style={{ height: "80px", fontWeight: "600" }}>
                  <TableCell
                    className={classes.header}
                    style={{ width: "120px" }}
                  >
                    {t("Admin_Other.5")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    {t("Admin_Other.7")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    {t("Admin_Other.9")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    Số điện thoại
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "300px" }}
                  >
                    Địa chỉ giao hàng
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "100px" }}
                  >
                    {t("Admin_Other.10")}
                  </TableCell>
                  
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    onDoubleClick={() => handelRowClick(row)}
                    style={{ height: "80px" }}
                    hover
                    key={index}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "120px" }}
                    >
                      {row.orderId}
                    </TableCell>

                    <TableCell style={{ width: "200px" }}>
                      {row.description}
                    </TableCell>
                    <TableCell style={{ width: "150px" }}>
                      {row.userName}
                    </TableCell>
                    <TableCell style={{ width: "200px" }}>
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell style={{ width: "200px" }}>
                      {row.userAddress}
                    </TableCell>
                    <TableCell style={{ width: "100px" }}>
                      <Tooltip
                        style={{ fontSize: "10px" }}
                        title={() => hanldeTooltip(row)}
                        size="small"
                      >
                        {(row.totalMoney + row.shippingFee)
                          .toString()
                          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                        đ
                      </Tooltip>
                    </TableCell>
                    <TableCell style={{ width: "240px" }}>
                      {showConfirmStatus(row)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {total > 10 ? (
              <div className={classes.pagination} style={{ marginTop: "10px" }}>
                <Pagination
                  total={paging}
                  onChange={handlePageChange}
                  page={page}
                />
              </div>
            ) : null}
          </TableContainer>
        </TabPane>
        <TabPane tab="Đã giao hàng" key="3">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow style={{ height: "80px", fontWeight: "600" }}>
                  <TableCell
                    className={classes.header}
                    style={{ width: "120px" }}
                  >
                    {t("Admin_Other.5")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "250px" }}
                  >
                    {t("Admin_Other.6")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "250px" }}
                  >
                    {t("Admin_Other.7")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "280px" }}
                  >
                    {t("Admin_Other.9")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    Số điện thoại
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "300px" }}
                  >
                    Địa chỉ giao hàng
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "100px" }}
                  >
                    {t("Admin_Other.10")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    onDoubleClick={() => handelRowClick(row)}
                    style={{ height: "80px" }}
                    hover
                    key={index}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "120px" }}
                    >
                      {row.orderId}
                    </TableCell>
                    <TableCell style={{ width: "250px" }}>
                      {row.createAt}
                    </TableCell>
                    <TableCell style={{ width: "300px" }}>
                      {row.description}
                    </TableCell>
                    <TableCell style={{ width: "150px" }}>
                      {row.userName}
                    </TableCell>
                    <TableCell style={{ width: "200px" }}>
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell style={{ width: "300px" }}>
                      {row.userAddress}
                    </TableCell>
                    <TableCell style={{ width: "100px" }}>
                      <Tooltip
                        style={{ fontSize: "10px" }}
                        title={() => hanldeTooltip(row)}
                        size="small"
                      >
                        {(row.totalMoney + row.shippingFee)
                          .toString()
                          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                        đ
                      </Tooltip>
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {total > 10 ? (
              <div className={classes.pagination} style={{ marginTop: "10px" }}>
                <Pagination
                  total={paging}
                  onChange={handlePageChange}
                  page={page}
                />
              </div>
            ) : null}
          </TableContainer>
        </TabPane>
        <TabPane tab="Đã hủy" key="4">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow style={{ height: "80px", fontWeight: "600" }}>
                  <TableCell
                    className={classes.header}
                    style={{ width: "120px" }}
                  >
                    {t("Admin_Other.5")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "250px" }}
                  >
                    {t("Admin_Other.6")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "250px" }}
                  >
                    {t("Admin_Other.7")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "280px" }}
                  >
                    {t("Admin_Other.9")}
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "200px" }}
                  >
                    Số điện thoại
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "300px" }}
                  >
                    Địa chỉ giao hàng
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    style={{ width: "100px" }}
                  >
                    {t("Admin_Other.10")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    onDoubleClick={() => handelRowClick(row)}
                    style={{ height: "80px" }}
                    hover
                    key={index}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "120px" }}
                    >
                      {row.orderId}
                    </TableCell>
                    <TableCell style={{ width: "250px" }}>
                      {row.createAt}
                    </TableCell>
                    <TableCell style={{ width: "300px" }}>
                      {row.description}
                    </TableCell>
                    <TableCell style={{ width: "150px" }}>
                      {row.userName}
                    </TableCell>
                    <TableCell style={{ width: "200px" }}>
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell style={{ width: "400px" }}>
                      {row.userAddress}
                    </TableCell>
                    <TableCell style={{ width: "100px" }}>
                      <Tooltip
                        style={{ fontSize: "10px" }}
                        title={() => hanldeTooltip(row)}
                        size="small"
                      >
                        {(row.totalMoney + row.shippingFee)
                          .toString()
                          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                        đ
                      </Tooltip>
                    </TableCell>
                    <TableCell style={{ width: "200px" }}>
                      <div>
                        <img
                          style={{
                            width: "40px",
                            height: "30px",
                            marginRight: "5px",
                          }}
                          src={CancelIcon}
                        ></img>
                        <span style={{ fontWeight: "800" }}>Đã hủy</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {total > 10 ? (
              <div className={classes.pagination} style={{ marginTop: "10px" }}>
                <Pagination
                  total={paging}
                  onChange={handlePageChange}
                  page={page}
                />
              </div>
            ) : null}
          </TableContainer>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default withRouter(BasicTable);
