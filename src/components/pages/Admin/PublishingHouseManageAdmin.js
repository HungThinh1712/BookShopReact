import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import SideBarAdminPage from "../../common/SideBarAdminPage";
import { useDispatch, useSelector } from "react-redux";
import * as bookActions from "../../../actions/booksAction";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import * as publishHouseActions from "../../../actions/publishHouseAction";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import PublishingHouseManageAdmin from "../../common/PublishingHouseManageAdmin";
import Dialog from "../../common/Dialog";
import BreadCrumb from "../../common/Breadcrumbs";
import {useTranslation} from "react-i18next"

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

const PublishingHouseManagementPageAdmin = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const handleInputChange = (e) => {
    setSearchString(e.target.value);
  };
  const [page, setPage] = useState(1);
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
    await dispatch(publishHouseActions.addPublishHouse({ name: name }));
    setOpen(false);
    await dispatch(publishHouseActions.getPublishHousesRequest("", 1, 10));
    setPage(1);
  };

  return (
    <div>
      <div id="wrapper">
        <Dialog
          open={open}
          onClick={handleButtonAddClick}
          tagType="Thêm nhà xuất bản"
          onClose={handleClose}
          onChange={handleChangeName}
        ></Dialog>
        <Header notShow="notShow" />
        <SideBarAdminPage />
        <div id="content-wrapper" style={{ marginTop: "100px" }}>
          <div className="container-fluid">
            <BreadCrumb
              breadcrumb={t('Admin_Home_BreadCrumbs.7')}
              onClick={() => props.history.push("/admin")}
              onClick2={() =>
                props.history.push("/admin/pulishinghousemanagement_page")
              }
            ></BreadCrumb>
            <div className="card mb-3">
              <div className="card-body">
                <div className="table-wrapper">
                  <div className="table-title">
                    <div className="row">
                      <div className="col-sm-8">
                        <h2>{t('Admin_Home_BreadCrumbs.7')}</h2>
                      </div>
                      <div className="col-sm-4">
                        <div>
                          <button
                            onClick={handleClickOpen}
                            type="button"
                            className="btn btn-info add-new"
                          >
                            <i className="fa fa-plus"></i> {t('Admin_Other.31')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className={classes.search}>
                        <InputBase
                          placeholder={t('Admin_Other.14')}
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
                      <PublishingHouseManageAdmin page={page} setPage={setPage} searchString={searchString} />
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
    </div>
  );
};

export default withRouter(PublishingHouseManagementPageAdmin);
