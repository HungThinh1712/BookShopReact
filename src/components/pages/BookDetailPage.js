import React, { useEffect } from 'react';
import Header from '../common/Header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BookDetail from '../common/BookDetail'
import Card from '../common/Card'
import { useSelector, useDispatch } from 'react-redux'
import * as bookActions from '../../actions/booksAction'
import TableInfo from './../common/TableInfo'
import Description from './../common/Description'


const useStyles = makeStyles((theme) => ({


  container: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '30px',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '87px',
      marginRight: '87px',
      marginTop: '30px',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '30px',
    },
  },
  paragraph: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '30px',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '87px', marginRight: '87px', wordWrap: 'break-word', marginTop: '10px'
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '30px',
    },
  },

}));


const BookDetailPage = (props) => {



  const id = props.match.params.book_id
  const dispatch = useDispatch()
  const selectedBook = useSelector(state => state.books.selectedBook)
  const suggestedBooks = useSelector(state => state.books.suggestedBooks)


  useEffect( () => {
    dispatch(bookActions.getBookByIdRequest(id))

  }, [dispatch,id])

  useEffect(()=>{
    if(selectedBook !=null){
        dispatch(bookActions.getBookByTypeIdRequest(selectedBook.typeId))
      }

  },[selectedBook,dispatch])

  const showBooks = suggestedBooks.map((book, index) => <Card
    key={book.id}
    price={book.price}
    discount={Math.ceil(((book.coverPrice - book.price) / book.coverPrice) * 100)}
    coverPrice={book.coverPrice}
    title={book.bookName}
    image={book.image}
    valueraiting={book.rating}
  ></Card>)

  const classes = useStyles();

  return (
    <div>
      <Header></Header>
      {selectedBook != null ? <div>
        <BookDetail
          bookId = {selectedBook.id}
          price={selectedBook.price}
          discount={Math.ceil(((selectedBook.coverPrice - selectedBook.price) / selectedBook.coverPrice) * 100)}
          coverPrice={selectedBook.coverPrice}
          name={selectedBook.bookName}
          image={selectedBook.image}
          bookTypeName={selectedBook.bookTypeName}
          publishingHouseName={selectedBook.publishingHouseName}
          authorName={selectedBook.authorName}
          valueraiting={selectedBook.rating}
        />
        <div className={classes.container}>
          <h4>Gợi ý dành cho bạn</h4>
        </div>
        <Paper className={`cover_container ${classes.container}`} style={{ marginTop: '10px' }}>
          {showBooks}
        </Paper>
        <div className={classes.container}>
          <h4> Thông tin chi tiết</h4>
        </div>
        <TableInfo
          publishingHouseName={selectedBook.publishingHouseName}
          size={selectedBook.size}
          pageAmount={selectedBook.pageAmount}
          coverType={selectedBook.cover_Type}
          publishDate={selectedBook.publishDate}

        />
        <div className={classes.container}>
          <h4>Mô tả sách</h4>
        </div>
        <Description />
        <div className={classes.container}>
          <h4>Khách hàng nhận xét</h4>
        </div>
      </div> : null}

    </div>
  );
}

export default BookDetailPage