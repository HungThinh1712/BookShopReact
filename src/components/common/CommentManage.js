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
import * as commentActions from './../../actions/commentAction'
import {withRouter} from 'react-router-dom'
import * as CallApis from '../../constants/Apis'
import { HubConnectionBuilder } from '@microsoft/signalr';
import {useTranslation} from 'react-i18next'
import StarIcon from '@material-ui/icons/Star';
import { yellow } from '@material-ui/core/colors';

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
    dispatch(commentActions.getCommentRequest(props.page,4));
  },[props.page,dispatch])

  const rows = useSelector(state=>state.comment.comments.entities ? state.comment.comments.entities: [] )

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
                        dispatch(commentActions.getCommentRequest(props.page,4));
                      }
                  });
              })
              .catch(e => console.log('Connection failed: ', e));
      }
  }, [connection,dispatch,props.page]);

  const handelRowClick = (row) =>{
    props.history.push(`/details/${row.bookId}`)
  }

  return (
    
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow style={{height:'80px',fontWeight:'900'}} >
            <TableCell className={classes.header} >{t('Customer_Management.22')}</TableCell>
            <TableCell className={classes.header} >{t('Admin_Book.6')}</TableCell>
            <TableCell className={classes.header} >{t('Customer_Management.20')}</TableCell>
            <TableCell className={classes.header} >{t('Customer_Management.23')}</TableCell>
            <TableCell className={classes.header} >{t('Customer_Management.21')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow onClick={()=>handelRowClick(row)} style={{height:'80px'}} className={classes.row} key={row.name}>
              <TableCell >{row.createAt}</TableCell>
              <TableCell >{row.bookName}</TableCell>
              <TableCell >{row.title}</TableCell>
              <TableCell >{row.content}</TableCell>
              <TableCell >{row.rate} <StarIcon style={{ color: yellow[900] }}/></TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}
export default withRouter(BasicTable)