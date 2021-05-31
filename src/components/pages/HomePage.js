import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { makeStyles } from "@material-ui/core/styles";
import BookNav from "../common/BookNav";
import Card from "../common/Card";
import MessengerChat from "../common/MessengerCustomerChat";
import { useSelector, useDispatch } from "react-redux";
import * as bookActions from "../../actions/booksAction";
import Footer from "../common/Footer";
import { useTranslation } from "react-i18next";
import Fab from "@material-ui/core/Fab";
import { Empty } from "antd";
import * as typeActions from "../../actions/typesAction";

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
  tag: {
    "&:hover": {
      borderRadius: "4px",
      borderColor: "red",
      cursor: "pointer",
      borderStyle: "solid",
      borderWidth: "thin",
      color: "red !important",
    },
  },
}));

const HomePage = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [indexPageVn, setIndexPageVn] = useState(0);
  const [indexPageEng, setIndexPageEng] = useState(0);
  const [currentTagVnese, setCurrentTagVnese] = useState(
    "Sách bán chạy trong ngày"
  );
  const [currentTagEng, setCurrentTagEng] = useState(
    "Sách bán chạy trong ngày"
  );
  const booksVnese = useSelector((state) => state.books.booksInZoneVn);
  const types = useSelector((state) =>
    state.type.types.entities ? state.type.types.entities : []
  );
  const booksEng = useSelector((state) => state.books.booksInZoneEng);
  const booksByType = useSelector((state) =>
    state.books.booksByType ? state.books.booksByType : []
  );

  const tempType = useSelector((state) =>
    state.type.types.entities ? state.type.types.entities[0] : null
  );
  const [currentType, setCurrentType] = useState(tempType ? tempType : null);
  useEffect(() => {
    setCurrentType(tempType);
  }, [tempType]);
  useEffect(() => {
    const fetchTypes = () => {
      dispatch(typeActions.getTypesRequest("", 1, 10));
    };
    fetchTypes();
  }, []);
  useEffect(() => {
    const fetchBooks = () => {
      dispatch(
        bookActions.getBooksByZoneRequest(
          indexPageVn,
          "Sách tiếng việt",
          currentTagVnese
        )
      );
    };
    fetchBooks();
  }, [dispatch, indexPageVn, currentTagVnese]);

  //fetch books by types
  useEffect(() => {
    const fetchBooks = () => {
      dispatch(
        bookActions.getBooksByTypeHomeRequest(
          1,
          currentType ? currentType.id : ""
        )
      );
    };
    fetchBooks();
  }, [dispatch, currentType ? currentType.id : ""]);

  useEffect(() => {
    const fetchBooks = () => {
      dispatch(
        bookActions.getBooksByZoneRequest(
          indexPageEng,
          "Sách tiếng anh",
          currentTagEng
        )
      );
    };
    fetchBooks();
  }, [indexPageEng, dispatch, currentTagEng]);

  const loadMoreVnese = () => {
    setIndexPageVn(indexPageVn + 1);
  };

  const loadMoreEng = () => {
    setIndexPageEng(indexPageEng + 1);
  };

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

  const showBooksByType = booksByType.map((book, index) => (
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
  //VNese
  const tagVneseClick = (tag) => {
    setCurrentTagVnese(tag);
    setIndexPageVn(0);
  };
  const tagVnese = ["Sách bán chạy trong ngày", "Sách hot", "Bestseller"];
  const showTagVnese = tagVnese.map((tag, index) =>
    tag === currentTagVnese ? (
      <div
        onClick={() => tagVneseClick(tag)}
        style={{
          borderRadius: "4px",
          fontSize: "15px",
          borderColor: "red",
          backgroundColor: "white",
          padding: "5px",
          borderStyle: "solid",
          borderWidth: "thin",
          color: "red",
          marginRight: "30px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        {tag}
      </div>
    ) : (
      <div
        className={classes.tag}
        onClick={() => tagVneseClick(tag)}
        style={{
          backgroundColor: "white",
          padding: "5px",
          color: "black",
          marginRight: "30px",
        }}
      >
        {tag}
      </div>
    )
  );

  //Eng
  const tagEndClick = (tagE) => {
    setCurrentTagEng(tagE);
    setIndexPageEng(0);
  };
  const tagEng = ["Sách bán chạy trong ngày", "Sách hot", "Bestseller"];
  const showTagEng = tagEng.map((tagE, index) =>
    tagE === currentTagEng ? (
      <div
        onClick={() => tagEndClick(tagE)}
        style={{
          borderRadius: "4px",
          fontSize: "15px",
          borderColor: "red",
          backgroundColor: "white",
          padding: "5px",
          borderStyle: "solid",
          borderWidth: "thin",
          color: "red",
          marginRight: "30px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        {tagE}
      </div>
    ) : (
      <div
        className={classes.tag}
        onClick={() => tagEndClick(tagE)}
        style={{
          backgroundColor: "white",
          padding: "5px",
          color: "black",
          marginRight: "30px",
        }}
      >
        {tagE}
      </div>
    )
  );

  //Types

  const onTypeClick = (type) => {
    setCurrentType(type);
    console.log(type);
  };
  const showTypes = types.map((type, index) =>
    type === currentType ? (
      <div
        onClick={() => onTypeClick(type)}
        style={{
          borderRadius: "4px",
          fontSize: "15px",
          borderColor: "red",
          backgroundColor: "white",
          padding: "5px",
          borderStyle: "solid",
          borderWidth: "thin",
          color: "red",
          cursor: "pointer",
          fontWeight: "600",
          marginRight: "20px",
        }}
      >
        {type.name}
      </div>
    ) : (
      <div
        className={classes.tag}
        onClick={() => onTypeClick(type)}
        style={{
          backgroundColor: "white",
          padding: "5px",
          color: "black",
          marginRight: "30px",
        }}
      >
        {type.name}
      </div>
    )
  );

  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <div>
        <MessengerChat />
        <Header></Header>
        <div
          style={{
            marginTop: "80px",
            marginLeft: "100px",
            marginBottom: "-100px",
          }}
        >
          {/* <BreadCrumb
              breadcrumb="" onClick={()=>props.history.push("/")} onClick2={()=>props.history.push("/")}>
            </BreadCrumb> */}
        </div>
        <div>
          <div style={{ display: "flex", paddingTop: "108px" }}></div>
          <BookNav
            title={t("Customer_Home.2")}
            style={{ marginTop: "200px" }}
          />
          <div
            className={classes.container}
            style={{
              display: "flex",
              padding: "20px",
              backgroundColor: "white",
            }}
          >
            {showTagVnese}
          </div>
          <div
            style={{ display: "grid", backgroundColor: "white" }}
            className={classes.container}
          >
            {booksVnese.length > 0 ? (
              <div className={`cover_container `}>{showBooksVnese}</div>
            ) : (
              <Empty />
            )}
            {booksVnese.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                <Fab
                  variant="outlined"
                  color="primary"
                  size="medium"
                  style={{
                    padding: "0.5em",
                    width: "200px",
                    fontWeight: "600",
                    paddingLeft: "4em",
                    paddingRight: "4em",
                    marginBottom: "1.7em",
                  }}
                  onClick={loadMoreVnese}
                >
                  {t("Customer_Home.7")}
                </Fab>
              </div>
            ) : null}
          </div>

          <div style={{ marginTop: "20px", zIndex: 2 }}></div>
          <BookNav title={t("Customer_Home.3")} />
          <div
            className={classes.container}
            style={{
              display: "flex",
              padding: "20px",
              backgroundColor: "white",
            }}
          >
            {showTagEng}
          </div>
          <div
            style={{ display: "grid", backgroundColor: "white" }}
            className={classes.container}
          >
            {booksEng.length > 0 ? (
              <div className={`cover_container `}>{showBooksEng}</div>
            ) : (
              <Empty />
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "25px",
              }}
            >
              <Fab
                variant="outlined"
                color="primary"
                size="medium"
                style={{
                  padding: "0.5em",
                  width: "200px",
                  fontWeight: "600",
                  paddingLeft: "4em",
                  paddingRight: "4em",
                  marginBottom: "1.7em",
                }}
                onClick={loadMoreEng}
              >
                {t("Customer_Home.7")}
              </Fab>
            </div>
          </div>
          <div style={{ marginTop: "20px", zIndex: 2 }}></div>
          {types ? (
            <div
              className={classes.container}
              style={{
                display: "flex",
                padding: "20px",
                backgroundColor: "white",
              }}
            >
              {showTypes}
            </div>
          ) : null}
          <div
            style={{ display: "grid", backgroundColor: "white" }}
            className={classes.container}
          >
            {booksByType.length > 0 && booksByType ? (
              <div className={`cover_container `}>{showBooksByType}</div>
            ) : (
              <Empty />
            )}
            {booksByType.length > 0 && booksByType ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "25px",
                }}
              >
                <Fab
                  variant="outlined"
                  color="primary"
                  size="medium"
                  style={{
                    padding: "0.5em",
                    width: "200px",
                    fontWeight: "600",
                    paddingLeft: "4em",
                    paddingRight: "4em",
                    marginBottom: "1.7em",
                  }}
                  onClick={loadMoreVnese}
                >
                  {t("Customer_Home.7")}
                </Fab>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "180px", backgroundColor: "#f2f2f2" }}>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
