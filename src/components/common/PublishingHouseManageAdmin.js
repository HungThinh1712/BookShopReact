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
import * as publishHouseActions from '../../actions/publishHouseAction'
import {withRouter} from 'react-router-dom'
import { HubConnectionBuilder } from '@microsoft/signalr';
import Pagination from './Pagination'
import Dialog from './DialogAdmin'
import {toastMessage} from './../common/ToastHelper'
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
  const publishHouseData = useSelector(state => state.publishHouse.publishHouseData ? state.publishHouse.publishHouseData : null);
  const id = publishHouseData ? publishHouseData.id : null;
  const [name,setName] =useState(publishHouseData && publishHouseData.Name ?publishHouseData.Name:'');
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page,setPage] =useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const total  = useSelector(state=>state.publishHouse.publishHouses.total ? state.publishHouse.publishHouses.total: 0 )
  const paging = total%10===0 ? total/10: Math.floor(total/10) + 1

  useEffect(()=>{
    dispatch(publishHouseActions.getAllPublishingHouseRequest(page,props.searchString,10));
  },[page,props.searchString])

  const rows = useSelector(state=>state.publishHouse.publishHouses.entities ? state.publishHouse.publishHouses.entities: [])
  
  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleButtonClick = async (id)=>{
    const publishHouseData = {id, name};
    await dispatch(publishHouseActions.updatePublishHouse(publishHouseData))
    toastMessage("Cập nhật thành công")
  }

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

  return (
    <div>
      <TableContainer component={Paper}>
      <Dialog open={open} onClick={handleButtonClick} onClose={handleClose}></Dialog>
        <Table className={classes.table} aria-label="simple table">
          <TableHead >
            <TableRow style={{height:'80px',fontWeight:'900'}} >
              <TableCell className={classes.header}>Tên nhà xuất bản</TableCell>
              <TableCell className={classes.header}>Ngày tạo</TableCell>
              <TableCell className={classes.header} >Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,index) => (
              <TableRow onClick={()=>handelRowClick(row.id)} style={{ height: '80px' }} className={classes.row} key={index}>
                <TableCell component="th" scope="row" style={{width:'300px'}}>{row.name}</TableCell>
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
    </div>
  );
}

export default withRouter(BasicTable)