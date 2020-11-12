import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import {useSelector,useDispatch} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '../common/Card';
import * as bookActions from '../../actions/booksAction'
import DropDown from '../common/DropDown'




const useStyles = makeStyles((theme) => ({

    
    container: {
        [theme.breakpoints.up('sm')]: {
          marginLeft:'0px',
          marginRight:'0px',
          marginTop:'108px'
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft:'50px',
            marginRight:'87px',
            marginTop:'30px'
          },
        [theme.breakpoints.down('xs')]: {
          marginLeft:'0px',
          marginRight:'0px',
          marginTop:'108px'
        },
      },
      drop_down: {
        [theme.breakpoints.up('sm')]: {
          marginLeft:'0px',
          marginRight:'0px',
          marginTop:'108px',
          display:'flex'
        },
        [theme.breakpoints.up('lg')]: {
          display:'flex',
          marginTop:'108px',
          marginLeft:'50px'
        },
        [theme.breakpoints.down('xs')]: {
          marginLeft:'0px',
          marginRight:'0px',
          marginTop:'108px'
        },
      },
}));

const SearchPage = (props) => {

  const classes = useStyles();
  const searchString = props.match.params.searchString
  const dispatch = useDispatch();
  const searchedBooks = useSelector(state => state.books.searchedResultBooks)

  useEffect(()=>{
    dispatch(bookActions.searchBookByNameRequest(searchString))
  },[searchString])

  const showBooks = searchedBooks.map((book, index) => <Card   
            key={book.id}
            price={book.price}
            discount={Math.ceil(((book.coverPrice - book.price) / book.coverPrice)*100)}
            coverPrice = {book.coverPrice}
            title={book.bookName}
            image={book.image}
            valueraiting = {5}
            ></Card>)  
        return (
            <div>
                <Header></Header>
              
                <div  >
                  <div className={classes.drop_down} >
                    <DropDown label='Thể loại' />
                    <DropDown label ='Giá thành' />
                    <DropDown label ='Nhà xuất bản' />
                    <DropDown label = 'Tác giả' />
                  </div>
                    {searchedBooks ? <Paper  className={`cover_container_searchpage ${classes.container}`}>
                        {showBooks}
                    </Paper>:null}
                </div>
                


            </div>
        );
}

export default SearchPage