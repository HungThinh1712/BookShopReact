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
import * as promotionAction from "./../../actions/promontionAction";
import * as bookAction from "./../../actions/booksAction";
import { withRouter } from "react-router-dom";
import { Input } from "antd";
import { Empty } from "antd";
import moment from "moment";
import { Modal, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { Select } from "antd";
const { Option } = Select;
const useStyles = makeStyles({
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
  },
});

const BasicTable = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(promotionAction.getAllPromontionsByMe());
    dispatch(bookAction.getAllBooksRequest());
  }, [dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const books = useSelector((state) =>
    state.books.allBooks ? state.books.allBooks : []
  );
  const [searchString, setSearchString] = useState("");

  const [tempBooks, setTempBooks] = useState([]);
  const [tempBookIs, setTempBookIs] = useState([]);

  const handleSearchStringChange = (e) => {
    setSearchString(e.target.value);

    const copiedBooks = [...books];
    const result = copiedBooks.filter(
      (x) =>
        tempBookIs.includes(x.id) &&
        x.bookName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setTempBooks(result);
  };
  const detailClick = (row) => {
    const tempBooks = books.filter((x) => row.bookIds.includes(x.id));
    setTempBooks(tempBooks);
    setIsModalVisible(true);
    setTempBookIs(tempBooks.map((x) => x.id));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSearchString("");
  };
  const rows = useSelector((state) =>
    state.promotions.allPromotionsByMe ? state.promotions.allPromotionsByMe : []
  );

  return (
    <div>
      <Modal
        title="Sản phẩm áp dụng"
        width="700px"
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Tìm kiếm sách"
          value={searchString}
          onChange={handleSearchStringChange}
          style={{ width: "50%", marginBottom: "10px" }}
        ></Input>
        <TableContainer
          style={{ maxHeight: "400px", overflow: "auto" }}
          component={Paper}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow style={{ height: "80px", fontWeight: "900" }}>
                <TableCell className={classes.header}>Tên sách</TableCell>
                <TableCell className={classes.header}>Hình ảnh</TableCell>
                <TableCell className={classes.header}>Giá</TableCell>
                <TableCell className={classes.header}>Loại bìa</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {tempBooks.map((row) => (
                  <TableRow
                    style={{ height: "80px" }}
                    className={classes.row}
                    key={row.name}
                    onClick ={() => props.history.push(`/details/${row.id}`)}
                  >
                    <TableCell style={{ width: "200px" }}>
                      {row.bookName}
                    </TableCell>
                    <TableCell>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={row.imgUrl}
                      />
                    </TableCell>
                    <TableCell>{row.price.toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</TableCell>
                    <TableCell>{row.coverType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </TableContainer>
      </Modal>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow style={{ height: "80px", fontWeight: "900" }}>
              <TableCell className={classes.header}>Mã khuyến mãi</TableCell>
              <TableCell className={classes.header}>Tên khuyến mãi</TableCell>
              <TableCell className={classes.header}>Ngày bắt đầu</TableCell>
              <TableCell className={classes.header}>Ngày kết thúc</TableCell>
              <TableCell className={classes.header}>
                Đơn hàng tối thiểu
              </TableCell>
              <TableCell className={classes.header}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          {rows.length > 0 ? (
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  style={{ height: "80px" }}
                  className={classes.row}
                  key={row.name}
                >
                  <TableCell>{row.promotionCode}</TableCell>
                  <TableCell>{row.promotionName}</TableCell>
                  <TableCell>
                    {moment(row.startDate).format("DD-MM-yyy")}
                  </TableCell>
                  <TableCell>
                    {moment(row.endDate).format("DD-MM-yyy")}
                  </TableCell>
                  <TableCell>
                    {row.minMoney
                      .toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                    đ
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Sản phẩm áp dụng">
                      <ExclamationCircleOutlined
                        onClick={() => detailClick(row)}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell />
                <TableCell />
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Chưa có mã khuyến mãi"
                />
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};
export default withRouter(BasicTable);
