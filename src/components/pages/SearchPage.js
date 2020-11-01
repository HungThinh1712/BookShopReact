import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import ProductTag from '../common/BookTag'
import axios from 'axios'
import RadioType from './../common/RadioType'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '../common/Card';




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
            marginTop:'108px'
          },
        [theme.breakpoints.down('xs')]: {
          marginLeft:'0px',
          marginRight:'0px',
          marginTop:'108px'
        },
      },
      
}));

const SearchPage = () => {

  const classes = useStyles();
  const [books, setBooks] = useState([])
  useEffect(() => {
    const fetchData = async () => {
        await axios.get(`https://localhost:44352/api/Books?index=${1}`)
        .then(res => {
          setBooks(res.data)
        })
    }
    fetchData();
  }, );


  const showBooks = books.map((book, index) => <Card   
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
                    <RadioType className={classes.container}></RadioType>
                    <Paper  className={`cover_container_searchpage ${classes.container}`}>
                        {showBooks}
                    </Paper>
                </div>
                


            </div>
        );
}

export default SearchPage