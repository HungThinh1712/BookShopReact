import * as Types from "../constants/ActionType";
const initialState = {
  books: [],
  booksInZoneVn: [],
  booksInZoneEng: [],
  booksInMonthTag: [],
  booksInWeekTag: [],
  booksInYearTag: [],
  selectedBook: null,
  suggestedBooks: [],
  searchedResultBooks: [],
  booksAdmin: [],
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALLBOOK:
      return {
        ...state,
        books: action.books,
      };
    case Types.GET_BOOK_BY_ZONE_VN:
      return {
        ...state,
        booksInZoneVn: action.booksInZoneVn,
      };
    case Types.GET_BOOK_BY_ZONE_ENG:
      return {
        ...state,
        booksInZoneEng: action.booksInZoneEng,
      };
    case Types.GET_BOOK_BY_MONTH_TAG:
      return {
        ...state,
        booksInMonthTag: action.booksInMonthTag,
      };
    case Types.GET_BOOK_BY_WEEK_TAG:
      return {
        ...state,
        booksInWeekTag: action.booksInWeekTag,
      };
    case Types.GET_BOOK_BY_YEAR_TAG:
      return {
        ...state,
        booksInYearTag: action.booksInYearTag,
      };
    case Types.ADD_BOOK:
      const addedBook = action.item;
      return {
        ...state,
        books: [...state.books, addedBook],
      };
    case Types.GET_BOOK_BY_ID:
      return {
        ...state,
        selectedBook: action.selectedBook,
      };
    case Types.GET_BOOK_BY_TYPE_ID:
      return {
        ...state,
        suggestedBooks: action.suggestedBooks,
      };
    case Types.SEARCH_BOOK:
      return {
        ...state,
        searchedResultBooks: action.searchedResultBooks,
      };
    case Types.GET_BOOKS_ADMIN:
      return {
        ...state,
        booksAdmin: action.booksAdmin,
      };
    default:
      return state;
  }
}
