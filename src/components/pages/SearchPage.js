import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "../common/Card";
import * as bookActions from "../../actions/booksAction";
import DropDown from "../common/DropDown";
import * as typeActions from "../../actions/typesAction";
import * as publishHouseActions from "../../actions/publishHouseAction";
import * as authorActions from "../../actions/authorAction";
import * as bookTagActions from "../../actions/bookTagsAction";
import Footer from "../common/Footer";
import {useTranslation} from 'react-i18next'
import Pagination from "../common/Pagination";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "50px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "90px",
      marginRight: "87px",
      marginTop: "30px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "108px",
    },
  },
  drop_down: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "108px",
      display: "flex",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      marginTop: "108px",
      marginLeft: "90px",
      marginRight: "87px",
    },

    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginRight: "0px",
      display: "none",
      marginTop: "108px",
    },
  },
}));

const SearchPage = (props) => {
  const { t } =  useTranslation();
  const classes = useStyles();
  const searchString = props.match.params.searchString;
  const dispatch = useDispatch();
  const searchedBooks = useSelector((state) =>
    state.books.searchedResultBooks.entities
      ? state.books.searchedResultBooks.entities
      : []
  );
  const [typeId, setTypeId] = useState(null);
  const [price, setPrice] = useState("asc");
  const [publishHouseId, setPublishHouseId] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [tagId, setTagId] = useState(null);

  const types = useSelector((state) =>
    state.type.types.entities ? state.type.types.entities : []
  );
  const authors = useSelector((state) =>
    state.author.authors.entities ? state.author.authors.entities : []
  );
  const publishHouses = useSelector((state) =>
    state.publishHouse.publishHouses.entities
      ? state.publishHouse.publishHouses.entities
      : []
  );
  const tags = [
    { id: "Sách bàn chạy trong tuần", name: "Sách bàn chạy trong tuần" },
    { id: "Sách bàn chạy trong tháng", name: "Sách bàn chạy trong tháng" },
    { id: "Sách bàn chạy trong năm", name: "Sách bàn chạy trong năm" },
  ];
  const total = useSelector((state) =>
    state.books.searchedResultBooks.total
      ? state.books.searchedResultBooks.total
      : 0
  );
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const sortPrice = [
    { id: "desc", name: "Từ cao xuống thấp" },
    { id: "asc", name: "Từ thấp đến cao" },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    dispatch(typeActions.getTypesRequest("", 1, 9999));
    dispatch(bookTagActions.getBookTagsRequest());
    dispatch(publishHouseActions.getPublishHousesRequest("", 1, 9999));
    dispatch(authorActions.getAuthorsRequest("", 1, 9999));
  }, [dispatch]);

  const handleTypeChange = (event, values) => {
    values != null ? setTypeId(values.id) : setTypeId(null);
  };
  const handlePublishHouseChange = (event, values) => {
    values != null ? setPublishHouseId(values.id) : setPublishHouseId(null);
  };
  const handleAuthorChange = (event, values) => {
    values != null ? setAuthorId(values.id) : setAuthorId(null);
  };
  const handleTagChange = (event, values) => {
    values != null ? setTagId(values.id) : setTagId(null);
  };
  const handlePriceChange = (event, values) => {
    values != null ? setPrice(Object.values(values)[0]) : setPrice("asc");
  };

  useEffect(() => {
    dispatch(
      bookActions.searchBookByNameRequest(
        searchString,
        typeId,
        price,
        publishHouseId,
        authorId,
        tagId,
        page
      )
    );
  }, [searchString, typeId, price, publishHouseId, authorId, page,dispatch,tagId]);

  const showBooks = searchedBooks.map((book, index) => (
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

  const paging = total % 10 === 0 ? total / 10 : Math.floor(total / 10) + 1;
  return (
    <div>
      <Header searchString={searchString}></Header>

      <div>
        <div className={classes.drop_down}>
          <DropDown
            label={t('Customer_Search.1')}
            handleChange={handleTypeChange}
            data={types}
          />
          <DropDown
            label={t('Customer_Search.2')}
            handleChange={handlePriceChange}
            data={sortPrice}
          />
          <DropDown
            label={t('Customer_Search.3')}
            handleChange={handlePublishHouseChange}
            data={publishHouses}
            type="3"
          />
          <DropDown
            label={t('Customer_Search.4')}
            handleChange={handleAuthorChange}
            data={authors}
            type="4"
          />
          <DropDown
            label={t('Customer_Search.5')}
            handleChange={handleTagChange}
            data={tags}
            type="5"
          />
        </div>
        {searchedBooks.length > 2 ? (
          <Paper className={`cover_container_searchpage ${classes.container}`}>
            {showBooks}
          </Paper>
        ) : (
          <Paper className={`cover_container_searchpage ${classes.container}`}>
            {showBooks}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Paper>
        )}
        {total > 10 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Pagination
              total={paging}
              onChange={handlePageChange}
              page={page}
            />
          </div>
        ) : null}
      </div>

      <div style={{ paddingTop: "180px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;
