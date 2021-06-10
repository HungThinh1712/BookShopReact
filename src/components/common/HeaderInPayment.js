import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Stepper from './Stepper'
import Paper from '@material-ui/core/Paper';
import { withRouter } from "react-router-dom";
import Logo from "./../Images/logo.png";
const useStyles = makeStyles((theme) => ({

    grow: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#114b5f',
  
    },
    toolBar: {
  
      [theme.breakpoints.up('sm')]: {
        marginRight: '0px',
        marginLeft: '0px',
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: '220px',
        marginRight: '50px'
      },
  
      [theme.breakpoints.down('xs')]: {
        marginRight: '0px',
        marginLeft: '0px',
      },
  
    },
    title: {
      display: 'none',
      color: '#8470FF',
      textTransform: 'uppercase',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      fontSize: '40px',
      fontWeight: '700',
      cursor: 'pointer',
      fontFamily: 'Righteous'
    },
    logo: {
      width:"7%",
      cursor: "pointer",
    },
  }));
const HeaderInPayment = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.appBar} >
                <Toolbar className={classes.toolBar}>
                <img
            onClick={()=>props.history.push("/")}
            className={classes.logo}
            src={Logo}
            alt=""
          />
                    <div style={{ flexGrow: '0.1' }}></div>
                    <Stepper step ={props.step} />
                </Toolbar >
            </Paper>
        </div>
    );
};

export default withRouter(HeaderInPayment);