import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import * as commentActions from './../../actions/commentAction'
import {toastMessage} from './ToastHelper';
import * as orderActions from './../../actions/orderAction'
import {useTranslation} from 'react-i18next'

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('md')]: {
          display:'none'
        },
      },
}));

const WriteCommentZone = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userId = useSelector(state=>state.auth.userData ? state.auth.userData.id : null)
    const bookId = useSelector(state => state.books.selectedBook ? state.books.selectedBook.id : null )
    const arrays = [];

    const i = 0;

    useEffect(()=>{
      dispatch(orderActions.getOrdersRequest(props.page,4));
    },[props.page])

    for ( const ele of (useSelector(state => state.order.orders.entities ? state.order.orders.entities : []))){
      for  (let i = 0; i < 10;i++) {
        arrays.push(ele.items[0].bookId);
      }
    } 
    console.log(arrays);

    const checkBook = (bookId) => {
      if (arrays.find(item => item == bookId)) {
        return 1;
      } else return 0;
    }

    const [rate,setRate] = useState(0);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const handleRatingChange = e => {
      setRate(e.target.value);
    };
    const handleTitleChange = (e) => {
      setTitle(e.target.value); 
    };
    const handleContentChange = (e) => {
      setContent(e.target.value);  
    };
  
    const handleSubmit = async e => {   
        if(userId){
          const page = props.page
          const commentData = {userId,bookId,rate,content,title,page};
          if(rate===0)
            toastMessage("Vui lòng chọn đánh giá")
          else if(content==="")
            toastMessage("Vui lòng nhập bình luận");

          else{
            await dispatch(commentActions.addComment(commentData))
          setRate(0);
          setTitle("");
          setContent("");
          }
          }
        else{
          toastMessage("Đăng nhập để tiếp tục");
          setRate(0);
          setTitle("");
          setContent("");
        }
      
    };

    if (checkBook(bookId) == 0)
    {
      return (
        <div></div>
      )
    }
    else
    {
      return (
        <div style={{marginLeft:'50px',marginTop:'50px'}}>
				<div className={classes.container}>
                <div >
					<h6>Viết đánh giá của bạn</h6>
					<div className="stars" >
						<Rating value={rate} onChange={handleRatingChange} size="large"/>
					</div>
          <div><input value={title} onChange={handleTitleChange} style={{marginBottom:'10px',padding:'5px'}} placeholder='Nhập tiêu đề bình luận'/></div>
				</div>
				<div className="input-your-rating" >
					<textarea value={content} onChange={handleContentChange} rows="3" cols="53" name="comment"  style={{fontSize: '16px',padding:'5px'}}></textarea>
				</div>
                </div>
				<button onClick={handleSubmit} className="btn-send">Gửi đánh giá</button>
			</div>
    );
    }   
};

export default WriteCommentZone;