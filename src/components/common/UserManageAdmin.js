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
import * as orderActions from '../../actions/orderAction'
import {withRouter} from 'react-router-dom'
import { HubConnectionBuilder } from '@microsoft/signalr';
import Pagination from '../common/Pagination'
import * as CallApis from '../../constants/Apis'
import * as userActions from '../../actions/userAction'
import {useTranslation} from 'react-i18next'

const useStyles = makeStyles((theme)=>({
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
},
}));


const BasicTable =(props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page,setPage] =useState(1);
  const handlePageChange = (event, value) => {
  
    setPage(value);
  
  };

  
  
  const total  = useSelector(state=>state.users.users.total ? state.users.users.total: 0 )
  const paging = total%10===0 ? total/10: Math.floor(total/10) + 1
  
  useEffect(()=>{
    dispatch(userActions.getAllUsersRequest(page,props.searchString,10));
  },[page,props.searchString])

  const rows = useSelector(state=>state.users.users.entities ? state.users.users.entities: [])
  // const handelRowClick = (row) =>{
  
  //   props.history.push('/order_details', {itemsInOrder:row.items})
  // }
 

  return (
    
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow style={{height:'80px',fontWeight:'900'}} >
            <TableCell className={classes.header}>{t('Admin_Other.20')}</TableCell>
            <TableCell className={classes.header} >Email</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.15')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.16')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.17')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.21')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Other.11')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow style={{height:'80px'}} className={classes.row} key={index}>
              <TableCell component="th" scope="row" style={{width:'150px'}}>
                {row.fullName}
              </TableCell>
              <TableCell style={{width:'150px'}} >{row.email}</TableCell>
              <TableCell style={{width:'150px'}}>{row.phone}</TableCell>
              <TableCell >{row.birthDay}</TableCell>
              <TableCell >{row.address}</TableCell>
              <TableCell >{row.sex==1?'Nam':'Nữ'}</TableCell>
              <TableCell style={{color:"blue"}}>{t('Admin_Other.30')}</TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>

            {total > 10 ? <div className={classes.pagination} style={{marginTop:'10px'}}>
              <Pagination total={paging} onChange={handlePageChange} page={page}/>
            </div>:null}
   
    </TableContainer>
    
  );
}
export default withRouter(BasicTable)