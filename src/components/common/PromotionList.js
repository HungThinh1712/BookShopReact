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
import * as promotionAction from "../../actions/promontionAction";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: 900,
    borderBottom: "none",
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
  detail: {
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgb(136, 212, 152)",
    },
  },
}));

const BasicTable = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [page, setPage] = useState(1);
  const total = useSelector((state) =>
    state.promotions.promotions.total ? state.promotions.promotions.total : 0
  );
  const paging = total % 10 === 0 ? total / 10 : Math.floor(total / 10) + 1;
  const [key,setKey] = useState(0);
  useEffect(() => {
    dispatch(promotionAction.getPromontions(page, 10,key));
  }, [dispatch, page,key]);

  const rows = useSelector((state) =>
    state.promotions.promotions.entities
      ? state.promotions.promotions.entities
      : []
  );
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };


  const handleKeyChange = (key)=>{
    setKey(key);
    setPage(1);
  }
  return (
    <Tabs defaultActiveKey="0" onChange={handleKeyChange}>
      <TabPane tab="Chưa kích hoạt" key="0">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow style={{ height: "80px", fontWeight: "900" }}>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Mã khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Tên khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Loại khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Ngày bắt đầu
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Ngày kết thúc
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Tác vụ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  style={{ height: "80px" }}
                  className={classes.row}
                  key={index}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "500px", borderBottom: "none" }}
                  >
                    {row.promotionCode}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {row.promotionName}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {row.promotionType === 0 ? "Giảm số tiền" : "FreeShip"}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {moment(row.startDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {moment(row.endDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    <span
                      onClick={() =>
                        props.history.push(`/admin/promotiondetail/${row.id}`)
                      }
                      className={classes.detail}
                      style={{ padding: "5px", fontWeight: "600" }}
                    >
                      Xem chi tiết
                    </span>
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
      <TabPane tab="Đã kích hoạt" key="1">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow style={{ height: "80px", fontWeight: "900" }}>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Mã khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Tên khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Loại khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Ngày bắt đầu
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Ngày kết thúc
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Tác vụ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  style={{ height: "80px" }}
                  className={classes.row}
                  key={index}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "500px", borderBottom: "none" }}
                  >
                    {row.promotionCode}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {row.promotionName}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {row.promotionType === 0 ? "Giảm số tiền" : "FreeShip"}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {moment(row.startDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {moment(row.endDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    <span
                      onClick={() =>
                        props.history.push(`/admin/promotiondetail/${row.id}`)
                      }
                      className={classes.detail}
                      style={{ padding: "5px", fontWeight: "600" }}
                    >
                      Xem chi tiết
                    </span>
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
      <TabPane tab="Đang diễn ra" key="2">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow style={{ height: "80px", fontWeight: "900" }}>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Mã khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Tên khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Loại khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Ngày bắt đầu
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Ngày kết thúc
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Tác vụ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  style={{ height: "80px" }}
                  className={classes.row}
                  key={index}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "500px", borderBottom: "none" }}
                  >
                    {row.promotionCode}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {row.promotionName}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {row.promotionType === 0 ? "Giảm số tiền" : "FreeShip"}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {moment(row.startDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {moment(row.endDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    <span
                      onClick={() =>
                        props.history.push(`/admin/promotiondetail/${row.id}`)
                      }
                      className={classes.detail}
                      style={{ padding: "5px", fontWeight: "600" }}
                    >
                      Xem chi tiết
                    </span>
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
      <TabPane tab="Đã hết hạn" key="3">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow style={{ height: "80px", fontWeight: "900" }}>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Mã khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Tên khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Loại khuyến mãi
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Ngày bắt đầu
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Ngày kết thúc
                </TableCell>
                <TableCell
                  className={classes.header}
                  style={{ width: "500px" }}
                >
                  Tác vụ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  style={{ height: "80px" }}
                  className={classes.row}
                  key={index}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "500px", borderBottom: "none" }}
                  >
                    {row.promotionCode}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {row.promotionName}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {row.promotionType === 0 ? "Giảm số tiền" : "FreeShip"}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {moment(row.startDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    {moment(row.endDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell style={{ width: "300px", borderBottom: "none" }}>
                    <span
                      onClick={() =>
                        props.history.push(`/admin/promotiondetail/${row.id}`)
                      }
                      className={classes.detail}
                      style={{ padding: "5px", fontWeight: "600" }}
                    >
                      Xem chi tiết
                    </span>
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
  );
};
export default withRouter(BasicTable);
