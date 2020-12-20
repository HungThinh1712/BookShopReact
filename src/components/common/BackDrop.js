import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux'


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
    color: '#fff',
  },
}));

export default function SimpleBackdrop() {

  const classes = useStyles();
  const openBackDrop = useSelector(state=>state.backdrop.open ?  state.backdrop.open : false)
  

  return (
    <div>
   
      <Backdrop className={classes.backdrop} open={openBackDrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}