import React  from 'react';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    container: {      
        "&:hover": {
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",

            cursor: 'pointer'
        },
    },
}));


const Card = (props) => {
    const classes = useStyles();
    return(   
        <div onClick={props.onClick} className={`card_container ${classes.container} `}>
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <img className="card_image" src={props.imageSrc} alt="product " width={"100%"} />
            </div>

            <Grid container style={{ marginBottom: '0.5em', height: '50px',overflow:'hidden',textOverflow:'ellipsis' }}>
                <span className="card_title">{props.title}</span>
            </Grid>
            <p style={{ marginBottom: 0 }}><span
                style={{ fontWeight: '900', color: 'red', fontSize: '20px', fontFamily: 'Roboto' }}>{props.price}</span>
                <span className="card_discount">-{props.discount}%</span></p>
            <p className="card_price"><s>{props.coverPrice}</s>đ</p>
            <div>
                <Rating size='small' name="read-only" defaultValue={props.valueraiting} precision={0.5} readOnly />
            </div>
        </div>
    );
}
export default Card;
        