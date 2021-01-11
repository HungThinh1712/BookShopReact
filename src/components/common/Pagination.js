import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
     
    },
  },
}));

export default function PaginationControlled(props) {
  const classes = useStyles();
  
  const page = props.tag===true ? 1 : props.page
  return (
    <div className={classes.root}>
      <Pagination count={props.total} page={page} onChange={props.onChange} />
    </div>
  );
}