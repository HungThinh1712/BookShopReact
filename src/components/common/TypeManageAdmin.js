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
import * as typeActions from '../../actions/typesAction'
import {withRouter} from 'react-router-dom'
import { HubConnectionBuilder } from '@microsoft/signalr';
import Pagination from '../common/Pagination'
import Dialog from './DialogAdmin'
import * as CallApis from '../../constants/Apis'
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page,setPage] =useState(1);
  const handlePageChange = (event, value) => {
  
    setPage(value);
  
  };

  const total  = useSelector(state=>state.type.types.total ? state.type.types.total: 0 )
  const paging = total%10===0 ? total/10: Math.floor(total/10) + 1

  useEffect(()=>{
    dispatch(typeActions.getAllTypeRequest(page,props.searchString,10));
  },[page,props.searchString])

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (value) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
	};

  const [items,setItems] = useState([])
  const handelRowClick = (row) =>{
    setItems(row.items);
    handleClickOpen();
  }

  const handleButtonClick = async ()=>{
  }

  const rows = useSelector(state=>state.type.types.entities ? state.type.types.entities: [])

  return (
    
    <TableContainer component={Paper}>
      <Dialog open={open} onClick={handleButtonClick} onClose={handleClose}></Dialog>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow style={{height:'80px',fontWeight:'900'}} >
            <TableCell className={classes.header}>Thể loại sách</TableCell>
            <TableCell className={classes.header}>Ngày tạo</TableCell>
            <TableCell className={classes.header} >Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow onClick={()=>handelRowClick(row.id)} style={{ height: '80px' }} className={classes.row} key={index}>
              <TableCell component="th" scope="row" style={{width:'300px'}}>
                {row.name}
              </TableCell>
              <TableCell style={{width:'150px'}} >{row.createAt}</TableCell>
              <TableCell style={{color:"blue"}}>Cập nhật</TableCell>
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