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
import { StopOutlined ,PoweroffOutlined } from "@ant-design/icons";
import { Tag  } from 'antd';
import * as userActions from "../../actions/userAction";
import { Tooltip, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
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
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAdminUsersRequest(props.searchString));
  }, [props.searchString, dispatch]);

  const rows = useSelector((state) =>
    state.users.adminUsers ? state.users.adminUsers : []
  );

  const onConfirm = async (row,isActivate) =>{
    await dispatch(userActions.deactivateOrActivate(row.id,isActivate))
    await dispatch(userActions.getAdminUsersRequest(""));

  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{ height: "80px", fontWeight: "900" }}>
            <TableCell className={classes.header}>Họ và Tên</TableCell>
            <TableCell className={classes.header}>Số điện thoại</TableCell>
            <TableCell className={classes.header}>Email</TableCell>
            <TableCell className={classes.header}>Vai trò</TableCell>
            <TableCell className={classes.header}>Trạng thái</TableCell>
            <TableCell className={classes.header}>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              style={{ height: "80px" }}
              className={classes.row}
              key={index}
            >
              <TableCell component="th" scope="row" style={{ width: "150px" }}>
                {row.fullName}
              </TableCell>
              <TableCell style={{ width: "200px" }}>{row.phone}</TableCell>
              <TableCell style={{ width: "250px" }}>{row.email}</TableCell>
              <TableCell>
                {row.isTopAdmin === true ? "TopAdmin" : "Admin"}
              </TableCell>
              <TableCell>
                {row.isActive === true ? <Tag color="#108ee9">Đã kích hoạt</Tag> : <Tag color="#f50">Chưa kích hoạt</Tag>}
              </TableCell>
              <TableCell>
                {row.isActive===true ? <Popconfirm
                  title="Bạn có chắc muốn hủy kích hoạt user này?"
                  okText="Đồng ý"
                  cancelText="Hủy"
                  onConfirm={()=>onConfirm(row,false)}
                >
                  <StopOutlined className={classes.icon} />
                 
                  
                </Popconfirm>: <Popconfirm
                  title="Bạn có chắc muốn kích hoạt user này?"
                  okText="Đồng ý"
                  cancelText="Hủy"
                  onConfirm={()=>onConfirm(row,true)}
                >
                  <PoweroffOutlined className={classes.icon} />
                 
                  
                </Popconfirm>}
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default withRouter(BasicTable);
