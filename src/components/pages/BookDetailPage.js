import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import BookDetail from "../common/BookDetail";
import Card from "../common/Card";
import { useSelector, useDispatch } from "react-redux";
import * as bookActions from "../../actions/booksAction";
import * as commentActions from "../../actions/commentAction";
import * as backDropAction from "../../actions/backdropAction";
import TableInfo from "./../common/TableInfo";
import Description from "./../common/Description";
import Comment from "../common/CommentZone";
import Footer from "../common/Footer";
import BreadCrumb from "../common/Breadcrumbs";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "30px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "87px",
      marginRight: "87px",
      marginTop: "30px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "30px",
    },
  },
  tableInfo: {
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },

    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  paragraph: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "30px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "87px",
      marginRight: "87px",
      wordWrap: "break-word",
      marginTop: "10px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "30px",
    },
  },
}));

const BookDetailPage = (props) => {
  const { t } = useTranslation();
  const id = props.match.params.book_id;
  const dispatch = useDispatch();
  const selectedBook = useSelector((state) =>
    state.books.selectedBook ? state.books.selectedBook : null
  );
  const suggestedBooks = useSelector((state) =>
    state.books.suggestedBooks ? state.books.suggestedBooks : []
  );

  const total = useSelector((state) =>
    state.comment.comments.total ? state.comment.comments.total : 0
  );

  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const paging = total % 3 === 0 ? total / 3 : Math.floor(total / 3) + 1;
  useEffect(() => {
    dispatch(bookActions.getBookByIdRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedBook != null) {
      dispatch(
        bookActions.getBookByTypeIdRequest(selectedBook.typeId, selectedBook.id)
      );
      dispatch(commentActions.getCommentsRequest(selectedBook.id, page));
      dispatch(commentActions.getRatingRequest(selectedBook.id));
    }
  }, [selectedBook, dispatch, page]);

  const ratings = useSelector((state) => state.comment.ratings);
  //Calculate rating of book
  const sumRate = Object.values(ratings).reduce(
    (total, item) => total + item.amount * item.value,
    0
  );
  const sumAmountRate = Object.values(ratings).reduce(
    (total, item) => total + item.amount,
    0
  );
  const averageRate = (sumRate / sumAmountRate).toFixed(2);

  const showBooks = suggestedBooks.map((book, index) => (
    <Card
      key={book.id}
      price={book.price}
      discount={Math.ceil(
        ((book.coverPrice - book.price) / book.coverPrice) * 100
      )}
      coverPrice={book.coverPrice}
      title={book.bookName}
      imageSrc={book.imgUrl}
      valueraiting={book.rating}
      countRating={book.countRating}
      onClick={() => props.history.push(`/details/${book.id}`)}
    ></Card>
  ));

  const classes = useStyles();

  return (
    <div style={{ backgroundColor: "#EDECE7" }}>
      <Header />
      {selectedBook != null ? (
        <div>
          <div
            style={{
              marginTop: "90px",
              marginLeft: "100px",
              marginBottom: "-100px",
            }}
          >
            <BreadCrumb
              breadcrumb={selectedBook.bookName}
              onClick={() => props.history.push("/")}
              onClick2={() => props.history.push("/details/" + selectedBook.id)}
            ></BreadCrumb>
          </div>
          <BookDetail
            bookId={selectedBook.id}
            price={selectedBook.price}
            discount={Math.ceil(
              ((selectedBook.coverPrice - selectedBook.price) /
                selectedBook.coverPrice) *
                100
            )}
            coverPrice={selectedBook.coverPrice}
            name={selectedBook.bookName}
            imageSrc={selectedBook.imgUrl}
            bookTypeName={selectedBook.bookTypeName}
            publishingHouseName={selectedBook.publishingHouseName}
            authorName={selectedBook.authorName}
            valueraiting={averageRate}
          />
          <div className={classes.container}>
            <h4>{t("Customer_Detail.8")}</h4>
          </div>
          {suggestedBooks.length >= 3 ? (
            <Paper
              className={`cover_container ${classes.container}`}
              style={{ marginTop: "10px" }}
            >
              {showBooks}
            </Paper>
          ) : (
            <Paper
              className={`cover_container ${classes.container}`}
              style={{ marginTop: "10px" }}
            >
              {showBooks}
              <div></div>
              <div></div>
            </Paper>
          )}
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className={classes.container}
          >
            <h4> {t("Customer_Detail.9")}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "50%",
              }}
            >
              <h4> Mô tả</h4>
            </div>
          </div>
          <div style={{ display: "flex" }} className={classes.tableInfo}>
            <TableInfo
              publishingHouseName={selectedBook.publishingHouseName}
              size={selectedBook.size}
              pageAmount={selectedBook.pageAmount}
              coverType={selectedBook.cover_Type}
              publishDate={selectedBook.publishDate}
            />
            {/* <div className={classes.container}>
            <h4>{t("Customer_Detail.17")}</h4>
          </div> */}
            <Description description={selectedBook.description} />
          </div>
          <div className={classes.container}>
            <h4>{t("Customer_Detail.18")}</h4>
            <Comment
              total={paging}
              setDefaultPage={() => setPage(1)}
              onChange={handlePageChange}
              page={page}
              selectedBook={selectedBook}
            />
          </div>
        </div>
      ) : null}
      {selectedBook ? (
        <div style={{ paddingTop: "180px", backgroundColor: "#EDECE7" }}>
          <Footer />
        </div>
      ) : null}
    </div>
  );
};

export default BookDetailPage;
