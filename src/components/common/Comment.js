import React from 'react';
import Rating from '@material-ui/lab/Rating';
const Comment = (props) => {
	return (		
				<div style={{display:'flex',flexDirection:'row', flexWrap:'wrap'}}>
					<div className="col-sm-2">
						<img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" alt="" className="img-rounded" style={{ borderRadius: '50%' }} />
						<div className="review-block-name"><div >{props.name}</div></div>
						<div className="review-block-date">24 tháng 11, 2020<br />1 ngày trước</div>
					</div>
					<div className="col-sm-10" >
						<div className="review-block-rate" >
							<Rating value={props.rating} readOnly />
						</div>
						<div className="review-block-title">{props.title}</div>
						<div className="review-block-description">{props.content}</div>
					</div>
				</div>

	);
};

export default Comment;