import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux'
import * as orderActions from '../../actions/orderAction'
import { withRouter } from 'react-router-dom'
import { HubConnectionBuilder } from '@microsoft/signalr';
import Pagination from '../common/Pagination'
import * as CallApis from '../../constants/Apis'
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,

  },
  header: {
    fontWeight: 900
  },

  confirm: {
    "&:hover": {

      backgroundColor: 'white',
      cursor: 'pointer'
    },
    display:'inline-block',
    height:'20px'
  },
  
  row: {
    "&:hover": {

      backgroundColor: 'white',
      cursor: 'pointer'
    },
    pagination: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: 'auto', marginRight: '120px'
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: 'auto', marginRight: '120px'
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft: 'auto', marginRight: '0'
      },
      

    },

  },
}));


const BasicTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {

    setPage(value);

  };

  const total = useSelector(state => state.order.orders.total ? state.order.orders.total : 0)
  const paging = total % 10 === 0 ? total / 10 : Math.floor(total / 10) + 1
  useEffect(() => {
    dispatch(orderActions.getAllOrdersRequest(page, 10,0));
  }, [page])


  const rows = useSelector(state => state.order.orders.entities ? state.order.orders.entities : [])
  // const handelRowClick = (row) =>{

  //   props.history.push('/order_details', {itemsInOrder:row.items})
  // }
  const [connection, setConnection] = useState(null);


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
            if(message!=null){
              dispatch(orderActions.getAllOrdersRequest(page, 10,0));
            }
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);
  const sendMessage = async (userId, id, orderId) => {

    const chatMessage = {
      title: 'Xác nhận đơn hàng',
      content: `Đơn hàng của bạn đã được xác nhận bởi quản trị viên. Mã đơn hàng: ${orderId}`,
      userId: userId,
      orderCode: orderId,
      orderId: id

    };
    dispatch(orderActions.confirmOder(id));

    try {
      const url = CallApis.API_URL.concat(`/Notification/messages`)
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(chatMessage),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    catch (e) {
      console.log('Sending message failed.', e);
    }
  }

  const showStatus = (status) => {
    if (status === "Đang chờ xác nhận") {
      return <div className={classes.confirm} style={{ textDecoration: 'underline', color: 'blue' }}><p>Xác nhận đơn hàng</p></div>
    }
    else {
      return <div style={{ color: 'green' }}>{status}</div>
    }
  }

  return (

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow style={{ height: '80px', fontWeight: '900' }} >
            <TableCell className={classes.header}>Tên tác giả</TableCell>
            <TableCell className={classes.header} >Hành động</TableCell>      
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow style={{ height: '80px' }} className={classes.row} key={index}>
              <TableCell >
                {row.orderId}
              </TableCell>
              <TableCell >{row.createAt}</TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>

      {total > 10 ? <div className={classes.pagination} style={{ marginTop: '10px' }}>
        <Pagination total={paging} onChange={handlePageChange} page={page} />
      </div> : null}

    </TableContainer>

  );
}
export default withRouter(BasicTable)