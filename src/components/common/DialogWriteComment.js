import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { toastMessage } from "./ToastHelper";
import { useTranslation } from "react-i18next";

import { Input } from "antd";
import { Button } from "antd";
const { TextArea } = Input;
const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));
export default function FormDialog(props) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">
          <div style={{ fontSize: "25px", fontWeight: "900" }}>Đánh giá</div>
        </DialogTitle>
        <DialogContent>
        <div style={{marginTop:"-10px"}} className={classes.container}>
               <div >
               <Rating size="large" />
                <Input style={{marginBottom:"10px"}} />
              </div>
              <TextArea rows={4} />
               </div>
        </DialogContent>
        <DialogActions>
          <div style={{display:'flex'}}>
          <Button style={{marginRight:'10px'}} type="primary">Gửi đánh giá</Button>
          <Button onClick={props.onClose} style={{marginRight:'17px'}} type="danger">Hủy</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
