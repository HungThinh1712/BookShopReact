import React, {useEffect, useState } from 'react';
import Nav from '../common/UserPageNav'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../common/Footer';
import CommentDialog from '../common/CommentDialog';
import * as commentActions from './../../actions/commentAction'
import {useSelector, useDispatch} from 'react-redux';
import BreadCrumb from "../common/Breadcrumbs";
import CommentManage from '../common/CommentManage'
import {useTranslation} from 'react-i18next'

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
  const { t } =  useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    // const total  = useSelector(state=>state.comment.comments.total ? state.comment.comments.total: 0 )
    const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
    const [page,setPage] =useState(1);
    const handlePageChange = (event, value) => {
    
      setPage(value);
    
    };
  // const paging = total%4===0 ? total/4 : Math.floor(total/4) + 1

    return (
        <div>
        <div>
          <Header />
          <div style={{ marginTop: "100px", marginLeft: "85px", marginBottom:"-100px"}}>
              <BreadCrumb
                breadcrumb={t('Customer_BreadCrumbs.5')} onClick={()=>props.history.push("/")} onClick2={()=>props.history.push("/comment_history")}>
              </BreadCrumb>
            </div>
          <div className={`${classes.container}`} >
            <div className="row">
            <Nav imgSrc={userData.imgSrc} className={classes.nav} name={userData.fullName} props={props} />
              <div className="col-xs-7 col-sm-8 " >
                <p style={{ fontSize: '25px', fontWeight: 500, marginTop: "-7px" }}>{t('Customer_BreadCrumbs.5')}</p>
                <CommentManage page ={page} />
              </div>              
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '200px' }}><Footer /></div>
      </div>
    );
};

export default CommentPage;