import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useTranslation} from 'react-i18next'

export default function FormDialog(props) {
  const { t } = useTranslation();
  return (
    <div>     
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.tagType}</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={props.onChange}
            fullWidth
            style={{width:'300px'}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
          {t('Admin_Other.29')}
          </Button>
          <Button onClick={props.onClick} color="primary">
          {t('Admin_Other.33')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
