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
  const { t } = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const userId = useSelector(state=>state.auth.userData ? state.auth.userData.id : null)
    const bookId = useSelector(state => state.books.selectedBook ? state.books.selectedBook.id : null )
    const arrays = [];


    useEffect(()=>{
      dispatch(orderActions.getOrdersRequest(props.page,4));
    },[props.page,dispatch])

    for ( const ele of (useSelector(state => state.order.orders.entities ? state.order.orders.entities : []))){
      for  (let i = 0; i < 10;i++) {
        arrays.push(ele.items[0].bookId);
      }
    } 
    console.log(arrays);

    const checkBook = (bookId) => {
      if (arrays.find(item => item === bookId)) {
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
            toastMessage(t('Toast_Message.10'))
          else if(content==="")
            toastMessage(t('Toast_Message.11'));

          else{
            await dispatch(commentActions.addComment(commentData))
          setRate(0);
          setTitle("");
          setContent("");
          }
          }
        else{
          toastMessage(t('Toast_Message.12'));
          setRate(0);
          setTitle("");
          setContent("");
        }
      
    };

    if (checkBook(bookId) === 0)
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
					<h6>{t('Customer_Detail.20')}</h6>
					<div className="stars" >
						<Rating value={rate} onChange={handleRatingChange} size="large"/>
					</div>
          <div><input value={title} onChange={handleTitleChange} style={{marginBottom:'10px',padding:'5px'}} placeholder={t('Customer_Detail.21')}/></div>
				</div>
				<div className="input-your-rating" >
					<textarea value={content} onChange={handleContentChange} rows="3" cols="53" name="comment"  style={{fontSize: '16px',padding:'5px'}}></textarea>
				</div>
                </div>
				<button onClick={handleSubmit} className="btn-send">{t('Customer_Detail.22')}</button>
			</div>
    );
    }   
};

export default WriteCommentZone;