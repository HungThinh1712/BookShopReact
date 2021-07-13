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
import * as commentActions from "./../../actions/commentAction";
import { withRouter } from "react-router-dom";
import * as CallApis from "../../constants/Apis";
import Pagination from "../common/Pagination";
import { Tag } from "antd";
import { useTranslation } from "react-i18next";
import StarIcon from "@material-ui/icons/Star";
import Rating from "@material-ui/lab/Rating";
import { yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: 900,
  },
  button: {
    background: "#2db7f5",
    padding: "5px 10px 5px 10px",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const BasicTable = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(commentActions.getCommentsByAdminRequest(props.page, 12));
  }, [props.page, dispatch]);
  const handlePageChange = (event, value) => {
    props.setPage(value);
  };

  const total = useSelector((state) =>
    state.comment.adminComments.total ? state.comment.adminComments.total : 0
  );
  const paging = total % 12 === 0 ? total / 12 : Math.floor(total / 12) + 1;
  const rows = useSelector((state) =>
    state.comment.adminComments.entities
      ? state.comment.adminComments.entities
      : []
  );

  const handelRowClick = async (row) => {
    // props.history.push(`/details/${row.bookId}`);
    await dispatch(commentActions.checkCommemt(row.id));
    await dispatch(commentActions.getCommentsByAdminRequest(1, 12));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{ height: "80px", fontWeight: "900" }}>
            <TableCell className={classes.header}>
              {t("Customer_Management.22")}
            </TableCell>
            <TableCell className={classes.header}>
              {t("Admin_Book.6")}
            </TableCell>
            <TableCell className={classes.header}>
              {" "}
              <span style={{ fontWeight: "900" }}>Tiêu đề</span>
            </TableCell>
            <TableCell className={classes.header}>
              {" "}
              <span style={{ fontWeight: "900" }}>Nội dung</span>
            </TableCell>
            <TableCell className={classes.header}>
              {t("Customer_Management.21")}
            </TableCell>
            <TableCell className={classes.header}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              style={{ height: "80px" }}
              className={classes.row}
              key={row.name}
            >
              <TableCell>{row.createAt}</TableCell>
              <TableCell>{row.bookName}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>
                <Rating readOnly value={row.rate} />
              </TableCell>
              <TableCell>
                {row.isCheck === true ? (
                  <Tag color="#87d068">Đã duyệt</Tag>
                ) : (
                  <span
                    className={classes.button}
                    onClick={() => handelRowClick(row)}
                  >
                    Duyệt
                  </span>
                )}
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
            page={props.page}
          />
        </div>
      ) : null}
    </TableContainer>
  );
};
export default withRouter(BasicTable);
