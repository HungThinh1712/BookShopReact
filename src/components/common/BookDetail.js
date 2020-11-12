import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Rating from '@material-ui/lab/Rating';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import CartIcon from '../../image/ic-cart@2x.png'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from './../../actions/cartAction'
const useStyles = makeStyles((theme) => ({

    
    container: {
        [theme.breakpoints.up('sm')]: {
          marginLeft:'0px',
          marginRight:'0px',
          marginTop:'120px',
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft:'87px',
            marginRight:'87px',
            marginTop:'120px',
            height:'400px',
            marginTop:'120px',
          },
        [theme.breakpoints.down('xs')]: {
          marginLeft:'0px',
          marginRight:'0px',
          marginTop:'120px',
        },
      },
      cover_product_detail: {
        
        [theme.breakpoints.up('lg')]: {
            margin: '10px', 
            display: 'flex'
          },
        [theme.breakpoints.up('md')]: {
            margin: '10px', 
            display: 'flex',
        },
        [theme.breakpoints.up('sm')]: {
            margin: '10px', 
            display: 'flex',
           
        },
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection:'column',
            alignItems:'center'
        },
      },
      card_image_detail: {
        height:'360px',
        width:'250px',
        display:'flex',
        alignContent:"center",
        justifyContent:'center',
        [theme.breakpoints.down('xs')]: {
           alignItem:'center'
            
        },
    },
    card_title_detail: {
        fontSize: '2vw',
        color: 'black',
        fontWeight: '700',
        marginBottom: '1.5em',
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px',
            color: 'black',
            fontWeight: '700',
            marginBottom: '1.5em',
         }, 
    },
    card_price: {
        fontWeight: '600',
        fontSize: '30px',
        fontFamily: 'Arial',
        color: 'red'
    },
    card_info : {
        fontWeight: '600', fontSize: '12px'
    },
    mgleft :{
        marginLeft:'40px',
        [theme.breakpoints.down('xs')]: {
           marginLeft:'0px'
         }, 
    }

    
}));

const BookDetail = (props) => {
    const dispatch = useDispatch();
    const isLogined = useSelector(state => state.auth ? state.auth.isAuthenticated : false);
    const [amount, setAmount] = useState(1);

   
    const handleDecrease = () => {
        if (amount - 1 >= 0) {
            setAmount(amount - 1)
        }
    };
    const handleIncrease = () => {
        setAmount(amount + 1)
    };
    const handleChange = (e) => {
        setAmount(e.target.value)
    };

  

    
    const handleAddToCart = () => {        

       dispatch(cartActions.addToCart(props,amount))
        if(isLogined===true){

            const objectItemToAdd ={
                ...props,...{'amount':amount}
            }
            let arr = [];
            arr.push(objectItemToAdd)
            console.log(arr)
                 dispatch(cartActions.addToCartofCurrentUser(arr))

        }
      
    };
    const classes = useStyles();
    return (
        <div>
            <Paper className = {`cover_container ${classes.container}`}>
                    <div className={classes.cover_product_detail} >
                        <div className={classes.card_image_detail}>
                            <img  src={props.image} alt="product " style={{maxWidth:'100%',maxHeight:'100%'}} />   
                        </div>
                        <div className ={classes.mgleft}>
                            <Grid container style={{ marginBottom: '0.5em', height: '50px' }}>
                                <span className={classes.card_title_detail}>{props.name}</span>
                            </Grid>
                            <div style={{ marginBottom: '0.5em'}}>
                                <Rating size='small' name="read-only" value={props.valueraiting} readOnly />
                            </div>
                        <p style={{ marginBottom: '0.5em' }}><span
                            className={classes.card_info}>Tác giả: {props.authorName}</span></p>
                            <p style={{ marginBottom: '0.5em' }}><span
                                className={classes.card_info}>Thể loại: {props.bookTypeName}</span></p>
                            
                            <p style={{ marginBottom: '0.5em' }}><span
                                className={classes.card_price}>{props.price} đ</span></p>
                            <p style={{ marginBottom: '0.5em' }}><span
                                className={classes.card_info}>Tiết kiệm: {props.discount}%</span></p>
                            <p style={{ marginBottom: '1em' }}><span
                                className={classes.card_info}>Giá thị trường: {props.coverPrice} đ</span></p>
                            <div style={{display:'flex',  marginBottom: '0.5em'}}>
                                <p style={{ marginBottom: '0.5em' }}><span
                                    className={classes.card_info}>Số lượng</span></p>
                                <div style={{ marginBottom: '0.5em' , marginLeft:'10px'}}>
                                    <ButtonGroup size="small" color="primary" aria-label="outlined secondary button group">
                                        <Button style ={{borderColor:"blue"}} onClick={handleDecrease}>-</Button>
                                        <Button style ={{borderColor:"blue", fontWeight:900}} disabled  >{amount}</Button>
                                        <Button style ={{borderColor:"blue"}} onClick={handleIncrease} >+</Button>
                                    </ButtonGroup>
                                </div>
                                
                            </div>
                            <div style={{ marginBottom: '0.5em',marginLeft:'0px'}}>
                                    <Button onClick={handleAddToCart} size="small" variant="contained" color='primary'
                                        style={{ fontSize: '1em' }}>
                                        <img src={CartIcon} style={{
                                            width: "15px",
                                            height: "15px",
                                            marginRight: "10px",
                                            fontSize: '0.85em'
                                        }}
                                            alt={"a cart icon"}
                                        />
                                            Thêm vào giỏ 
                                        </Button>
                                </div>
                        </div>

                    </div>
   
                </Paper>    
        </div>
    );
};

export default BookDetail;