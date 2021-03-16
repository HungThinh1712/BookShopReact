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
import {useDispactch} from 'react-redux';
import { toastMessage} from './../../common/ToastHelper';

const UpdateBook = (props) => {


    const dispatch = useDispatch();
    const bookData = props.history.location.state.bookData ? props.history.location.state.bookData : [];
    console.log(bookData);
    useEffect(() => {
        dispatch(typeActions.getTypesRequest());
        dispatch(publishHouseActions.getPublishHousesRequest())
        dispatch(authorActions.getAuthorRequest())
    }, [dispatch])
    const types = useSelector(state => state.type.types)
    const authors = useSelector(state => state.author.authors)
    const publishHouses = useSelector(state => state.publishHouse.publishHouses)
    //Get Data types, tags,authors,publishhouse,
    const showTypes = types.map((type, index) => <option
        key={index}
        value={type.id}
    >{type.name}</option>)
    const showAuthors = authors.map((author, index) => <option
        key={index}
        value={author.id}
    >{author.name}</option>)
    const showPublishHouses = publishHouses.map((publishHouse, index) => <option
        key={index}
        value={publishHouse.id}
    >{publishHouse.name}</option>)

    const hiddenFileInput = React.useRef(null);

    const handleUpLoadClick = event => {
        hiddenFileInput.current.click();
    };
    //Show review Image
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0]
            const reader = new FileReader();
            reader.onload = x => {
                setImageFile(imageFile);
                setImageSrc(x.target.result)
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setImageFile(null);
            setImageSrc('/img/a.jpg')
        }
    };
    //Input 
    const [bookName, setBookName] = useState(bookData.bookName)
    const [typeId, setTypeId] = useState(bookData.typeId)
    const [authorId, setAuthorId] = useState(bookData.authorId)
    const [publishDate, setPublishDate] = useState(bookData.publishDate)
    const [amount, setAmount] = useState(bookData.amount)
    const [publishHouseId, setPublishHouseId] = useState(bookData.publishingHouseId)
    const [price, setPrice] = useState(bookData.price)
    const [coverPrice, setCoverPrice] = useState(bookData.coverPrice)
    const [pageAmount, setPageAmount] = useState(bookData.pageAmount)
    const [size, setSize] = useState(bookData.size)
    const [coverType, setCoverType] = useState(bookData.cover_Type)
    const [tag, setbookTag] = useState(bookData.tag)
    const [description, setDescription] = useState(bookData.description)
    const [imageSrc, setImageSrc] = useState(bookData.imageSrc)
    const [imageFile, setImageFile] = useState(null)
    const [zoneType, setZoneType] = useState(bookData.zoneType);

    //HandelInputChange
    const handleNameInputChange = e => {
        setBookName(e.target.value);
    };
    const handleTypeInputChange = e => {
        setTypeId(e.target.value);
    };
    const handleAuthorInputChange = e => {
        setAuthorId(e.target.value);
    };
    const handlePublishDateInputChange = e => {
        setPublishDate(e.target.value);
    };
    const handleAmountInputChange = e => {
        setAmount(e.target.value);
    };
    const handlePublishHouseInputChange = e => {
        setPublishHouseId(e.target.value);
    };
    const handlePriceInputChange = e => {
        setPrice(e.target.value);
    };
    const handleCoverPriceInputChange = e => {
        setCoverPrice(e.target.value);
    };
    const handlePageAmountInputChange = e => {
        setPageAmount(e.target.value);
    };
    const handleSizeInputChange = e => {
        setSize(e.target.value);
    };
    const handleCoverTypeChange = e => {
        setCoverType(e.target.value);
    };
    const handleDescriptionInputChange = e => {
        setDescription(e.target.value);
    };
    const handleTagInputChange = e => {
        setbookTag(e.target.value);
    };
    const handleZoneInputChange = e => {
        setZoneType(e.target.value);
    };

    //Add book
    const handleSubmit = async e => {
        const formData = new FormData();
        formData.append("id", bookData.id)
        formData.append("bookName", bookName)
        formData.append("zoneType", zoneType)
        formData.append("publishHouseId", publishHouseId)
        formData.append("typeId", typeId)
        formData.append("authorId", authorId)
        formData.append("publishDate", publishDate)
        formData.append("amount", amount)
        formData.append("price", price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
        formData.append("coverPrice", coverPrice.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
        formData.append("pageAmount", pageAmount)
        formData.append("size", size)
        formData.append("coverType", coverType)
        formData.append("tag", tag)
        formData.append("description", description)
        formData.append("imageFile", imageFile)


        //const bookData = {bookName,zoneType,publishHouseId,typeId,authorId,publishDate,amount,price,coverPrice,pageAmount,size,coverType,tagId,description,imageSrc,imageFile};
        await dispatch(bookActions.updateBook(formData));
    };

    const [open, setOpen] = React.useState(false);
    const [name,setName] = React.useState('');
    const handleClickOpen = (value) => {
      setOpen(true);
      setTag(value)
    };
    const handleChangeName = (e) =>{
        setName(e.target.value)
    }
    const handleClose = () => {
      setOpen(false);
    };
    const handleButtonAddClick = ()=>{
       if(name!==''){
            if(tagType==="Thêm nhà xuất bản"){
                dispatch(publishHouseActions.addPublishHouse({name:name}))
            }
            else if(tagType==="Thêm loại sách"){
                dispatch(typeActions.addType({name:name}))
            }
            else{
                dispatch(authorActions.addAuthor({name:name}))
            }
            setOpen(false);
            setName('');
       }else{
            toastMessage("Vui lòng nhập thẻ")
       }
       
    }
    const [tagType,setTag] =useState("");
    return (
        <div>
            <div id="wrapper">
                <Dialog open={open} onClick={handleButtonAddClick} onClose={handleClose} tagType={tagType} onChange={handleChangeName}></Dialog>
                <Header />
                <SideBarAdminPage />
                <div id="content-wrapper" style={{ marginTop: '100px' }}>
                    <div className="container-fluid">
                        <div className="card-body">
                            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                                <div className="row">
                                    <div className="col-12">
                                        <h4 className="tm-block-title d-inline-block">Cập nhật sản phẩm</h4>
                                    </div>
                                </div>
                                <div className="row tm-edit-product-row">
                                    <div className="col-xl-6 col-lg-6 col-md-12">
                                        <div className="form-group mb-3">
                                            <label for="name">Tên sách</label>
                                            <input value={bookName} onChange={handleNameInputChange} name="name" type="text" className="form-control validate" required />
                                        </div>
                                        <div className="row">
                                            
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label for="name">Loại thẻ</label>
                                              
                                                    <select value={tag} onChange={handleTagInputChange} className="custom-select tm-select-accounts" id="tagType">
                                                        <option >Chọn loại thẻ</option>
                                                        <option value="Sách bán chạy trong tuần" >Sách bán chạy trong tuần</option>
                                                        <option value="Sách bán chạy trong tháng" >Sách bán chạy trong tháng</option>
                                                        <option value="Sách bán chạy trong năm" >Sách bán chạy trong năm</option>
                                                    </select>
                                                  
                                            </div>
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <label for="publishing_house">Nhà xuất bản</label>
                                                    <div style={{flexGrow:'1'}}></div>
                                                    <i onClick={()=>handleClickOpen("Thêm nhà xuất bản")} style={{ display: 'flex', marginTop: '4px', color: 'blue' }} className="fas fa-plus-circle"></i>
                                                </div>
                                                <select  value={publishHouseId} onChange={handlePublishHouseInputChange} className="custom-select tm-select-accounts" id="category">
                                                    {showPublishHouses}
                                                </select>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <label for="tagType">Loại sách</label>
                                                    <div style={{flexGrow:'1'}}></div>
                                                    <i onClick={()=>handleClickOpen("Thêm loại sách")} style={{ display: 'flex', marginLeft: '5px', marginTop: '4px', color: 'blue' }} className="fas fa-plus-circle"></i>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <select value={typeId} onChange={handleTypeInputChange} className="custom-select tm-select-accounts" id="category">
                                                        {showTypes}
                                                    </select>
                                                    
                                                </div>
                                            </div>
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <label for="tagType">Tác giả</label>
                                                    <div style={{flexGrow:'1'}}></div>
                                                    <i onClick={()=>handleClickOpen("Thêm tác giả")} style={{ display: 'flex', marginLeft: '5px', marginTop: '4px', color: 'blue' }} className="fas fa-plus-circle"></i>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <select value={authorId} onChange={handleAuthorInputChange} className="custom-select tm-select-accounts" id="category">
                                                        {showAuthors}
                                                    </select>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label for="publish_date">Ngày xuất bản</label>
                                                <input value={publishDate} onChange={handlePublishDateInputChange} id="publish_date" name="publish_date" type="date" className="form-control validate" data-large-mode="true" />
                                            </div>
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label for="amount">Số lượng</label>
                                                <input value={amount} onChange={handleAmountInputChange} id="amount" name="amount" type="number" className="form-control validate" required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label for="price">Giá</label>
                                                <input value={price} onChange={handlePriceInputChange} name="price" type="text" className="form-control validate" required />
                                            </div>
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label for="price">Giá bìa</label>
                                                <input value={coverPrice} id="price" onChange={handleCoverPriceInputChange} name="price" type="text" className="form-control validate" required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label for="page_amount">Số trang</label>
                                                <input value={pageAmount} id="page_amount" onChange={handlePageAmountInputChange} name="page_amount" type="number" className="form-control validate" data-large-mode="true" />
                                            </div>
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label for="size">Kích thước</label>
                                                <input value={size} onChange={handleSizeInputChange} name="size" type="text" className="form-control validate" required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label for="cover_type">Loại bìa</label>
                                                <input value={coverType} id="size" onChange={handleCoverTypeChange} name="size" type="text" className="form-control validate" required />
                                            </div>
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <label for="name">Khu vực</label>
                                              
                                                    <select value={zoneType} onChange={handleZoneInputChange} className="custom-select tm-select-accounts" id="tagType">
                                                        <option >Chọn khu vực</option>
                                                        <option value="Sách tiếng việt" >Sách tiếng việt</option>
                                                        <option value="Sách tiếng anh" >Sách tiếng anh</option>
                                                    </select>
                                                  
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label for="description">Mô tả</label>
                                            <textarea value={description} onChange={handleDescriptionInputChange} className="form-control validate" rows="3" required></textarea>
                                        </div>
                                        <button onClick={handleSubmit} className="btn btn-info form-group mb-3" style={{ width: '100%' }}>Cập nhật sản phẩm</button>

                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">

                                        <div className="row">
                                            <div className="form-group mb-3 col-xs-12 col-sm-6">
                                                <img alt="" src={imageSrc} onClick={handleUpLoadClick} className="tm-product-img-dummy mx-auto">
                                                    {/* <i className="fas fa-cloud-upload-alt tm-upload-icon" onClick={handleClick} ></i> */}
                                                </img>
                                                <div className="custom-file mt-3 mb-3" >
                                                    <input id="fileInput" accept="image/*" type="file" style={{ display: 'none' }} ref={hiddenFileInput} onChange={showPreview} />
                                                </div>
                                            </div>
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

export default UpdateBook;