import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import * as authorActions from "../../actions/authorAction";
import { toastMessage } from "./ToastHelper";
import { useTranslation } from "react-i18next"
import axios from 'axios';

export default function FormDialog(props) {
  const { t } = useTranslation();
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
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (author) {
      setId(author.id ? author.id : "");
      setName(author.name ? author.name : "");
      setBirthday(author.birthDay ? author.birthDay : "");
      setDescription(author.description ? author.description : "");
      setImgUrl(author.imgUrl ? author.imgUrl : "");
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
    if (name !== "" ) {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("birthday", birthday);
      formData.append("description", description);
      formData.append("imgUrl", imgUrl);
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
          {t('Admin_Other.13')}
          </Button>
          <Button onClick={handleSubmit} color="primary">
          {t('Admin_Other.30')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
