import React from 'react';
import Nav from '../common/UserPageNav'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../common/Footer';
import ItemInOrder from '../common/ItemInOrderDetails';
import Divider from '@material-ui/core/Divider';
import {useSelector} from 'react-redux';
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

const OrderDetailPage = (props) => {
  const { t } =  useTranslation();
    const classes = useStyles();
    const itemsInOrder =props.history.location.state.itemsInOrder
    const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
    const showItemsInOrder = itemsInOrder.map((item) =>

    <div >
      <ItemInOrder
        key={item.bookId}
        title={item.name}
        price={item.price}
        coverPrice={item.coverPrice}
        discount={Math.ceil(((item.coverPrice - item.price) / item.coverPrice) * 100)}
        amount={item.amount}
        imageSrc={item.imageSrc}
        bookId={item.bookId}
        authorName={item.authorName}     
      />
      {itemsInOrder.length > 1 ? <Divider /> : null}
    </div>
  )
    return (
        <div>
        <div>
          <Header />
          <div className={`${classes.container}`} >
            <div className="row">
            <Nav imgSrc={userData.imgSrc} className={classes.nav} name={userData.fullName} props={props} />
              <div className="col-xs-7 col-sm-8 " >
                <p style={{ fontSize: '25px', fontWeight: 500, marginTop: "-7px" }}>Chi tiết đơn hàng</p>
                {showItemsInOrder}
              </div>              
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '200px' }}><Footer /></div>
      </div>
    );
};

export default OrderDetailPage;