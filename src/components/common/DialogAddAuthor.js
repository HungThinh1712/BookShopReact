import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import * as authorActions from "../../actions/authorAction";
import { toastMessage } from "./ToastHelper";
import {useTranslation} from 'react-i18next'

export default function FormDialog(props) {
  const dispatch = useDispatch();

  const [imageSrc, setImageSrc] = useState("/img/defaultAvatar.png");
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [description, setDescription] = useState("");
  const hiddenFileInput = React.useRef(null);
  const handleUpLoadClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleBirthdayInputChange = (e) => {
    setBirthday(e.target.value);
  };
  const handleNameInputChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionInputChange = (e) => {
    setDescription(e.target.value);
  };
  //Show review Image
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImageFile(imageFile);
        setImageSrc(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageFile(null);
      setImageSrc("/img/defaultAvatar.png");
    }
  };
  const handleSubmit = async () => {
    if (
      name !== "" &&
      birthday !== "" &&
      description !== "" &&
      imageFile !== null
    ) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("birthday", birthday);
      formData.append("description", description);
      formData.append("imageFile", imageFile);
      console.log(formData);
      await dispatch(authorActions.addAuthor(formData));
      props.onClose();
      await dispatch(authorActions.getAuthorsRequest("", 1, 10));
      props.setPage(1);
      setName("");
      setBirthday("");
      setDescription("");
      setImageFile(null);
      setImageSrc("/img/defaultAvatar.png");
    } else {
      toastMessage("Vui lòng nhập đầy đủ thông tin");
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
          <div style={{ fontSize: "25px", fontWeight: "900" }}>{props.tag}</div>
        </DialogTitle>
        <DialogContent>
          <div className="profile-userpic">
            <img
              src={imageSrc ? imageSrc : props.imageSrc}
              onClick={handleUpLoadClick}
              className="img-responsive"
              alt="Thông tin cá nhân"
            />
            <div style={{ display: "none" }} className="custom-file mt-3 mb-3">
              <input
                id="fileInput"
                accept="image/*"
                type="file"
                style={{ display: "none" }}
                ref={hiddenFileInput}
                onChange={showPreview}
              />
            </div>
            <div className="row">
              <div className="form-group mb-3 col-xs-12 col-sm-6">
                <label>Tên tác giả</label>
                <input
                  value={name}
                  onChange={handleNameInputChange}
                  type="text"
                  className="form-control validate"
                ></input>
              </div>
              <div className="form-group mb-3 col-xs-12 col-sm-6">
                <label>Ngày sinh</label>
                <input
                  value={birthday}
                  onChange={handleBirthdayInputChange}
                  type="date"
                  className="form-control validate"
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group mb-3">
            <label>Mô tả</label>
            <textarea
              value={description}
              onChange={handleDescriptionInputChange}
              className="form-control validate"
              rows="3"
              required
            ></textarea>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
