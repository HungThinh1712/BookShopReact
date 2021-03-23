import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
import * as publishHouseActions from "../../actions/publishHouseAction";
import { withRouter } from "react-router-dom";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { toastMessage } from "./../common/ToastHelper";
import Pagination from "../common/Pagination";
import * as CallApis from "../../constants/Apis";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 250,
    height: 40,
  },
  input: {
    width: 250,
    height: 40,
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

const CustomTableCell = ({ row, col, onChange, disabled }) => {
  const classes = useStyles();
  return (
    <TableCell align="left" className={classes.tableCell}>
      <Input
        value={row[col]}
        name={col}
        className={classes.input}
        onChange={(e) => onChange(e, row)}
        disabled={disabled}
      />
    </TableCell>
  );
};

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
      publishHouseActions.getAllPublishingHouseRequest(
        page,
        props.searchString,
        10
      )
    );
  }, [page, props.searchString]);

  const [rows, setRows] = React.useState([]);

  const tempRedux = useSelector((state) =>
    state.publishHouse.publishHouses.entities
      ? state.publishHouse.publishHouses.entities
      : []
  );

  useEffect(() => {
    if (tempRedux) setRows(tempRedux);
  }, [tempRedux]);

  useEffect(() => {
    dispatch(publishHouseActions.getAllPublishingHouseRequest(page, props.searchString, 10));
  }, [page, props.searchString])

  const handleChangeName = async (id, name) => {
    const publishHouseData = { id, name };
    await dispatch(publishHouseActions.updatePublishHouse(publishHouseData));
    toastMessage("Cập nhật thành công");
  };

  const onToggleEditMode = (key) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === key) {
          return { ...row };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{ height: "80px", fontWeight: "900" }}>
            <TableCell align="left" />
            <TableCell className={classes.header}>Tên nhà xuất bản</TableCell>
            <TableCell className={classes.header}>Ngày tạo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow style={{ height: "80px" }}className={classes.row} key={index}>
              <TableCell className={classes.selectTableCell}>
                  <>
                    <IconButton aria-label="done" onClick={() => {onToggleEditMode(row.id); handleChangeName(row.id, row.name)}}>
                    <DoneIcon />
                    </IconButton>
                  </>
              </TableCell>
              <CustomTableCell {...{ row, col: "name", onChange, disabled: false}} />
              <CustomTableCell {...{ row, col: "createAt", onChange, disabled: true}} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withRouter(BasicTable);
