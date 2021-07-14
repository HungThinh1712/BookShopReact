import React from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  table_info: {
    marginLeft: "87px",
    width: "100%",
    backgroundColor: "#dae6d6 ",
    [theme.breakpoints.down("sm")]: {
      marginTop: "5px",
      marginLeft: "0px",
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginTop: "10px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "87px",
      width: "25%",
    },
  },
}));

const TableInfo = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.table_info}>
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h6 style={{ color: "#114b5f", fontWeight: "600" }}>
          {t("Admin_Book.9")}{" "}
        </h6>
        <h6 style={{ color: "#114b5f", fontWeight: "600" }}>
          {props.publishingHouseName}
        </h6>
      </div>
      <Divider />
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h6 style={{ color: "#114b5f", fontWeight: "600" }}>
          {t("Admin_Book.27")}
        </h6>
        <h6 style={{ color: "#114b5f", fontWeight: "600" }}>{props.size}</h6>
      </div>
      <Divider />
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h6 style={{ color: "#114b5f", fontWeight: "600" }}>
          {t("Admin_Book.16")}
        </h6>
        <h6 style={{ color: "#114b5f", fontWeight: "600" }}>
          {props.pageAmount}
        </h6>
      </div>
      <Divider />
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h6 style={{ color: "#114b5f", fontWeight: "600" }}>
          {t("Admin_Book.18")}
        </h6>
        <h6 style={{ color: "#114b5f", fontWeight: "600" }}>
          {props.coverType}
        </h6>
      </div>
      <Divider />
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h6 style={{ color: "#114b5f", fontWeight: "600" }}>
          {t("Admin_Book.12")}
        </h6>
        <h6 style={{ color: "#114b5f", fontWeight: "600" }}>
          {props.publishDate}
        </h6>
      </div>
    </div>
  );
};

export default TableInfo;
