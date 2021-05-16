import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { makeStyles } from "@material-ui/core/styles";
import BookNav from "../common/BookNav";
import Card from "../common/Card";
import SaleCard from '../common/SaleCard';
import MessengerChat from '../common/MessengerCustomerChat';
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import * as bookActions from "../../actions/booksAction";
import Footer from "../common/Footer";
import FlashSaleNav from "../common/FlashSaleNav";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginRight: "0px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "87px",
      marginRight: "87px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginRight: "0px",
    },
  },
}));

const HomePage = (props) => {
  const dispatch = useDispatch();
  const [indexPageVn, setIndexPageVn] = useState(0);
  const [indexPageEng, setIndexPageEng] = useState(0);
  const [indexPageWeek, setIndexPageWeek] = useState(0);
  const [indexPageMonth, setIndexPageMonth] = useState(0);
  const [indexPageYear, setIndexPageYear] = useState(0);
  const booksVnese = useSelector((state) => state.books.booksInZoneVn);
  const booksEng = useSelector((state) => state.books.booksInZoneEng);
  const booksWeek = useSelector((state) => state.books.booksInWeekTag);
  const booksMonth = useSelector((state) => state.books.booksInMonthTag);
  const booksYear = useSelector((state) => state.books.booksInYearTag);
  useEffect(() => {
    const fetchBooks = () => {
      dispatch(
        bookActions.getBooksByZoneVnRequest(indexPageVn, "Sách tiếng việt")
      );
    };
    fetchBooks();
  }, [dispatch, indexPageVn]);

  useEffect(() => {
    const fetchBooks = () => {
      dispatch(
        bookActions.getBooksByZoneEngRequest(indexPageEng, "Sách tiếng anh")
      );
    };
    fetchBooks();
  }, [indexPageEng, dispatch]);

  useEffect(() => {
    const fetchBooks = () => {
      dispatch(
        bookActions.getBooksByWeekTagRequest(
          indexPageWeek,
          "Sách bán chạy trong tuần"
        )
      );
    };
    fetchBooks();
  }, [dispatch, indexPageWeek]);

  useEffect(() => {
    const fetchBooks = () => {
      dispatch(
        bookActions.getBooksByMonthTagRequest(
          indexPageMonth,
          "Sách bán chạy trong tháng"
        )
      );
    };
    fetchBooks();
  }, [dispatch, indexPageMonth]);

  useEffect(() => {
    const fetchBooks = () => {
      dispatch(
        bookActions.getBooksByYearTagRequest(
          indexPageYear,
          "Sách bán chạy trong năm"
        )
      );
    };
    fetchBooks();
  }, [dispatch, indexPageYear]);

  const loadMoreVnese = () => {
    setIndexPageVn(indexPageVn + 1);
  };

  const loadMoreEng = () => {
    setIndexPageEng(indexPageEng + 1);
  };

  const loadMoreWeek = () => {
    setIndexPageWeek(indexPageWeek + 1);
  };

  const loadMoreMonth = () => {
    setIndexPageMonth(indexPageMonth + 1);
  };

  const loadMoreYear = () => {
    setIndexPageYear(indexPageYear + 1);
  };

  const showBooksMonth = booksMonth.map((book, index) => (
    <Card
      key={book.id}
      price={book.price}
      discount={Math.ceil(
        ((book.coverPrice - book.price) / book.coverPrice) * 100
      )}
      coverPrice={book.coverPrice}
      title={book.bookName}
      imageSrc={book.imageSrc}
      valueraiting={book.rating}
      onClick={() => props.history.push(`/details/${book.id}`)}
    ></Card>
  ));

  const showBooksWeek = booksWeek.map((book, index) => (
    <Card
      key={book.id}
      price={book.price}
      discount={Math.ceil(
        ((book.coverPrice - book.price) / book.coverPrice) * 100
      )}
      coverPrice={book.coverPrice}
      title={book.bookName}
      imageSrc={book.imageSrc}
      valueraiting={book.rating}
      onClick={() => props.history.push(`/details/${book.id}`)}
    ></Card>
  ));

  const showBooksYear = booksYear.map((book, index) => (
    <Card
      key={book.id}
      price={book.price}
      discount={Math.ceil(
        ((book.coverPrice - book.price) / book.coverPrice) * 100
      )}
      coverPrice={book.coverPrice}
      title={book.bookName}
      imageSrc={book.imageSrc}
      valueraiting={book.rating}
      onClick={() => props.history.push(`/details/${book.id}`)}
    ></Card>
  ));

  const showBooksVnese = booksVnese.map((book, index) => (
    <Card
      key={book.id}
      price={book.price}
      discount={Math.ceil(
        ((book.coverPrice - book.price) / book.coverPrice) * 100
      )}
      coverPrice={book.coverPrice}
      title={book.bookName}
      imageSrc={book.imageSrc}
      valueraiting={book.rating}
      onClick={() => props.history.push(`/details/${book.id}`)}
    ></Card>
  ));

  const showBooksEng = booksEng.map((book, index) => (
    <Card
      key={book.id}
      price={book.price}
      discount={Math.ceil(
        ((book.coverPrice - book.price) / book.coverPrice) * 100
      )}
      coverPrice={book.coverPrice}
      title={book.bookName}
      imageSrc={book.imageSrc}
      valueraiting={book.rating}
      onClick={() => props.history.push(`/details/${book.id}`)}
    ></Card>
  ));

  const showSaleProduct = booksEng.map((book, index) => <SaleCard
    key={book.id}
    price={book.price}
    discount={Math.ceil(((book.coverPrice - book.price) / book.coverPrice) * 100)}
    coverPrice={book.coverPrice}
    title={book.bookName}
    imageSrc={book.imageSrc}
    onClick={() => props.history.push(`/details/${book.id}`)}
  ></SaleCard>)

  const classes = useStyles();
  return (
    <div style={{ backgroundColor: '#f2f2f2' }}>
      <div >
        <MessengerChat/>
        <Header></Header>
        {booksEng.length > 0 ? (
          <div>
            <div style={{ display: "flex", paddingTop: "108px" }}>
              {/* <BookTag></BookTag> */}
            </div>
            <BookNav title="Sách tiếng việt" style={{ marginTop: "200px" }} />
            <div
              style={{ display: "grid", backgroundColor: "white" }}
              className={classes.container}
            >
              <div className={`cover_container `}>{showBooksVnese}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  style={{
                    fontSize: "0.7em",
                    padding: "0.5em",
                    paddingLeft: "4em",
                    paddingRight: "4em",
                    marginBottom: "1.7em",
                    fontFamily: "Arial",
                  }}
                  onClick={loadMoreVnese}
                >
                  Xem thêm
                </Button>
              </div>
            </div>

            <div style={{ marginTop: "20px", height: "50px", zIndex: 2 }}></div>
            <BookNav title="Sách tiếng anh" />
            <div
              style={{ display: "grid", backgroundColor: "white" }}
              className={classes.container}
            >
              <div className={`cover_container `}>{showBooksEng}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  style={{
                    fontSize: "0.7em",
                    padding: "0.5em",
                    paddingLeft: "4em",
                    paddingRight: "4em",
                    marginBottom: "1.7em",
                    fontFamily: "Arial",
                  }}
                  onClick={loadMoreEng}
                >
                  Xem thêm
                </Button>
              </div>
            </div>

            <div style={{ marginTop: "20px", height: "50px", zIndex: 2 }}></div>
            <FlashSaleNav />
            <div
              style={{ display: "grid", backgroundColor: "white" }}
              className={classes.container}
            >
              <div className={`cover_container `}>{showBooksWeek}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  style={{
                    fontSize: "0.7em",
                    padding: "0.5em",
                    paddingLeft: "4em",
                    paddingRight: "4em",
                    marginBottom: "1.7em",
                    fontFamily: "Arial",
                  }}
                  onClick={loadMoreWeek}
                >
                  Xem thêm
                </Button>
              </div>
            </div>

            <div style={{ marginTop: "20px", height: "50px", zIndex: 2 }}></div>
            <BookNav title="Sách bán chạy trong tháng" />
            <div
              style={{ display: "grid", backgroundColor: "white" }}
              className={classes.container}
            >
              <div className={`cover_container `}>{showBooksMonth}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  style={{
                    fontSize: "0.7em",
                    padding: "0.5em",
                    paddingLeft: "4em",
                    paddingRight: "4em",
                    marginBottom: "1.7em",
                    fontFamily: "Arial",
                  }}
                  onClick={loadMoreMonth}
                >
                  Xem thêm
                </Button>
              </div>
            </div>

            <div style={{ marginTop: "20px", height: "50px", zIndex: 2 }}></div>
            <BookNav title="Sách bán chạy trong năm" />
            <div
              style={{ display: "grid", backgroundColor: "white" }}
              className={classes.container}
            >
              <div className={`cover_container `}>{showBooksYear}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  style={{
                    fontSize: "0.7em",
                    padding: "0.5em",
                    paddingLeft: "4em",
                    paddingRight: "4em",
                    marginBottom: "1.7em",
                    fontFamily: "Arial",
                  }}
                  onClick={loadMoreYear}
                >
                  Xem thêm
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {booksEng.length > 0 ? (
        <div style={{ paddingTop: "180px", backgroundColor: "#f2f2f2" }}>
          <Footer />
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
