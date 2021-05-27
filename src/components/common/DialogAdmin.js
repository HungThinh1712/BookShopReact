import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as typeActions from "../../actions/typesAction";
import * as publishouseActions from "../../actions/publishHouseAction"
import { useDispatch } from "react-redux";
import {useTranslation} from "react-i18next"

export default function FormDialog(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  useEffect(() => {
    if(props.typeData){
      setName(props.typeData.name);
    }else{
      setName(props.publishHouseData.name)
    }
  }, [props.typeData,props.publishHouseData]);

  const onChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async () => {
    if(props.typeData){
      const updatedType = {
        id: props.typeData.id,
        name: name,
      };
      await dispatch(typeActions.updateType(updatedType));
    }else{
      const updatedPublishouse = {
        id: props.publishHouseData.id,
        name: name,
      };
      await dispatch(publishouseActions.updatePublishHouse(updatedPublishouse));
    }
    props.onClose()
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.tag}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={onChange}
            fullWidth
            style={{ width: "300px" }}
            value={name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            {t('Admin_Other.29')}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t('Admin_Other.30')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
