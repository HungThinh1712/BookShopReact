import React, { Component, useEffect, useState } from 'react';
import Header from '../common/Header';
import ProductTag from '../common/BookTag'
import Slide from '../common/Slide'
import { makeStyles } from '@material-ui/core/styles';
import BookNav from '../common/BookNav';
import Paper from '@material-ui/core/Paper';
import Card from '../common/Card';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from 'react-redux'
import {getBooksRequest} from '../../actions/booksAction'
import SnackBarLoginSuccess from '../common/SnackBarLoginSuccess'
import Footer from '../common/Footer'
import Progress from '../common/ProgressBar'





const useStyles = makeStyles((theme) => ({

    
    container: {
        [theme.breakpoints.up('sm')]: {
          marginLeft:'0px',
          marginRight:'0px',
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft:'87px',
            marginRight:'87px',
          },
        [theme.breakpoints.down('xs')]: {
          marginLeft:'0px',
          marginRight:'0px',
        },
      },
      load_more: {
        [theme.breakpoints.down('md')]: {
            gridColumnStart:'1',
            textAlign: 'center',
            marginTop:'20px'
        },
        [theme.breakpoints.up('lg')]: {
            gridColumnStart:'3',
             textAlign: 'center',
             marginTop:'20px'
          },
        [theme.breakpoints.down('xs')]: {
            gridColumnStart:'1',
            textAlign: 'center',
            marginTop:'20px'
        },
      },
}));

const HomePage = (props) => {

    
   

    const dispatch = useDispatch()
    const [indexPage,setIndexPage] = useState(1)
    const books = useSelector(state=>state.books.books)
    const isLogined = useSelector(state => state.auth ? state.auth.isAuthenticated : false);
    const currentUser = useSelector(state => state.auth.userData ? state.auth.userData : null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {   
        dispatch(getBooksRequest(indexPage));
        setLoading(true)
    }, [indexPage])
  
    
  const loadMore = () =>{
      setIndexPage(indexPage + 1)

  }

  const [openSnackBar, setOpenSnackBar] = React.useState(isLogined);
  const handleCloseSnackBar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnackBar(false);
    };

  const showBooks = books.map((book, index) => <Card   
            key={book.id}
            price={book.price}
            discount={Math.ceil(((book.coverPrice - book.price) / book.coverPrice)*100)}
            coverPrice = {book.coverPrice}
            title={book.bookName}
            image={book.image}
            valueraiting = {book.rating}
            onClick = {()=>props.history.push(`/details/${book.id}`)}
            ></Card>)

    const classes = useStyles();
        return (
          books.length > 0 ? <div style={{backgroundColor:'#f2f2f2'}}>
              <div >
                <Header></Header>
               
                <div  style = {{display:"flex"}}>
                    <ProductTag></ProductTag>
                   
                </div>
                <BookNav title ="Sách tiếng việt" />
               <Paper className = {`cover_container ${classes.container}`}>
                    {showBooks}

                    <Grid></Grid>    
                    <Grid></Grid>                 
                    <Grid className={classes.load_more}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size = "medium"
                            style={{fontSize: '0.7em', padding: '0.5em', paddingLeft: '4em', paddingRight: '4em', marginBottom: '1.7em', fontFamily:'Arial'}}
                            onClick = { ()=>loadMore()}
                        >
                            Xem thêm
                        </Button>
                    </Grid>
                    
                </Paper>
                <div style={{marginTop:'20px',height:'50px',zIndex:2}}></div>
                <BookNav title ="Sách tiếng anh"  />
                <Paper className = {`cover_container ${classes.container}`}>
                    {showBooks}

                    <Grid></Grid>    
                    <Grid></Grid>                 
                    <Grid className={classes.load_more}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size = "medium"
                            style={{fontSize: '0.7em', padding: '0.5em', paddingLeft: '4em', paddingRight: '4em', marginBottom: '1.7em', fontFamily:'Arial'}}
                           
                        >
                            Xem thêm
                        </Button>
                    </Grid>
                    <SnackBarLoginSuccess
                        open = {openSnackBar}
                        onClose={handleCloseSnackBar}
                        currentUser ={currentUser ? currentUser.fullName : null}
                        />
                </Paper>
              

            </div>
            <div style={{paddingTop:'180px',backgroundColor:'#f2f2f2'}}><Footer/></div>
          </div> : <Progress/>
        );
}

export default HomePage