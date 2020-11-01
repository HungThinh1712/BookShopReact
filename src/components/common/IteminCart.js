import React, { Component, useState } from 'react';
import ExampleImage from './../Images/m.PNG'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
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
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        },
    },
    flex: {
        flexGrow: '0.9'
    },
    title: {
        marginLeft: '30px', marginTop: '10px', fontSize: '18px', fontWeight: '900', fontFamily: 'Robo',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0px'
        },
    },
    author: {
        marginLeft: '30px', marginTop: '16px', fontSize: '14px', fontFamily: 'Robo',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0px'
        },
    },
    delete_link: {
        marginLeft: '30px', marginTop: '18px', fontSize: '14px', fontFamily: 'Robo',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0px'
        },
    },
    btn_group: {
        marginTop: '1.5em', marginLeft: '50px',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0px'
        },
    }

}));

const IteminCart = (props) => {
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
    console.log("props",props)
    const classes = useStyles()
    return (
        <div>
            <div className={classes.item}>
                <div style={{height:'8em',width:'7em',display:'flex',alignContent:"center",justifyContent:'center', marginBottom:'12px' }}>
                    <img className="card_image" src={props.image} alt="product "  style={{maxWidth:'100%',maxHeight:'100%'}} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className={classes.title}>{props.name}</span>
                    <span className={classes.author}>Tác giả: {props.authorName}</span>
                    <Link className={classes.delete_link}>Xóa</Link>
                </div>
                <div className={classes.flex}></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ marginTop: '10px', fontSize: '18px', fontWeight: '800', color: 'red'}}>{props.price}</span>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <span style={{ marginTop: '6px', fontSize: '16px' }}><s>{props.coverPrice}</s></span>
                        <span style={{ marginLeft: '10px', fontSize: '12px', marginTop: '10px' }}>-{props.discount}</span>
                    </div>

                </div>
                <div className={classes.btn_group}>
                    <ButtonGroup size="small" color="primary" aria-label="outlined secondary button group">
                        <Button style={{ borderColor: "blue" }} onClick={handleDecrease}>-</Button>
                        <Button style={{ borderColor: "blue", fontWeight: 900 }} disabled  >{amount}</Button>
                        <Button style={{ borderColor: "blue" }} onClick={handleIncrease} >+</Button>
                    </ButtonGroup>
                </div>

            </div>
            <Divider />
        </div>
    );
}

export default IteminCart;