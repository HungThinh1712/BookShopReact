import React, {  useEffect, useState } from 'react';
import Header from '../common/Header';
import BookTag from '../common/BookTag'
import { makeStyles } from '@material-ui/core/styles';
import BookNav from '../common/BookNav';
import Card from '../common/Card';
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from 'react-redux'
import * as bookActions from '../../actions/booksAction'
import Footer from '../common/Footer'

const useStyles = makeStyles((theme) => ({


  container: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '0px',
      marginRight: '0px',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '87px',
      marginRight: '87px',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0px',
      marginRight: '0px',
    },
  },

}));

const HomePage = (props) => {


  const dispatch = useDispatch()
  const [indexPageVn, setIndexPageVn] = useState(0)
  const [indexPageEng, setIndexPageEng] = useState(0)
  const booksVnese = useSelector(state => state.books.booksInZoneVn)
  const booksEng = useSelector(state => state.books.booksInZoneEng)
  useEffect(() => {
    const fetchBooks = () =>{
      dispatch(bookActions.getBooksByZoneVnRequest(indexPageVn,"Sách tiếng việt"));
    }
    fetchBooks();
  }, [indexPageVn,dispatch])

  useEffect(() => {
    const fetchBooks = () =>{
      dispatch(bookActions.getBooksByZoneEngRequest(indexPageEng,"Sách tiếng anh"));
    }
    fetchBooks();
  }, [indexPageEng,dispatch])


  const loadMoreVnese = () => {
    setIndexPageVn(indexPageVn + 1)

  }
  const loadMoreEng = () => {
    setIndexPageEng(indexPageEng + 1)

  }

  

  const showBooksVnese = booksVnese.map((book, index) => <Card
    key={book.id}
    price={book.price}
    discount={Math.ceil(((book.coverPrice - book.price) / book.coverPrice) * 100)}
    coverPrice={book.coverPrice}
    title={book.bookName}
    imageSrc={book.imageSrc}
    valueraiting={book.rating}
    onClick={() => props.history.push(`/details/${book.id}`)}
  ></Card>)

  const showBooksEng = booksEng.map((book, index) => <Card
    key={book.id}
    price={book.price}
    discount={Math.ceil(((book.coverPrice - book.price) / book.coverPrice) * 100)}
    coverPrice={book.coverPrice}
    title={book.bookName}
    imageSrc={book.imageSrc}
    valueraiting={book.rating}
    onClick={() => props.history.push(`/details/${book.id}`)}
  ></Card>)


  const classes = useStyles();
  return (
    <div style={{ backgroundColor: '#f2f2f2' }}>
      <div >
        <Header></Header>
        {
          booksEng.length > 0 ? <div>
            <div style={{ display: "flex",paddingTop:'108px' }}>
              {/* <BookTag></BookTag> */}
            </div>
            <BookNav title="Sách tiếng việt" style={{marginTop:'200px'}} />
            <div style={{ display: 'grid', backgroundColor: 'white' }} className={classes.container} >

              <div className={`cover_container `}>
                {showBooksVnese}

              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }} >
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  style={{ fontSize: '0.7em', padding: '0.5em', paddingLeft: '4em', paddingRight: '4em', marginBottom: '1.7em', fontFamily: 'Arial' }}
                  onClick={loadMoreVnese}
                >
                  Xem thêm
                      </Button>
              </div>
            </div>

            <div style={{ marginTop: '20px', height: '50px', zIndex: 2 }}></div>
            <BookNav title="Sách tiếng anh" />
            <div style={{ display: 'grid', backgroundColor: 'white' }} className={classes.container} >

              <div className={`cover_container `}>
                {showBooksEng}

              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }} >
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  style={{ fontSize: '0.7em', padding: '0.5em', paddingLeft: '4em', paddingRight: '4em', marginBottom: '1.7em', fontFamily: 'Arial' }}
                  onClick={loadMoreEng}
                >
                  Xem thêm
                    </Button>
              </div>
            </div>
          </div> : null
        }
      </div>
      {booksEng.length > 0 ? <div style={{ paddingTop: '180px', backgroundColor: '#f2f2f2' }}><Footer /></div> : null}
    </div>
  );
}

export default HomePage