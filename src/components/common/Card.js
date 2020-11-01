import React  from 'react';
import Ripples from 'react-ripples'
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';



const Card = (props) => {
    return(
        
        <Ripples onClick={props.onClick}>
        <div>
                <div className={`card_container `}>
                    <div style={{ marginLeft: '40px'}} >
                        <img className="card_image"  src={props.image} alt="product " width={"100%"}  />

                    </div>

                    <Grid container style={{ marginBottom: '0.5em', height: '50px' }}>
                        <span className="card_title">{props.title}</span>
                    </Grid>
                    <p style={{ marginBottom: 0 }}><span
                        style={{ fontWeight: '600', fontSize: '20px', fontFamily: 'Arial' }}>{props.price}</span>
                        <span className="card_discount">-{props.discount}%</span></p>
                    <p className="card_price"><s>{props.coverPrice}</s>đ</p>
                    <div>
                        <Rating size='small' name="read-only" defaultValue={props.valueraiting} precision={0.5}  readOnly />
                    </div>
                </div>
        </div>
    </Ripples>    
    );
}
export default Card;
        