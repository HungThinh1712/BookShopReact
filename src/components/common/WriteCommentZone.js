import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import * as commentActions from './../../actions/commentAction'
const useStyles = makeStyles((theme) => ({

    
    container: {
        [theme.breakpoints.down('md')]: {
          display:'none'
        },
        
      },
      
}));
const WriteCommentZone = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userId = useSelector(state=>state.auth.userData ? state.auth.userData.id : null)
    const bookId = useSelector(state => state.books.selectedBook ? state.books.selectedBook.id : null )
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
        const commentData = {userId,bookId,rate,content,title};
        await dispatch(commentActions.addComment(commentData))
      
    };
    return (
        <div style={{marginLeft:'50px',marginTop:'50px'}}>
				<div className={classes.container}>
                <div >
					<h6>Viết đánh giá của bạn</h6>
					<div className="stars" >
						<Rating onChange={handleRatingChange} size="large"/>
					</div>
          <div><input onChange={handleTitleChange} style={{marginBottom:'10px',padding:'5px'}} placeholder='Nhập tiêu đề bình luận'/></div>
				</div>
				<div className="input-your-rating" >
					<textarea onChange={handleContentChange} rows="3" cols="53" name="comment"  style={{fontSize: '16px',padding:'5px'}}></textarea>
				</div>
                </div>
				<button onClick={handleSubmit} className="btn-send">Gửi đánh giá</button>
			</div>
    );
};

export default WriteCommentZone;