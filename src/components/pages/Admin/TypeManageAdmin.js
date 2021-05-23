import React, { useState } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import SideBarAdminPage from "../../common/SideBarAdminPage";
import { useDispatch } from "react-redux";
import * as typesActions from "../../../actions/typesAction";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import TypeManageAdmin from "../../common/TypeManageAdmin";
import Dialog from "../../common/Dialog";
import BreadCrumb from "../../common/Breadcrumbs";


const useStyles = makeStyles((theme) => ({
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "30%",
    backgroundColor: "white",
    borderRadius: theme.shape.borderRadius,
    border: "solid",
    borderWidth: "1px",
    height: "35px",
    [theme.breakpoints.down("xs")]: {
      width: "80ch",
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "80%",
    pointerEvents: "none",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },

  inputRoot: {
    color: "black",
    marginLeft: "10px",
    flex: 26,
    [theme.breakpoints.up("sm")]: {
      width: "80ch",
    },
  },
}));

const TypeManagementPageAdmin = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const handleInputChange = (e) => {
    setSearchString(e.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonAddClick = async () => {
    await dispatch(typesActions.addType({ name: name }));
    setOpen(false);
    await dispatch(typesActions.getTypesRequest("", 1, 10));
    setPage(1);
  };

  return (
    <div>
      <div id="wrapper">
        <Dialog
          open={open}
          tagType="Thêm thể loại"
          onClick={handleButtonAddClick}
          onClose={handleClose}
          onChange={handleChangeName}
        ></Dialog>
        <Header notShow="notShow" />
        <SideBarAdminPage />
        <div id="content-wrapper" style={{ marginTop: "100px" }}>
          <div className="container-fluid">
          <BreadCrumb 
            breadcrumb="Quản lý loại sách" onClick={()=>props.history.push("/admin")} onClick2={()=>props.history.push("/admin/typemanagement_page")}>
          </BreadCrumb>
            <div className="card mb-3">
              <div className="card-body">
                <div className="table-wrapper">
                  <div className="table-title">
                    <div className="row">
                      <div className="col-sm-8">
                        <h2> Quản lý loại sách </h2>
                      </div>
                      <div className="col-sm-4">
                        <div>
                          <button
                            onClick={handleClickOpen}
                            type="button"
                            className="btn btn-info add-new"
                          >
                            <i className="fa fa-plus"> </i> Thêm loại sách
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className={classes.search}>
                        <InputBase
                          placeholder="Tìm kiếm loại sách..."
                          value={searchString}
                          onChange={handleInputChange}
                          classes={{
                            root: classes.inputRoot,
                          }}
                        />
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div className="row">
                      <TypeManageAdmin page={page} setPage={setPage} searchString={searchString} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "180px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default withRouter(TypeManagementPageAdmin);
