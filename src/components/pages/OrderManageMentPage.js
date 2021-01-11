import React, {useState} from 'react';
import Nav from '../common/UserPageNav'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../common/Footer';
import OrderManageMent from '../common/OrderMangement'
import Pagination from '../common/Pagination'
import {useSelector} from 'react-redux'
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
const OrderManageMentPage = (props) => {
  const classes = useStyles();
  const total  = useSelector(state=>state.order.orders.total ? state.order.orders.total: 0 )
  const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
  const [page,setPage] =useState(1);
  const handlePageChange = (event, value) => {
  
    setPage(value);
  
  };
  const paging = total%4===0 ? total/4 : Math.floor(total/4) + 1

  
  
  return (
    <div>
      <div>
        <Header />
        <div className={`${classes.container}`} >
          <div className="row">
            <Nav imgSrc={userData.imgSrc} className={classes.nav} name={userData.fullName} props={props} />
            <div className="col-xs-7 col-sm-8 " >
              <p style={{ fontSize: '25px', fontWeight: 500, marginTop: "-7px" }}>Đơn hàng của tôi</p>
              <OrderManageMent page ={page} />
            </div>
            {total > 4 ? <div className={classes.pagination} style={{marginTop:'10px'}}>
              <Pagination total={paging} onChange={handlePageChange} page={page}/>
            </div>:null}
          </div>
        </div>
      </div>
      <div style={{ paddingTop: '200px' }}><Footer /></div>
    </div>
  );
};

export default OrderManageMentPage;