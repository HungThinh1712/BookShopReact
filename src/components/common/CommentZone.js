import React, {useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import { Paper } from '@material-ui/core';
import UserComment from './Comment'
import AmountRating from './AmountRating'
import WritingZone from './WriteCommentZone'
import {useSelector} from 'react-redux'
import Pagination from './../common/Pagination'
const Comment = (props) => {
	const comments = useSelector(state => state.comment.comments.entities ? state.comment.comments.entities : [])
	console.log(comments);
	const ratings = useSelector(state => state.comment.ratings )
	//Calculate rating of book
	const sumRate =  Object.values(ratings).reduce((total, item) => total + item.amount * item.value, 0) ? Object.values(ratings).reduce((total, item) => total + item.amount * item.value, 0) : 0 ;
	const sumAmountRate =  Object.values(ratings).reduce((total, item) => total + item.amount , 0) ?  Object.values(ratings).reduce((total, item) => total + item.amount , 0) : 1;
	const averageRate = (sumRate/sumAmountRate).toFixed(2);
	const total  = useSelector(state=>state.comment.comments.total ? state.comment.comments.total: 0 )

	const showComments =  comments.map((comment, index) => <UserComment
    key={comment.id}
	rating={comment.rate}
	bookId ={comment.bookId}
    title ={comment.title}
    name ={comment.userFullName}
	content={comment.content}
	createAt ={comment.createAt}
	id={comment.id}
	userId ={comment.userId}
	imgSrc ={comment.imgSrc}
	page ={props.page}
	action ={props.setDefaultPage}
	
  ></UserComment> )
  console.log("aaabbb",props.actionTag)
  const showRatings = ratings.map((rating, index) => <AmountRating
	value={rating.value}
	amount = {rating.amount}
   
  ></AmountRating>) 
  
  
    return (
        <Paper className="container" style={{marginLeft:'0',marginRight:'0',padding:'20px'}}>	
		<div className="row">
			<div style={{marginRight:'30px',padding:'50px'}}>
				<div style={{borderRightStyle: 'solid', borderRightColor: 'gray',paddingRight:'50px'}}>
					<h5>Đánh giá</h5>
					<h3 className="bold padding-bottom-7" style={{fontSize:'50px',color:'red'}}>{averageRate}<small style={{color:'black'}}>/ 5</small></h3>
					<Rating  disabled value={props.selectedBook.rating} name="unique-rating" />
				</div>
			</div>
			<div style={{marginTop:'50px'}}>
			{ratings ? showRatings : null}
			</div>
			<WritingZone page={props.page}/>
			
			<div className="row" style={{marginTop:'10px'}}>
				<div className="col-sm-12">
					<div className="review-block" style={{width:'100%'}}>
						{comments ? showComments : null}
					</div>
					<div style={{marginTop:'10px',marginLeft:'auto'}}>
					{total > 3 ? <div  style={{marginTop:'10px'}}>
              <Pagination tag={props.tag} total={props.total} onChange={props.onChange} page={props.page}/>
            </div>:null}
				</div>
				</div>
				
				
				
				
			</div>

		</div>			
		
		
    </Paper>
    );
};

export default Comment;