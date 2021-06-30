import React, {  useState } from "react";
import Header from "../../common/Header";
import SideBarAdminPage from "../../common/SideBarAdminPage";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import PromotionTable from "../../common/PromotionList";
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
  

  return (
    <div>
      <div id="wrapper">
        <Header notShow="notShow" />
        <SideBarAdminPage />
        <div id="content-wrapper" style={{ marginTop: "100px", marginLeft:"250px" }}>
          <div className="container-fluid">
            <BreadCrumb
              breadcrumb="Quản lý khuyến mãi"
              onClick={() => props.history.push("/admin")}
              onClick2={() =>
                props.history.push("/admin/promotions")
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
                            type="button"
                            className="btn btn-info add-new"
                            onClick={()=>props.history.push("/admin/add_promotion")}
                          >
                            <i className="fa fa-plus"></i>Thêm khuyến mãi
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
                    <div  className="row">
                      <PromotionTable  />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PublishingHouseManagementPageAdmin);
