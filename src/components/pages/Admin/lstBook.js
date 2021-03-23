import React, { useEffect, useState } from 'react';
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import SideBarAdminPage from '../../common/SideBarAdminPage'
import ItemBookInAdmin from '../Admin/ItemBookInAdmin'
import { useDispatch, useSelector } from 'react-redux';
import * as bookActions from '../../../actions/booksAction';
import { withRouter } from 'react-router-dom';
import Pagination from '../../common/Pagination'
import * as Types from '../../../constants/ActionType';

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({

    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '30%',
        backgroundColor: 'white',
        borderRadius: theme.shape.borderRadius,
        border:'solid',
        borderWidth:'1px',
        height: '35px',
        [theme.breakpoints.down('xs')]: {
            width: '80ch',
        },

    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '80%',
        pointerEvents: 'none',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
    },
    inputRoot: {
        color: 'black',
        marginLeft: '10px',
        flex: 26,
        [theme.breakpoints.up('sm')]: {
            width: '80ch',
        },

    }


}));
const LstBook = (props) => {

    const dispatch = useDispatch();
    const classes = useStyles();
  
    const [page, setPage] = useState(1);
    const [name,setName] = useState('')
    const handlePageChange = (event, value) => {

        setPage(value);
    };

    useEffect(() => {
        dispatch(bookActions.getBooksAdminRequest(name, page));
    }, [name,page])

    const handleItemClick = (id) => {
        props.history.
        push(`/admin/details/${id}`)
    }

    const total = useSelector(state => state.books.booksAdmin.total ? state.books.booksAdmin.total : 0)
    const books = useSelector(state => state.books.booksAdmin.entities ? state.books.booksAdmin.entities : []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])
    const showBooks = books.map((book, index) => <ItemBookInAdmin
        key={book.id}
        price={book.price}
        title={book.bookName}
        imageSrc={book.imageSrc}
        id={book.id}
        onClick={() => handleItemClick(book.id)}
    ></ItemBookInAdmin>)
    const paging = total % 16 === 0 ? total / 16 : Math.floor(total / 16) + 1
    const handleInputChange = (e)=>{
        setName(e.target.value);
    }

    return (
        <div>
            <div id="wrapper">

                <Header notShow="notShow" />
                <SideBarAdminPage />
                <div id="content-wrapper" style={{ marginTop: '100px' }}>

                    <div className="container-fluid">
                        <div className="card mb-3">

                            <div className="card-body">
                                <div className="table-wrapper">
                                    <div className="table-title">
                                        <div className="row">
                                            <div className="col-sm-8"><h2>DANH SÁCH SÁCH</h2></div>
                                            <div className="col-sm-4">
                                                <div >
                                                    <button onClick = {() => {props.history.push('/admin/add_book_page'); dispatch({type: Types.RESET_TYPE}); dispatch({type: Types.RESET_AUTHOR}); dispatch({type: Types.RESET_PUBLISHOUSE});}} type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i> Thêm sách</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                    <div className="row">
                                            <div className={classes.search}>

                                                <InputBase
                                                    placeholder="Tìm kiếm sản phẩm..."
                                                    value={name}
                                                    onChange={handleInputChange}
                                                    classes={{
                                                        root: classes.inputRoot,
                                                    }}
                                                />
                                                <IconButton   >
                                                    <SearchIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {showBooks}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {total > 16 ? <div style={{ display: 'flex', alignItems: 'center', padding: '20px', justifyContent: 'center' }}>
                        <Pagination total={paging} onChange={handlePageChange} page={page} />
                    </div> : null}
                </div>
            </div> 
            <div style={{ paddingTop: '180px' }}><Footer /></div>
        </div>
    );
};

export default withRouter(LstBook);