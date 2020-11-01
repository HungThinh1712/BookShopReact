import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

    
      table_info: {
        marginLeft:'87px',width:'25%',backgroundColor:'#8470FF',
        [theme.breakpoints.down('sm')]: {
          marginTop: '5px',
          marginLeft: '0px',
          width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
          marginLeft:'0px',
          marginTop:'10px',
        },
        [theme.breakpoints.up('lg')]: {
          marginLeft:'87px',width:'25%',
          },
      },
         
}));

const TableInfo = (props) => {
    const classes = useStyles();
    return (
            <div className={classes.table_info}>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{color:'white'}}>Nhà xuất bản </h6>
                    <div style={{ flexGrow: '1' }} />
                    <h6 style={{color:'white'}}>{props.publishingHouseName}</h6>
                </div>
                <Divider />
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{color:'white'}}>Kích thước</h6>
                    <div style={{ flexGrow: '1' }} />
                        <h6 style={{color:'white'}}>{props.size}</h6>
                </div>
                <Divider />
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{color:'white'}}>Số trang</h6>
                    <div style={{ flexGrow: '1' }} />
                    <h6 style={{color:'white'}}>{props.pageAmount}</h6>
                </div>
                <Divider />
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{color:'white'}}>Loại bìa</h6>
                    <div style={{ flexGrow: '1' }} />
                    <h6 style={{color:'white'}}>{props.coverType}</h6>
                </div>
                <Divider />
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{color:'white'}}>Ngày xuất bản</h6>
                    <div style={{ flexGrow: '1' }} />
                    <h6 style={{color:'white'}}>{props.publishDate}</h6>
                </div>

            </div>
    );
};

export default TableInfo;