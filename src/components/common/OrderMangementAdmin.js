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
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Button, Tag, Tooltip } from "antd";
import Pagination from "../common/Pagination";
import * as CallApis from "../../constants/Apis";
import Dialog from "../common/DialogDetailItemAdmin";
import { useTranslation } from "react-i18next";
import CancelIcon from "../Images/cancel.png";
import Delivery from "../Images/Delivery.jpg"
import Confirming from "../Images/Confirming.png"
import Deliveried from "../Images/Deliveried.png"
import Confirmed from "../Images/Confirmed.png"
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 1000,
    marginLeft: "0px !important",
    marginRight: "0px",
  },
  header: {
    fontWeight: 900,
  },

  confirm: {
    backgroundColor: "#eaffd0",
    border: "none !important",
    color: "black",
    "&:hover": {
      backgroundColor: "#fce38a",
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

  const total = useSelector((state) =>
    state.order.orders.total ? state.order.orders.total : 0
  );
  const paging = total % 10 === 0 ? total / 10 : Math.floor(total / 10) + 1;
  useEffect(() => {
    dispatch(orderActions.getAllOrdersRequest(page, 10));
  }, [dispatch, page]);

  const rows = useSelector((state) =>
    state.order.orders.entities ? state.order.orders.entities : []
  );
  // const handelRowClick = (row) =>{

  //   props.history.push('/order_details', {itemsInOrder:row.items})
  // }
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const url = CallApis.API_URL.concat(`/hubs/notification`);
    const newConnection = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          connection.on("ReceiveMessage", (message) => {
            if (message != null) {
              dispatch(orderActions.getAllOrdersRequest(page, 10));
            }
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [dispatch, connection, page]);

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
    } else if (status === 4) {
      chatMessage = {
        title: "Xác nhận đơn hàng",
        content: `Đơn hàng của bạn đã được xác nhận bởi quản trị viên. Mã đơn hàng: ${orderId}`,
        userId: userId,
        orderCode: orderId,
        orderId: id,
      };
    }

    dispatch(orderActions.confirmOder(id, status));

    try {
      const url = CallApis.API_URL.concat(`/Notification/messages`);
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

  const showActions = (row) => {
    if (row.status === 0) {
      return (
        <Button
          type="primary"
          size="small"
          onClick={() => sendMessage(row.userId, row.id, row.orderId, 1)}
          className={classes.confirm}
        >
          Xác nhận
        </Button>
      );
    }
    if (row.status === 1) {
      return (
        <Button
          size="small"
          onClick={() => sendMessage(row.userId, row.id, row.orderId, 2)}
          type="primary"
          className={classes.delivery}
        >
          Giao hàng
        </Button>
      );
    }
    if (row.status === 2 || row.status == 3 || row.status == 4) {
      return <Tag color="#ff8419">Không thể hủy</Tag>;
    }
  };

  //Dialog

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
  const showStatus = (status) => {
    if (status === 0) {
      return (
        <div>
        <img style={{width:'40px',height:"30px",marginRight:"5px"}} src={Confirming}></img>
        <span style={{fontWeight:"800"}}>Chờ xác nhận</span>
      </div>
      );
    } else if (status === 1) {
      return <div>
      <img style={{width:'40px',height:"30px",marginRight:"5px"}} src={Confirmed}></img>
      <span style={{fontWeight:"800"}}>Đã xác nhận</span>
    </div>;
    } else if (status === 2) {
      return <div>
      <img style={{width:'40px',height:"30px",marginRight:"5px"}} src={Delivery}></img>
      <span style={{fontWeight:"800"}}>Đang giao hàng</span>
    </div>;
    } else if (status === 3) {
      return <div>
      <img style={{width:'40px',height:"30px",marginRight:"5px"}} src={Deliveried}></img>
      <span style={{fontWeight:"800"}}>Đã giao hàng</span>
    </div>
    } else {
      return (
        <div>
          <img style={{width:'40px',height:"30px",marginRight:"5px"}} src={CancelIcon}></img>
          <span style={{fontWeight:"800"}}>Đã hủy</span>
        </div>
      );
    }
  };
  return (
    <TableContainer component={Paper}>
      <Dialog open={open} onClose={handleClose} items={items}></Dialog>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{ height: "80px", fontWeight: "600" }}>
            <TableCell className={classes.header} style={{ width: "120px" }}>
              {t("Admin_Other.5")}
            </TableCell>
            <TableCell className={classes.header} style={{ width: "250px" }}>
              {t("Admin_Other.6")}
            </TableCell>
            <TableCell className={classes.header} style={{ width: "250px" }}>
              {t("Admin_Other.7")}
            </TableCell>
            <TableCell className={classes.header} style={{ width: "280px" }}>
              {t("Admin_Other.9")}
            </TableCell>
            <TableCell className={classes.header} style={{ width: "200px" }}>
              Số điện thoại
            </TableCell>
            <TableCell className={classes.header} style={{ width: "300px" }}>
              Địa chỉ giao hàng
            </TableCell>
            <TableCell className={classes.header} style={{ width: "100px" }}>
              {t("Admin_Other.10")}
            </TableCell>
            <TableCell className={classes.header} style={{ width: "500px" }}>
              Trạng thái
            </TableCell>
            <TableCell className={classes.header} style={{ width: "50px" }}>
              {t("Admin_Other.11")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              onDoubleClick={() => handelRowClick(row)}
              style={{ height: "80px" }}
              className={classes.row}
              key={index}
            >
              <TableCell component="th" scope="row" style={{ width: "120px" }}>
                {row.orderId}
              </TableCell>
              <TableCell style={{ width: "250px" }}>{row.createAt}</TableCell>
              <TableCell style={{ width: "300px" }}>
                {row.description}
              </TableCell>
              <TableCell style={{ width: "150px" }}>{row.userName}</TableCell>
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
              <TableCell style={{ width: "500" }}>
                {showStatus(row.status)}
              </TableCell>
              <TableCell style={{ width: "50px" }}>
                {showActions(row)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {total > 10 ? (
        <div className={classes.pagination} style={{ marginTop: "10px" }}>
          <Pagination total={paging} onChange={handlePageChange} page={page} />
        </div>
      ) : null}
    </TableContainer>
  );
};
export default withRouter(BasicTable);
