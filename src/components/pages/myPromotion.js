import React, {useEffect, useState } from 'react';
import Nav from '../common/UserPageNav'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../common/Footer';
import {useSelector, useDispatch} from 'react-redux';
import PromotionsByMe from '../common/PromotionByMe'
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
   
  
  }));

const PromotionPage = (props) => {
  const { t } =  useTranslation();
    const classes = useStyles();
    
    const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
    

    return (
        <div>
        <div>
          <Header />
          <div style={{ paddingTop: "100px", marginLeft: "85px", marginBottom:"-100px"}}>
            
            </div>
          <div className={`${classes.container}`} >
            <div className="row">
            <Nav imgSrc={userData.imgUrl} className={classes.nav} name={userData.fullName} props={props} />
              <div className="col-xs-7 col-sm-8 " >
                <p style={{ fontSize: '25px', fontWeight: 500, marginTop: "-7px" }}>Mã khuyến mãi</p>
                <PromotionsByMe />
                      
              </div>   
             
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '200px' }}><Footer /></div>
      </div>
    );
};

export default PromotionPage;