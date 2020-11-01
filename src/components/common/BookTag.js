import React, {  useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import {getBookTagsRequest} from '../../actions/bookTagsAction'



const useStyles = makeStyles((theme) => ({

  root: {
    
    [theme.breakpoints.up('sm')]: {

        display:'none',
      },
      [theme.breakpoints.up('lg')]: {
        display:'inline-block',
        marginLeft:'87px',
        marginTop:'7%'
      },
      [theme.breakpoints.down('xs')]: {
        display:'none',
      },
  },
  producttag_root: {
    fontWeight:'400'
    
  },
 producttag_header: {
    backgroundColor:'#ac96fa',
    textTransform: 'uppercase',
    fontSize: '18px',
    fontWeight: '700',
    zIndex: 1,
    color: 'white',
    paddingBottom: '8px',
    paddingTop : '8px',
    textAlign: 'center',
 },
}));


const BookTag =() => {
 
  const classes = useStyles();

  const dispatch = useDispatch()

  const bookTags = useSelector(state=>state.bookTags.bookTags)

  useEffect(() => {
    
      dispatch(getBookTagsRequest())


  }, [dispatch])


  const showBookTag = bookTags.map((bookTag, index) => <MenuItem   
            key={bookTag.id}
            >{bookTag.name}</MenuItem>)

  

  return (
    
    <div className={classes.root}>
    <div className={classes.producttag_header}>Danh mục sản phẩm</div>
    <Paper className={classes.producttag_root}>
      <MenuList >
        {showBookTag}
      </MenuList>
    </Paper>
  </div>
  );

}


export default BookTag