import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next'

const useStyles = makeStyles((theme) => ({
      table_info: {
        marginLeft:'87px',width:'100%',backgroundColor:'#1a936f',
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
    const { t } = useTranslation();
    const classes = useStyles();
    return (
            <div className={classes.table_info}>
                <div style={{ padding: '20px', display: 'flex',justifyContent:'space-between' }}>
                    <h7 style={{color:'#f3e9d2',fontWeight:'600'}}>{t('Admin_Book.9')} </h7>
                    <h7 style={{color:'#f3e9d2',fontWeight:'600'}}>{props.publishingHouseName}</h7>
                </div>
                <Divider />
                <div style={{ padding: '20px', display: 'flex',justifyContent:'space-between' }}>
                    <h7 style={{color:'#f3e9d2',fontWeight:'600'}}>{t('Admin_Book.27')}</h7>
                        <h7 style={{color:'#f3e9d2',fontWeight:'600'}}>{props.size}</h7>
                </div>
                <Divider />
                <div style={{ padding: '20px', display: 'flex',justifyContent:'space-between' }}>
                    <h7 style={{color:'#f3e9d2',fontWeight:'600'}}>{t('Admin_Book.16')}</h7>
                    <h7 style={{color:'#f3e9d2',fontWeight:'600'}}>{props.pageAmount}</h7>
                </div>
                <Divider />
                <div style={{ padding: '20px', display: 'flex',justifyContent:'space-between' }}>
                    <h7 style={{color:'#f3e9d2',fontWeight:'600'}}>{t('Admin_Book.18')}</h7>
                    <h7 style={{color:'#f3e9d2',fontWeight:'600'}}>{props.coverType}</h7>
                </div>
                <Divider />
                <div style={{ padding: '20px', display: 'flex',justifyContent:'space-between' }}>
                    <h7 style={{color:'#f3e9d2',fontWeight:'600'}}>{t('Admin_Book.12')}</h7>
                    <h7 style={{color:'#f3e9d2',fontWeight:'600'}}>{props.publishDate}</h7>
                </div>

            </div>
    );
};

export default TableInfo;