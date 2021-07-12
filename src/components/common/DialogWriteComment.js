import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { toastMessage } from "./ToastHelper";
import * as CallApis from "../../constants/Apis";
import * as commentActions from "../../actions/commentAction";
import * as orderActions from "../../actions/orderAction";

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
  const dispatch = useDispatch();
  const [rate, setRate] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleRatingChange = (e) => {
    setRate(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = async () => {
    if (rate === 0 || title === "" || content === "") {
      toastMessage("Vui lòng nhập đầy đủ thông tin");
    } else {
      const orderId = props.orderId;
      const bookId = props.bookId;
      const userId = props.userId;
      const commentData = { bookId, rate, content, title, orderId, userId };
      props.onClose();
      await dispatch(commentActions.addComment(commentData));
      sendMessage();
      await dispatch(orderActions.getOrderRequest(orderId));
    }
  };
  const userData = useSelector((state) =>
    state.auth.userData ? state.auth.userData : null
  );

  const sendMessage = async (orderId) => {
    const chatMessage = {
      title: "Đánh giá sản phẩm",
      content: `${userData.fullName} đã đánh giá 1 sản phẩm`,
      senderId: userData.id,
      type: "Rate",
      orderId: props.bookId,
    };

    try {
      const url = CallApis.API_URL.concat(`/Notification/SendNotiToAmin`);
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(chatMessage),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log("Sending message failed.", e);
    }
  };

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
          <div style={{ marginTop: "-10px" }} className={classes.container}>
            <div>
              <Rating onChange={handleRatingChange} size="large" />
              <Input
                onChange={handleTitleChange}
                style={{ marginBottom: "10px" }}
              />
            </div>
            <TextArea onChange={handleContentChange} rows={4} />
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{ display: "flex" }}>
            <Button
              onClick={handleSubmit}
              style={{ marginRight: "10px" }}
              type="primary"
            >
              Gửi đánh giá
            </Button>
            <Button
              onClick={props.onClose}
              style={{ marginRight: "17px" }}
              type="danger"
            >
              Hủy
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
