import React, { useEffect } from 'react';
import Nav from '../common/UserPageNav'
import Header from '../common/Header'
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../common/Footer';
import ItemInOrder from '../common/ItemInOrderDetails';
import Divider from '@material-ui/core/Divider';
import {useSelector,useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next'
import * as orderAction from "../../actions/orderAction"

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
    const dispatch = useDispatch();
    const id = props.match.params.id
    const order = useSelector((state)=>state.order.order ?  state.order.order : null)
    
    const itemsInOrder =useSelector((state)=>state.order.order ?  state.order.order.items : [])
    const userData = useSelector(state => state.auth.userData ? state.auth.userData : null);
    useEffect(()=>{
      dispatch(orderAction.getOrderRequest(id));
    },[id])
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
        status = {order.status} 
        itemStatus ={item.statusRate} 
        orderId = {order.id}  
        userId ={userData.id}
      />
 <Divider />
    </div>
  )
    return (
        <div  >
        <div >
          <Header />
          <div className={`${classes.container}`} >
            <div className="row">
            <Nav imgSrc={userData.imgSrc} className={classes.nav} name={userData.fullName} props={props} />
              <div className="col-xs-7 col-sm-8 " >
                <p style={{ fontSize: '25px', fontWeight: 500, marginTop: "-7px" }}>{t('Admin_Other.4')}</p>
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