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
import * as publishHouseActions from "../../actions/publishHouseAction";

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
}));

const BasicTable = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const total = useSelector((state) =>
    state.publishHouse.publishHouses.total
      ? state.publishHouse.publishHouses.total
      : 0
  );
  const paging = total % 10 === 0 ? total / 10 : Math.floor(total / 10) + 1;
  useEffect(() => {
    dispatch(
      publishHouseActions.getPublishHousesRequest(props.searchString, page, 10)
    );
  }, [dispatch, page, props.searchString]);

  const rows = useSelector((state) =>
    state.publishHouse.publishHouses.entities
      ? state.publishHouse.publishHouses.entities
      : []
  );
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handelRowClick = (row) => {
    setOpen(true);
    setItem(row);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{ height: "80px", fontWeight: "900" }}>
            <TableCell className={classes.header}>Tên NXB</TableCell>
            <TableCell className={classes.header}>Ngày tạo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              style={{ height: "80px" }}
              className={classes.row}
              key={index}
              onClick={() => handelRowClick(row)}
            >
              <TableCell component="th" scope="row" style={{ width: "150px" }}>
                {row.name}
              </TableCell>
              <TableCell style={{ width: "150px" }}>{row.createAt}</TableCell>
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
