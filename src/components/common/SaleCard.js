import React  from 'react';
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

const SaleCard = (props) => {
    const classes = useStyles();
    return(   
        <div>
        </div>
    );
}
export default SaleCard;