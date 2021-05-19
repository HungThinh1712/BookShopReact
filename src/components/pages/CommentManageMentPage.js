import React, {useEffect,useState, } from 'react';
import Nav from '../common/UserPageNav'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../common/Footer';
import CommentDialog from '../common/CommentDialog';
import * as commentActions from './../../actions/commentAction'
import Divider from '@material-ui/core/Divider';
import {useSelector, useDispatch} from 'react-redux';
import BreadCrumb from "../common/Breadcrumbs";

const useStyles = makeStyles((theme) => ({


    container: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: '0px',
        marginTop: '80px'
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: '87px',
        marginTop: '120px'
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft: '0px',
        marginTop: '80px'
      },
    
    },
    pagination: {
      [theme.breakpoints.up('sm')]: {
        marginLeft:'auto', marginRight:'120px'
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft:'auto', marginRight:'120px'
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft:'auto', marginRight:'0'
      },
    
    },
  
  }));

const CommentPage = (props) => {
    const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).id : null
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(commentActions.getCommentsUserRequest(userId));
    },[props.page])

    // const rows = useSelector(state=>state.comment.comments ? state.comment.comments: {});
    const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
    const showComments = (

    <div >
      <CommentDialog
        key={useSelector(state=>state.comment.comments.id)}
        title={useSelector(state=>state.comment.comments.title)}
        content={useSelector(state=>state.comment.comments.content)}
        createAt={useSelector(state=>state.comment.comments.createAt)}
        imgSrc={useSelector(state=>state.comment.comments.imgSrc)}
        bookId={useSelector(state=>state.comment.comments.bookId)}
        bookName={useSelector(state=>state.comment.comments.bookName)}     
        rate={useSelector(state=>state.comment.comments.rate)}
      />
    </div>
  )
    return (
        <div>
        <div>
          <Header />
          <div style={{ marginTop: "100px", marginLeft: "85px", marginBottom:"-100px"}}>
              <BreadCrumb
                breadcrumb="Nhận xét của tôi" link_root="/" link="/comment_history">
              </BreadCrumb>
            </div>
          <div className={`${classes.container}`} >
            <div className="row">
            <Nav imgSrc={userData.imgSrc} className={classes.nav} name={userData.fullName} props={props} />
              <div className="col-xs-7 col-sm-8 " >
                <p style={{ fontSize: '25px', fontWeight: 500, marginTop: "-7px" }}>Nhận xét của tôi</p>
                {showComments}
              </div>              
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '200px' }}><Footer /></div>
      </div>
    );
};

export default CommentPage;