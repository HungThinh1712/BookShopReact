import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import * as authorActions from "../../actions/authorAction";
import { useTranslation } from "react-i18next"
import { toastMessage } from "./ToastHelper";
import axios from "axios"

export default function FormDialog(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  const [imgUrl, setImgUrl] = useState("https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png");
  const [loadingImg,setLoadingImg] =useState(false);

  let clientId = "5afd6b67306a4cb";
  // let clientSecret = "04608dcd172ef4ac90272149c4ed50f9f9f45f2f";
  let auth = "Client-ID " + clientId;
  const handleUploadImageToImgur = async (e) => {
    setLoadingImg(true)
    const formDataTest = new FormData();
    if (e.target.files && e.target.files[0]) {
      formDataTest.append("image", e.target.files[0]);
      await axios("https://api.imgur.com/3/image", {
        method: "post",
        data: formDataTest,
        headers: {
          Authorization: auth,
          Accept: "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          setImgUrl(`https://i.imgur.com/${res.data.data.id}.png`)
          setLoadingImg(false)
        }
      });
    }
  };
  
  const handleSubmit = async () => {
    if (
      name !== "" && birthday !==""
    ) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("birthday", birthday);
      formData.append("description", description);
      formData.append("imgUrl", imgUrl);
      console.log(formData);
      await dispatch(authorActions.addAuthor(formData));
      props.onClose();
      await dispatch(authorActions.getAuthorsRequest("", 1, 10));
      props.setPage(1);
      setName("");
      setBirthday("");
      setDescription("");
      setImgUrl("https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png");
    } else {
      toastMessage("Vui lòng kiểm tra lại thông tin");
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
              src={imgUrl}
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
                onChange={handleUploadImageToImgur}
              />
            </div>
            <div className="row">
              <div className="form-group mb-3 col-xs-12 col-sm-6">
                <label>{t('Admin_Other.23')}</label>
                <input
                  value={name}
                  onChange={handleNameInputChange}
                  type="text"
                  className="form-control validate"
                ></input>
              </div>
              <div className="form-group mb-3 col-xs-12 col-sm-6">
                <label>{t('Admin_Other.16')}</label>
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
            <label>{t('Admin_Other.26')}</label>
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
            {t('Admin_Other.29')}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t('Admin_Other.33')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
