import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    root: {
        
    [theme.breakpoints.up('sm')]: {

      marginTop: '120px',
      marginLeft: '0px',
      marginRight: '0px',
    },
    [theme.breakpoints.up('lg')]: {
            marginLeft:'20px',
            marginTop:'7%',
            width:'auto',
            marginRight:'87px'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '100px',
      marginRight:'0px',
    },
  }
}));


const Slide = () => {
  const classes = useStyles();
  return (
    // <Carousel interval={2000} className={classes.root} >
    //   {/* <div ><img src={ProductDeal1} alt="sdfd" style={{ width: '100%' }} /></div>
    //   <div ><img src={ProductDeal1} alt="sfsdf" style={{ width: '100%' }} /></div>
    //   <div ><img src={ProductDeal1} alt="sdfsd" style={{ width: '100%' }} /></div> */}

    // </Carousel>
    <div>
      
    </div>

  )
};

export default Slide;