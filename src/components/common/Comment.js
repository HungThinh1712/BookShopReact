import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Dialog from './DialogComment'
import {useSelector} from 'react-redux';


const Comment = (props) => {
	const [open, setOpen] = React.useState(false);
    const handleClickOpen = (value) => {
		setOpen(true);
		setTag(value)
	  };
	const [tag,setTag]= useState(0);
    const handleClose = () => {
      setOpen(false);
	};
	
	console.log("props",props)
	const userId = useSelector(state=>state.auth.userData ? state.auth.userData.id : '' )
	const date = new Date(props.createAt);
	return (		
				<div style={{display:'flex'}}>
					<Dialog actionTag={props.actionTag} action={props.action} page={props.page} open={open} tag={tag} onClose={handleClose} props={props} ></Dialog>
					<div className="col-sm-2" >
						<img src={props.imgSrc} alt="" className="img-rounded" style={{ borderRadius: '50%',maxWidth:'50px',maxHeight:'50px' }} />
						<div className="review-block-name"><div >{props.name}</div></div>
						<div className="review-block-date">{date.getUTCDate() + " tháng " + (date.getUTCMonth()+1) +',' + "  " + date.getUTCFullYear()}<br /></div>
					</div>
					<div className="col-sm-10" >
						<div className="review-block-rate" style={{display:'flex',flexDirection:'row',flexGrow:1}}  >
							<Rating value={props.rating} readOnly />
						</div>
						<div className="review-block-title">{props.title}</div>
						<div className="review-block-description">{props.content}</div>
						{userId===props.userId ?<div style={{display:'flex',flexDirection:'row',marginTop:'-30px'}}>
							<div onClick={()=>handleClickOpen(0)}  style={{fontSize:'12px',color:'blue',cursor:'pointer'}} >Chỉnh sửa</div>
							<div onClick={()=>handleClickOpen(1)} style={{fontSize:'12px',color:'blue',marginLeft:'15px',cursor:'pointer'}} >Xóa</div>
						</div>:null}
					</div>
				</div>
	);
};

export default Comment;