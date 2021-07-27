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
import { withRouter } from "react-router-dom";
import Pagination from "../common/Pagination";
import * as userActions from "../../actions/userAction";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toastMessage } from "./ToastHelper";
import * as authActions from "../../actions/authAction";
import { Input } from "antd";
import { Button } from "antd";
import { DatePicker } from "antd";
import { StopOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Tooltip, Popconfirm } from "antd";
import { PowerOffOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: 900,
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
  icon: {
    padding: "5px",
    borderRadius: "5px",
    marginLeft: "15px",
    fontSize: "20px",
    "&:hover": {
      backgroundColor: "#FFBD9B",
      cursor: "pointer",
    },
  },
}));

const BasicTable = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setPassword(null);
    setConfirmPassword(null);
  };

  const total = useSelector((state) =>
    state.users.users.total ? state.users.users.total : 0
  );
  const paging = total % 10 === 0 ? total / 10 : Math.floor(total / 10) + 1;
  useEffect(() => {
    dispatch(userActions.getUsersRequest(page, props.searchString, 10));
  }, [page, props.searchString, dispatch]);

  const rows = useSelector((state) =>
    state.users.users.entities ? state.users.users.entities : []
  );
  const [row, setRow] = useState(null);
  const handelRowClick = (row) => {
    setRow(row);
    setOpen(true);
    setEmail(row.email);
    setFullName(row.fullName);
  };
  //data client
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [fullName, setFullName] = useState(null);

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordInputChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (password === null || confirmPassword === null)
      toastMessage("Vui lòng nhập đầy đủ thông tin");
    // else if (password != confirmPassword)
    //   toastMessage("Mật khẩu không trùng nhau");
    else {
      const userData = { email, password };
      await dispatch(authActions.changePasswordByAdmin(userData));
      setOpen(false);
      setPassword(null);
      setConfirmPassword(null);
    }
  };

  const onConfirm = async (row, isActivate) => {
    await dispatch(userActions.deactivateOrActivate(row.id, isActivate));
    await dispatch(userActions.getUsersRequest(page, "", 10));
  };
  return (
    <TableContainer component={Paper}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <span style={{ fontWeight: "bold" }}>Cập nhật mật khẩu</span>
        </DialogTitle>
        <DialogContent>
          <div className="updateForm">
            <label style={{ fontSize: "12px", fontWeight: "600" }}>
              Họ và tên
            </label>
            <Input
              value={fullName}
              style={{
                borderRadius: "5px",
                width: "400px",
                marginBottom: "10px",
              }}
              type="text"
              disabled
              placeholder="Nhập họ và tên"
            />
            <label style={{ fontSize: "12px", fontWeight: "600" }}>Email</label>
            <Input
              value={email}
              disabled
              style={{
                borderRadius: "5px",
                width: "400px",
                marginBottom: "10px",
              }}
              type="text"
              placeholder="Nhập email"
            />
            <label style={{ fontSize: "12px", fontWeight: "600" }}>
              Mật khẩu
            </label>
            <Input
              style={{
                borderRadius: "5px",
                width: "400px",
                marginBottom: "10px",
              }}
              type="password"
              onChange={handlePasswordInputChange}
              placeholder="Nhập mật khẩu"
            />
            <label style={{ fontSize: "12px", fontWeight: "600" }}>
              Xác nhận mật khẩu
            </label>
            <Input
              style={{
                borderRadius: "5px",
                width: "400px",
                marginBottom: "10px",
              }}
              type="password"
              onChange={handleConfirmPasswordInputChange}
              placeholder="Xác nhận mật khẩu"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            style={{ background: "#49654e", color: "white" }}
            onClick={handleSubmit}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{ height: "80px", fontWeight: "900" }}>
            <TableCell className={classes.header}>
              {t("Admin_Other.9")}
            </TableCell>
            <TableCell className={classes.header}>Email</TableCell>
            <TableCell className={classes.header}>
              <span style={{ fontWeight: "900" }}>Số điện thoại</span>
            </TableCell>
            <TableCell className={classes.header}>
              {t("Admin_Other.16")}
            </TableCell>
            <TableCell className={classes.header}>
              <span style={{ fontWeight: "900" }}>Địa chỉ</span>
            </TableCell>
            <TableCell className={classes.header}>
              <span style={{ fontWeight: "900" }}>Trạng thái</span>
            </TableCell>
            <TableCell className={classes.header}>
              <span style={{ fontWeight: "900" }}>Thao tác</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              style={{ height: "80px" }}
              className={classes.row}
              key={index}
              onDoubleClick={() => handelRowClick(row)}
            >
              <TableCell component="th" scope="row" style={{ width: "150px" }}>
                {row.fullName}
              </TableCell>
              <TableCell style={{ width: "150px" }}>{row.email}</TableCell>
              <TableCell style={{ width: "150px" }}>
                {row.phone ? row.phone : "Chưa cập nhật số điện thoại"}
              </TableCell>
              <TableCell style={{ width: "150px" }}>
                {row.birthDay === "01-01-0001"
                  ? "Chưa cập nhật ngày sinh"
                  : row.birthDay}
              </TableCell>
              <TableCell>
                {row.specificAddress
                  ? row.specificAddress
                  : "Chưa cập nhật địa chỉ"}
              </TableCell>
              <TableCell style={{ width: "150px" }}>
                {row.isActive === true ? (
                  <Tag color="#108ee9">Đã kích hoạt</Tag>
                ) : (
                  <Tag color="#f50">Chưa kích hoạt</Tag>
                )}
              </TableCell>
              <TableCell style={{ width: "100px" }}>
                {row.isActive === true ? (
                  <Popconfirm
                    title="Bạn có chắc muốn hủy kích hoạt user này?"
                    okText="Đồng ý"
                    cancelText="Hủy"
                    onConfirm={() => onConfirm(row, false)}
                  >
                    <StopOutlined className={classes.icon} />
                  </Popconfirm>
                ) : (
                  <Popconfirm
                    title="Bạn có chắc muốn kích hoạt user này?"
                    okText="Đồng ý"
                    cancelText="Hủy"
                    onConfirm={() => onConfirm(row, true)}
                  >
                    <PoweroffOutlined className={classes.icon} />
                  </Popconfirm>
                )}
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
