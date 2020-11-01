import React, { Component, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';


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


const ProductTag =() => {
 
  const classes = useStyles();
  

  
  return (
    
    <div className={classes.root}>
    <div className={classes.producttag_header}>Thể loại</div>
    <Paper className={classes.producttag_root}>
      <MenuList >
        <MenuItem>Kinh dị</MenuItem>
        <MenuItem>Khoa học viễn tưởng</MenuItem>
        <MenuItem>Khoa học viễn tưởng</MenuItem>
        <MenuItem>Khoa học viễn tưởng</MenuItem>
        <MenuItem>Khoa học viễn tưởng</MenuItem>
      </MenuList>
    </Paper>
  </div>
  );

}


export default ProductTag