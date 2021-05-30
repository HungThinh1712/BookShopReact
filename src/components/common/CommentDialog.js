import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next'

const useStyles = makeStyles((theme) => ({


    item: {
        [theme.breakpoints.up('sm')]: {

        },
        [theme.breakpoints.up('lg')]: {
            display: 'flex', marginLeft: '20px', marginTop: "20px"
        },
        [theme.breakpoints.down('lg')]: {
            display: 'flex', marginLeft: '20px', marginTop: "20px"
        },
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft:'0px'
        },
    },
    flex: {
        flexGrow: '0.9'
    },
    title: {
        marginLeft: '30px', marginTop: '10px', fontSize: '18px', fontWeight: '900',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px'
        },
    },
    name: {
        marginLeft: '30px', marginTop: '16px', fontSize: '14px', 
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px'
        },
    },
    delete_link: {
        marginLeft: '30px', marginTop: '18px', fontSize: '14px', 
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px'
        },
    },
}));

const CommentDialogs = (props) => {
    const { t } = useTranslation();
    const classes = useStyles()
    return (
        <div style={{border:'none'}}>
            <div className={classes.item}>
                <div style={{height:'8em',width:'7em',display:'flex',alignContent:"center",justifyContent:'center', marginBottom:'12px' }}>
                    <img className="card_image" src={props.imgSrc} alt="product "  style={{maxWidth:'100%',maxHeight:'100%'}} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className={classes.title}>{props.name}</span>
                   {props.bookName ?  <span className={classes.name}>{t('Customer_Management.12')}: {props.bookName}</span>:null}
        
                </div>
                <div className={classes.flex}></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ marginTop: '10px', fontSize: '12px', fontWeight: '500', color: 'red'}}>{t('Customer_Management.22')}: {props.createAt}</span>
                    <span style={{ marginTop: '10px', fontSize: '15px', fontWeight: '500', color: 'black'}}>{t('Customer_Management.20')}: {props.title}</span>
                    <span style={{ marginTop: '10px', fontSize: '13px', fontWeight: '300', color: 'black'}}>{t('Customer_Management.23')}: {props.content}</span>
                    <span style={{ marginTop: '10px', fontSize: '12px', fontWeight: '300', color: 'black'}}>{t('Customer_Management.21')}: {props.rate} {t('Customer_Management.24')}</span>
                </div>
            </div>
        </div>
    );
}

export default CommentDialogs;