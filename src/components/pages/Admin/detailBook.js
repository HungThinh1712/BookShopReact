import React, { useState, useEffect } from 'react';
import SideBarAdminPage from '../../common/SideBarAdminPage'
import { useSelector, useDispatch } from 'react-redux'
import * as typeActions from '../../../actions/typesAction'
import * as publishHouseActions from '../../../actions/publishHouseAction'
import * as authorActions from '../../../actions/authorAction'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import * as bookActions from '../../../actions/booksAction'
import Dialog from '../../common/Dialog'
import * as bookTagActions from './../../../actions/bookTagsAction'
import {useDispactch} from 'react-redux';
import { toastMessage} from './../../common/ToastHelper';

const Book = (props) => {
    const dispatch = useDispatch();
    const selectedBook = useSelector(state => state.books.selectedBook ? state.books.selectedBook : null)
    const id = props.match.params.id
    useEffect(()=>{
        dispatch(bookActions.getBookByIdRequest(id))
    },[dispatch,id])
    
    useEffect(() => {
        dispatch(typeActions.getTypesRequest());
        dispatch(bookTagActions.getBookTagsRequest())
        dispatch(publishHouseActions.getPublishHousesRequest())
        dispatch(authorActions.getAuthorRequest())
    }, [dispatch])
    const types = useSelector(state => state.type.types)
    const authors = useSelector(state => state.author.authors)
    const publishHouses = useSelector(state => state.publishHouse.publishHouses)
    //Get Data types, tags,authors,publishhouse,
    const showAuthors = authors.map((author, index) => <option
        key={index}
        value={author.id}
    >{author.name}</option>)
    const showPublishHouses = publishHouses.map((publishHouse, index) => <option
        key={index}
        value={publishHouse.id}
    >{publishHouse.name}</option>)
    const showTypes = types.map((type, index) => <option
        key={index}
        value={type.id}
    >{type.name}</option>)

    return (
        <div>
            {selectedBook ? <div id="wrapper">
             
             <Header notShow="notShow" />
             <SideBarAdminPage />
             <div  id="content-wrapper" style={{ marginTop: '100px' }}>
                 <div className="container-fluid">
                     <div className="card-body">
                         <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                             <div className="row">
                                 <div className="col-12">
                                     <h4 className="tm-block-title d-inline-block">Chi tiết sách</h4>
                                 </div>
                             </div>
                             <div className="row tm-edit-product-row">
                                 <div className="col-xl-6 col-lg-6 col-md-12">
                                     <div className="form-group mb-3">
                                         <label for="name">Tên sách</label>
                                         <input disabled value={selectedBook.bookName} id="name" name="name" type="text" className="form-control validate" required />
                                     </div>
                                     <div className="row">
                                         
                                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                                             <label  for="tag">Thẻ</label>
                                           
                                                 <select disabled defaultValue={selectedBook.tags}  className="custom-select tm-select-accounts" id="tag">
                                                     <option value="Sách tiếng việt" >Sách bán chạy trong tuần</option>
                                                     <option value="Sách tiếng anh" >Sách bán chạy trong tháng</option>
                                                     <option value="Sách tiếng anh" >Sách bán chạy trong năm</option>
                                                 </select>
                                               
                                         </div>
                                         <div className="form-group mb-3 col-xs-12 col-sm-6">
                                             <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                 <label for="publishing_house">Nhà xuất bản</label>
                                                 <div style={{flexGrow:'1'}}></div>                                          
                                             </div>
                                             <select disabled defaultValue={selectedBook.publishingHouseId}  className="custom-select tm-select-accounts" id="category">
                                                
                                                 {showPublishHouses}
                                             </select>

                                         </div>
                                     </div>

                                     <div className="row">
                                         <div className="form-group mb-3 col-xs-12 col-sm-6">
                                         <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                 <label for="tag">Loại sách</label>
                                                 <div style={{flexGrow:'1'}}></div>                        
                                             </div>
                                             <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                 <select disabled defaultValue={selectedBook.typeId} className="custom-select tm-select-accounts" id="category">
                                                    
                                                     {showTypes}
                                                 </select>
                                                 
                                             </div>
                                         </div>
                                         <div className="form-group mb-3 col-xs-12 col-sm-6">
                                         <div  style={{ display: 'flex', flexDirection: 'row' }}>
                                                 <label for="tag">Tác giả</label>
                                                 <div style={{flexGrow:'1'}}></div>
                                          
                                             </div>
                                             <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                 <select disabled defaultValue={selectedBook.authorId} className="custom-select tm-select-accounts" id="category">
                                                     {showAuthors}
                                                 </select>
                                                
                                             </div>
                                         </div>
                                     </div>
                                     <div className="row">
                                         <div className="form-group mb-3 col-xs-12 col-sm-6">
                                             <label for="publish_date">Ngày xuất bản</label>
                                             <input disabled value={selectedBook.publishDate}  id="publish_date" name="publish_date" type="date" className="form-control validate" data-large-mode="true" />
                                         </div>
                                         <div className="form-group mb-3 col-xs-12 col-sm-6">
                                             <label >Số lượng</label>
                                             <input disabled value={selectedBook.amount}  type="number" className="form-control validate" required />
                                         </div>
                                     </div>
                                     <div className="row">
                                         <div className="form-group mb-3 col-xs-12 col-sm-6">
                                             <label >Giá</label>
                                             <input disabled value={selectedBook.price}  type="text" className="form-control validate" required />
                                         </div>
                                         <div className="form-group mb-3 col-xs-12 col-sm-6">
                                             <label >Giá bìa</label>
                                             <input disabled value={selectedBook.coverPrice}  type="text" className="form-control validate" required />
                                         </div>
                                     </div>
                                     <div className="row">
                                         <div className="form-group mb-3 col-xs-12 col-sm-6">
                                             <label >Số trang</label>
                                             <input disabled value={selectedBook.pageAmount} className="form-control validate" data-large-mode="true" />
                                         </div>
                                         <div className="form-group mb-3 col-xs-12 col-sm-6">
                                             <label >Kích thước</label>
                                             <input disabled value={selectedBook.size}   type="text" className="form-control validate" required />
                                         </div>
                                     </div>
                                     <div className="row">
                                         <div className="form-group mb-3 col-xs-12 col-sm-6">
                                             <label >Loại bìa</label>
                                             <input disabled value={selectedBook.cover_Type} name="size" type="text" className="form-control validate" required />
                                         </div>
                                         <div className="form-group mb-3 col-xs-12 col-sm-6">
                                             <label  for="name">Khu vực</label>
                                           
                                                 <select disabled defaultValue={selectedBook.zoneType}  className="custom-select tm-select-accounts" id="tag">
                                                     <option value="Sách tiếng việt" >Sách tiếng việt</option>
                                                     <option value="Sách tiếng anh" >Sách tiếng anh</option>
                                                 </select>
                                               
                                         </div>
                                     </div>
                                     <div className="form-group mb-3">
                                         <label for="description">Mô tả</label>
                                         <textarea disabled value={selectedBook.description}  className="form-control validate" rows="3" required></textarea>
                                     </div>
                                     <button onClick={()=>props.history.push('/admin/update_book',{bookData:selectedBook})}  className="btn btn-info form-group mb-3" style={{ width: '100%' }}>Cập nhật sản phẩm</button>

                                 </div>
                                 <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">

                                     <div className="row">
                                     <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <img alt="" src={selectedBook.imageSrc}  className="tm-product-img-dummy mx-auto">
                                                    {/* <i className="fas fa-cloud-upload-alt tm-upload-icon" onClick={handleClick} ></i> */}
                                                </img>
                                                <div className="custom-file mt-3 mb-3" >
                                                    <input id="fileInput" accept="image/*" type="file" style={{ display: 'none' }}  />
                                                </div>
                                            </div>
                                     </div>

                                 </div>

                             </div>

                         </div>

                     </div>

                 </div>

             </div>


         </div>:null}
            <div style={{ paddingTop: '180px' }}><Footer /></div>
        </div>
    );
};

export default Book;