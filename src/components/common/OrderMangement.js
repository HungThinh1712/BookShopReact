import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector,useDispatch} from 'react-redux'
import * as orderActions from './../../actions/orderAction'
import {withRouter} from 'react-router-dom'
import * as CallApis from '../../constants/Apis'
import { HubConnectionBuilder } from '@microsoft/signalr';
import {useTranslation} from 'react-i18next'
import { Tag } from 'antd';
import CancelIcon from "../Images/cancel.png";
import Delivery from "../Images/Delivery.jpg"
import Confirming from "../Images/Confirming.png"
import Deliveried from "../Images/Deliveried.png"
import Confirmed from "../Images/Confirmed.png"
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    
  },
  header :{
      fontWeight:900
  },
  row: {      
    "&:hover": {
      
        backgroundColor:'#f2f2f2',
        cursor: 'pointer'
    },
},
});


const BasicTable =(props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [status,setStatus] = useState(0);
  
  useEffect(()=>{
    dispatch(orderActions.getOrdersRequest(props.page,4,status));
  },[props.page,dispatch,status])

  const rows = useSelector(state=>state.order.orders.entities ? state.order.orders.entities: [] )
  const handelRowClick = (row) =>{
    props.history.push(`/order_details/${row.id}`)
  }

  const [ connection, setConnection ] = useState(null);
   

  useEffect(() => {
      const url = CallApis.API_URL.concat(`/hubs/notification`)
      const newConnection = new HubConnectionBuilder()
          .withUrl(url)
          .withAutomaticReconnect()
          .build();

      setConnection(newConnection);
  }, []);

  useEffect(() => {
      if (connection) {
          connection.start()
              .then(result => {
                  console.log('Connected!');
  
                  connection.on('ReceiveMessage', message => {
                      if(message!==null ){
                        dispatch(orderActions.getOrdersRequest(props.page,4));
                      }
                  });
              })
              .catch(e => console.log('Connection failed: ', e));
      }
  }, [connection,dispatch,props.page]);

  
  const handleTabChange =(key)=>{
    setStatus(key);
  }

  const showStatus = (status) => {
    if (status === 0) {
      return (
        <div>
        <img style={{width:'40px',height:"30px",marginRight:"5px"}} src={Confirming}></img>
        <span style={{fontWeight:"800"}}>Chờ xác nhận</span>
      </div>
      );
    } else if (status === 1) {
      return <div>
      <img style={{width:'40px',height:"30px",marginRight:"5px"}} src={Confirmed}></img>
      <span style={{fontWeight:"800"}}>Đã xác nhận</span>
    </div>;
    } else if (status === 2) {
      return <div>
      <img style={{width:'40px',height:"30px",marginRight:"5px"}} src={Delivery}></img>
      <span style={{fontWeight:"800"}}>Đang giao hàng</span>
    </div>;
    } else if (status === 3) {
      return <div>
      <img style={{width:'40px',height:"30px",marginRight:"5px"}} src={Deliveried}></img>
      <span style={{fontWeight:"800"}}>Đã giao hàng</span>
    </div>
    } else {
      return (
        <div>
          <img style={{width:'40px',height:"30px",marginRight:"5px"}} src={CancelIcon}></img>
          <span style={{fontWeight:"800"}}>Đã hủy</span>
        </div>
      );
    }
  };
  return (
    
    <Tabs defaultActiveKey="0" onChange={handleTabChange} >
    <TabPane tab="Đang chờ xác nhận" key="0">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow style={{height:'80px',fontWeight:'900'}} >
            <TableCell className={classes.header} >{t('Admin_Other.5')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.6')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.7')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.10')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.8')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow onClick={()=>handelRowClick(row)} style={{height:'80px'}} className={classes.row} key={row.name}>
              <TableCell component="th" scope="row" style={{width:'150px'}}>
                {row.orderId}
              </TableCell>
              <TableCell style={{width:'150px'}} >{row.createAt}</TableCell>
              <TableCell style={{width:'300px'}}>{row.description}</TableCell>
              <TableCell >{row.totalMoney.toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</TableCell>
              <TableCell >{showStatus(row.status)}</TableCell>
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </TabPane>
    <TabPane tab="Đã xác nhận" key="1">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow style={{height:'80px',fontWeight:'900'}} >
            <TableCell className={classes.header} >{t('Admin_Other.5')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.6')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.7')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.10')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.8')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow onClick={()=>handelRowClick(row)} style={{height:'80px'}} className={classes.row} key={row.name}>
              <TableCell component="th" scope="row" style={{width:'150px'}}>
                {row.orderId}
              </TableCell>
              <TableCell style={{width:'150px'}} >{row.createAt}</TableCell>
              <TableCell style={{width:'300px'}}>{row.description}</TableCell>
              <TableCell >{row.totalMoney.toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</TableCell>
              <TableCell >{showStatus(row.status)}</TableCell>
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </TabPane>
    <TabPane tab="Đang giao hàng" key="2">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow style={{height:'80px',fontWeight:'900'}} >
            <TableCell className={classes.header} >{t('Admin_Other.5')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.6')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.7')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.10')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.8')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow onClick={()=>handelRowClick(row)} style={{height:'80px'}} className={classes.row} key={row.name}>
              <TableCell component="th" scope="row" style={{width:'150px'}}>
                {row.orderId}
              </TableCell>
              <TableCell style={{width:'150px'}} >{row.createAt}</TableCell>
              <TableCell style={{width:'300px'}}>{row.description}</TableCell>
              <TableCell >{row.totalMoney.toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</TableCell>
              <TableCell >{showStatus(row.status)}</TableCell>
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </TabPane>
    <TabPane tab="Đã giao hàng" key="3">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow style={{height:'80px',fontWeight:'900'}} >
            <TableCell className={classes.header} >{t('Admin_Other.5')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.6')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.7')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.10')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.8')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow onClick={()=>handelRowClick(row)} style={{height:'80px'}} className={classes.row} key={row.name}>
              <TableCell component="th" scope="row" style={{width:'150px'}}>
                {row.orderId}
              </TableCell>
              <TableCell style={{width:'150px'}} >{row.createAt}</TableCell>
              <TableCell style={{width:'300px'}}>{row.description}</TableCell>
              <TableCell >{row.totalMoney.toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</TableCell>
              <TableCell >{showStatus(row.status)}</TableCell>
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </TabPane>
    <TabPane tab="Đã hủy" key="4">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow style={{height:'80px',fontWeight:'900'}} >
            <TableCell className={classes.header} >{t('Admin_Other.5')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.6')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.7')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.10')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.8')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow onClick={()=>handelRowClick(row)} style={{height:'80px'}} className={classes.row} key={row.name}>
              <TableCell component="th" scope="row" style={{width:'150px'}}>
                {row.orderId}
              </TableCell>
              <TableCell style={{width:'150px'}} >{row.createAt}</TableCell>
              <TableCell style={{width:'300px'}}>{row.description}</TableCell>
              <TableCell >{row.totalMoney.toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</TableCell>
              <TableCell >{showStatus(row.status)}</TableCell>
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </TabPane>
  </Tabs>
    
    
  );
}
export default withRouter(BasicTable)