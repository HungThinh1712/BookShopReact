import React, { useEffect } from 'react';
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import SideBarAdminPage from '../../common/SideBarAdminPage'
import ItemBookInAdmin from '../Admin/ItemBookInAdmin'
import { useDispatch, useSelector } from 'react-redux';
import * as bookActions from '../../../actions/booksAction';
import {withRouter} from 'react-router-dom';

const LstBook = (props) => {

    const dispatch = useDispatch(); 
    const books = useSelector(state=>state.books.books);
    useEffect(()=>{
        dispatch(bookActions.getBooksRequest(1));
    },[dispatch])
    const showBooks = books.map((book, index) => <ItemBookInAdmin
    key={book.id}
    price={book.price}
    title={book.bookName}
    imageSrc={book.imageSrc}
   
    onClick={() => props.history.push(`/details/${book.id}`)}
  ></ItemBookInAdmin>)
    return (
        <div>
            <div id="wrapper">

                <Header />
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
                                                    <button onClick={()=>props.history.push('/admin/add_book_page')} type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i> Thêm sách</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                           {showBooks}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: '180px' }}><Footer /></div>
        </div>
    );
};

export default withRouter(LstBook);