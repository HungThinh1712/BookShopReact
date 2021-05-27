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
  useEffect(()=>{
    dispatch(orderActions.getOrdersRequest(props.page,4));
  },[props.page])

  const rows = useSelector(state=>state.order.orders.entities ? state.order.orders.entities: [] )
  const handelRowClick = (row) =>{
    props.history.push('/order_details', {itemsInOrder:row.items})
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
  }, [connection]);
  const showStatus = (status) => {
    if(status==="Đang chờ xác nhận"){
      console.log(status)
      return <div style={{color:'green'}}>{status}</div>
    }
    else{
      return <div style={{color:'blue'}}>{status}</div>
    }
  }
  return (
    
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
              <TableCell >{row.totalMoney} đ</TableCell>
              <TableCell >{showStatus(row.status)}</TableCell>
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}
export default withRouter(BasicTable)