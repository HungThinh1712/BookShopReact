import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import * as authorActions from "../../actions/authorAction";
import { toastMessage } from "./ToastHelper";

export default function FormDialog(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.authorData.id)
      dispatch(authorActions.getAuthorRequest(props.authorData.id));
  }, [props.authorData.id, dispatch]);

  const author = useSelector((state) =>
    state.author.author ? state.author.author : null
  );

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [birthday, setBirthday] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (author) {
      setId(author.id ? author.id : "");
      setName(author.name ? author.name : "");
      setBirthday(author.birthDay ? author.birthDay : "");
      setDescription(author.description ? author.description : "");
      setImageSrc(author.imageSrc ? author.imageSrc : "");
    }
  }, [author]);

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
      setImageSrc(props.authorData.imageSrc);
    }
  };
  const handleSubmit = async () => {
    if (name !== "" && birthday !== "" && description !== "") {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("birthday", birthday);
      formData.append("description", description);
      formData.append("imageFile", imageFile);
      await dispatch(authorActions.updateAuthor(formData));
      props.onClose();
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
              src={imageSrc}
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
            Thoát
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
