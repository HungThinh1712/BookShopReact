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
import * as typeActions from "../../actions/typesAction";
import { withRouter } from "react-router-dom";
import { toastMessage } from "./../common/ToastHelper";
import Pagination from "../common/Pagination";

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
    state.type.types.total ? state.type.types.total : 0
  );
  const paging = total % 8 === 0 ? total / 8 : Math.floor(total / 8) + 1;

  useEffect(() => {
    if (props.flagButtonAdd) {
      setPage(1);
      props.setFlagButtonAdd(false);
    } else {
      dispatch(typeActions.getTypesRequest(props.searchString, page, 8));
    }
  }, [page, dispatch, props.flagButtonAdd, props.searchString]);

  useEffect(() => {
    if (props.flagSearchString) {
      setPage(1);
      dispatch(typeActions.getTypesRequest(props.searchString, page, 8));
      props.setFlagSearchString(false);
    }
  }, [props.flagSearchString, dispatch, page]);

  const handleChangeName = async (id, name) => {
    const typeData = { id, name };
    await dispatch(typeActions.updateType(typeData));
    toastMessage("Cập nhật thành công");
  };

  const [rows, setRows] = React.useState([]);

  const types = useSelector((state) =>
    state.type.types.entities ? state.type.types.entities : []
  );

  useEffect(() => {
    if (types) setRows(types);
  }, [types]);

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
            <TableCell className={classes.header}>Tên loại sách</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              style={{ height: "80px" }}
              className={classes.row}
              key={index}
            >
              <TableCell className={classes.selectTableCell}>
                <>
                  <IconButton
                    aria-label="done"
                    onClick={() => {
                      onToggleEditMode(row.id);
                      handleChangeName(row.id, row.name);
                    }}
                  >
                    <DoneIcon />
                  </IconButton>
                </>
              </TableCell>
              <CustomTableCell
                {...{ row, col: "name", onChange, disabled: false }}
              />
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