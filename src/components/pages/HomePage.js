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
import Divider from "@material-ui/core/Divider";
import * as typeActions from "../../actions/typesAction";

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: "0 0 5px 5px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginRight: "0px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "100px",
      marginRight: "100px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginRight: "0px",
    },
  },
  tag: {
    "&:hover": {
      borderRadius: "4px",
      borderColor: "#e23e57",
      cursor: "pointer",
      borderStyle: "solid",
      borderWidth: "thin",
      color: "#e23e57 !important",
    },
  },
}));

const HomePage = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [indexPageVn, setIndexPageVn] = useState(0);
  const [indexPageEng, setIndexPageEng] = useState(0);
  const [indexPageBookByType, setIndexPageBookByType] = useState(0);

  const [currentTagVnese, setCurrentTagVnese] = useState(
    "60b71239f00a929ea2aa3460"
  );
  const [currentTagEng, setCurrentTagEng] = useState(
    "60b71239f00a929ea2aa3460"
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
          indexPageBookByType,
          currentType ? currentType.id : ""
        )
      );
    };
    fetchBooks();
  }, [dispatch, currentType ? currentType.id : "", indexPageBookByType]);

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
  const loadMoreBooksByType = () => {
    setIndexPageBookByType(indexPageBookByType + 1);
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
      imageSrc={book.imgUrl}
      valueraiting={book.rating}
      countRating={book.countRating}
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
      imageSrc={book.imgUrl}
      valueraiting={book.rating}
      countRating={book.countRating}
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
      imageSrc={book.imgUrl}
      valueraiting={book.rating}
      countRating={book.countRating}
      onClick={() => props.history.push(`/details/${book.id}`)}
    ></Card>
  ));
  //VNese
  const tagVneseClick = (tag) => {
    setCurrentTagVnese(tag);
    setIndexPageVn(0);
  };
  const tagVnese = [
    { id: "60b71239f00a929ea2aa3460", name: "Sách bán chạy trong ngày" },
    { id: "60b71244f00a929ea2aa3461", name: "Sách hot" },
    { id: "60b7124ff00a929ea2aa3462", name: "Bestseller" },
  ];
  const showTagVnese = tagVnese.map((tag, index) =>
    tag.id === currentTagVnese ? (
      <div
        style={{}}
        onClick={() => tagVneseClick(tag.id)}
        style={{
          borderRadius: "4px",
          fontSize: "15px",
          borderColor: "#e23e57",
          backgroundColor: "#EDECE7",
          padding: "5px",
          borderStyle: "solid",
          borderWidth: "thin",
          color: "#e23e57",
          marginRight: "30px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        {tag.name}
      </div>
    ) : (
      <div
        className={classes.tag}
        onClick={() => tagVneseClick(tag.id)}
        style={{
          backgroundColor: "#EDECE7",
          padding: "5px",
          color: "black",
          marginRight: "30px",
        }}
      >
        {tag.name}
      </div>
    )
  );

  //Eng
  const tagEndClick = (tagE) => {
    setCurrentTagEng(tagE);
    setIndexPageEng(0);
  };
  const tagEng = [
    { id: "60b71239f00a929ea2aa3460", name: "Sách bán chạy trong ngày" },
    { id: "60b71244f00a929ea2aa3461", name: "Sách hot" },
    { id: "60b7124ff00a929ea2aa3462", name: "Bestseller" },
  ];
  const showTagEng = tagEng.map((tagE, index) =>
    tagE.id === currentTagEng ? (
      <div
        onClick={() => tagEndClick(tagE.id)}
        style={{
          borderRadius: "4px",
          fontSize: "15px",
          borderColor: "#e23e57",
          backgroundColor: "#EDECE7",
          padding: "5px",
          borderStyle: "solid",
          borderWidth: "thin",
          color: "#e23e57",
          marginRight: "30px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        {tagE.name}
      </div>
    ) : (
      <div
        className={classes.tag}
        onClick={() => tagEndClick(tagE.id)}
        style={{
          backgroundColor: "#EDECE7",
          padding: "5px",
          color: "black",
          marginRight: "30px",
        }}
      >
        {tagE.name}
      </div>
    )
  );

  //Types

  const onTypeClick = (type) => {
    setCurrentType(type);
    setIndexPageBookByType(0);
  };
  const showTypes = types.map((type, index) =>
    type === currentType ? (
      <div
        onClick={() => onTypeClick(type)}
        style={{
          borderRadius: "4px",
          fontSize: "15px",
          fontWeight: "600",
          borderColor: "#e23e57",
          backgroundColor: "#EDECE7",
          padding: "5px",
          borderStyle: "solid",
          borderWidth: "thin",
          color: "#e23e57",
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
          backgroundColor: "#EDECE7",
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
    <div>
      {booksVnese && booksVnese.length > 0 ?
      <div>
        <div>
        <MessengerChat />
        <Header></Header>
        <div
          style={{
            marginTop: "70px",
            marginLeft: "100px",
            marginBottom: "-100px",
          }}
        ></div>
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
              backgroundColor: "#EDECE7",
              borderRadius: "0 0 0 0",
              justifyContent: "center",
            }}
          >
            {showTagVnese}
          </div>
          <div
            style={{ display: "grid", backgroundColor: "#EDECE7" }}
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
                  color="#4aa96c"
                  size="medium"
                  style={{
                    padding: "0.5em",
                    width: "200px",
                    backgroundColor: "#1a936f",
                    color: "white",
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

          <div style={{ marginTop: "80px", zIndex: 2 }}></div>
          <BookNav type="EN" title={t("Customer_Home.3")} />
          <div
            className={classes.container}
            style={{
              display: "flex",
              backgroundColor: "#EDECE7",
              borderRadius: "0 0 0 0",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            {showTagEng}
          </div>
          <div
            style={{ display: "grid", backgroundColor: "#EDECE7" }}
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
                size="medium"
                style={{
                  padding: "0.5em",
                  width: "200px",
                  fontWeight: "600",
                  paddingLeft: "4em",
                  paddingRight: "4em",
                  marginBottom: "1.7em",
                  color: "white",
                  backgroundColor: "#1a936f",
                }}
                onClick={loadMoreEng}
              >
                {t("Customer_Home.7")}
              </Fab>
            </div>
          </div>
          <div style={{ marginTop: "80px", zIndex: 2 }}></div>
          <BookNav type="CT" title="Thể loại khác" />
          {types ? (
            <div
              className={classes.container}
              style={{
                display: "flex",
                padding: "20px",
                backgroundColor: "#EDECE7",
                justifyContent: "center",
                borderRadius: "5px 5px 0 0",
              }}
            >
              {showTypes}
            </div>
          ) : null}
          <div
            style={{ display: "grid", backgroundColor: "#EDECE7" }}
            className={classes.container}
          >
            {booksByType.length > 0 && booksByType ? (
              <div>
                {booksByType.length > 2 ? (
                  <div className={`cover_container `}>{showBooksByType}</div>
                ) : (
                  <div className={`cover_container `}>
                    {showBooksByType}
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )}
              </div>
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
                    backgroundColor: "#1a936f",
                    color: "white",
                    paddingLeft: "4em",
                    paddingRight: "4em",
                    marginBottom: "1.7em",
                  }}
                  onClick={loadMoreBooksByType}
                >
                  {t("Customer_Home.7")}
                </Fab>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "180px" }}>
        <Footer />
      </div>
      </div>: null
      }
    </div>
  );
};

export default HomePage;
