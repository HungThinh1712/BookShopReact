import React, { useEffect } from "react";
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
import * as typeActions from "../../actions/typesAction";
import {useTranslation} from 'react-i18next'
import Dialog from "../common/DialogAdmin";
import { Popconfirm } from "antd";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: 900,
    borderBottom:"none"
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
  deleteIcon: {
    "&:hover": {
      cursor: "pointer",
      color:'red'
    },
   
  },
}));

const BasicTable = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
    props.setPage(value);
  };

  const total = useSelector((state) =>
    state.type.types.total ? state.type.types.total : 0
  );
  const paging = total % 10 === 0 ? total / 10 : Math.floor(total / 10) + 1;
  useEffect(() => {
    dispatch(typeActions.getTypesRequest(props.searchString, props.page, 10));
  }, [dispatch, props.page, props.searchString]);

  const rows = useSelector((state) =>
    state.type.types.entities ? state.type.types.entities : []
  );
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async (id) => {
    await dispatch(typeActions.deleteType(id));
    await dispatch(typeActions.getTypesRequest("", 1, 10));
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
            <TableCell className={classes.header}>                  <span style={{fontWeight:"900"}}>Thể loại</span>
</TableCell>
            <TableCell className={classes.header}>                  <span style={{fontWeight:"900"}}>Ngày tạo</span>
</TableCell>
            <TableCell className={classes.header}></TableCell>
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
              <TableCell component="th" scope="row" style={{ width: "500px",borderBottom:"none" }}>
                {row.name}
              </TableCell>
              <TableCell style={{ width: "300px",borderBottom:"none" }}>{row.createAt}</TableCell>
              <div
                
                style={{ display:'inline-block',marginTop:'25px', marginLeft:'300px',padding:'5px' }}
                className={classes.deleteIcon}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {" "}
                <Popconfirm
                  placement="topRight"
                  title={"Bạn có chắc muốn xóa thể loại này không?"}
                  onConfirm={() => handleDelete(row.id)}
                  okText="Có"
                  cancelText="Không"
                >
                  <i
                   
                    className="fa fa-trash "
                    aria-hidden="true"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  ></i>
                </Popconfirm>
              </div>
            </TableRow>
          ))}
        </TableBody>
        <Dialog
          typeData={item}
          open={open}
          onClose={handleClose}
          tag="Cập nhật thể loại"
        ></Dialog>
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
